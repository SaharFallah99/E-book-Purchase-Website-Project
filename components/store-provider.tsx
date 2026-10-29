"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { PlanId } from "@/lib/types";
import { planDurationDays } from "@/lib/plans";

const STORAGE_KEY = "ketabsara:store:v1";
const bootTime = Date.now();

export type StoreUser = {
  name: string;
  email: string;
};

type PersistedState = {
  user: StoreUser | null;
  favorites: number[];
  purchases: number[];
  plan: PlanId | null;
  planExpiresAt: string | null;
};

type StoreContextValue = PersistedState & {
  ready: boolean;
  isFavorite: (bookId: number) => boolean;
  toggleFavorite: (bookId: number) => void;
  purchaseBook: (bookId: number) => void;
  hasPurchased: (bookId: number) => boolean;
  hasActivePlan: boolean;
  canRead: (book: { id: number; free?: boolean }) => boolean;
  activatePlan: (planId: PlanId) => void;
  login: (email: string, password?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
};

const initialState: PersistedState = {
  user: null,
  favorites: [],
  purchases: [],
  plan: null,
  planExpiresAt: null,
};

const StoreContext = createContext<StoreContextValue | null>(null);

function safeRead(): PersistedState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      user: parsed.user ?? null,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
      plan: parsed.plan ?? null,
      planExpiresAt: parsed.planExpiresAt ?? null,
    };
  } catch {
    return initialState;
  }
}

/**
 * The persisted slice lives outside React so that hydration can read
 * localStorage through useSyncExternalStore without an effect-driven
 * setState cascade. getSnapshot caches the parsed value, which React requires
 * to stay referentially stable between store notifications.
 */
let snapshot: PersistedState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): PersistedState {
  if (typeof window === "undefined") return initialState;
  if (!snapshot) snapshot = safeRead();
  return snapshot;
}

function getServerSnapshot(): PersistedState {
  return initialState;
}

function emit() {
  for (const listener of listeners) listener();
}

function persist(next: PersistedState) {
  snapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage may be unavailable in private mode; the demo still works in memory.
    }
  }
  emit();
}

function updateStore(updater: (current: PersistedState) => PersistedState) {
  persist(updater(getSnapshot()));
}

let storageBound = false;

function bindStorage() {
  if (storageBound || typeof window === "undefined") return;
  storageBound = true;
  window.addEventListener("storage", (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = safeRead();
    emit();
  });
}

function subscribe(listener: () => void) {
  bindStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const subscribeToHydration = () => () => {};

/** False during SSR and the hydration pass, true once the client store is live. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const normalized = local.toLowerCase();
  if (normalized === "demo") return "کاربر نمایشی";
  if (normalized === "guest") return "مهمان کتاب‌سرا";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  return cleaned || "کتاب‌خوان";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();

  const isFavorite = useCallback(
    (bookId: number) => state.favorites.includes(bookId),
    [state.favorites],
  );

  const toggleFavorite = useCallback((bookId: number) => {
    updateStore((current) => ({
      ...current,
      favorites: current.favorites.includes(bookId)
        ? current.favorites.filter((id) => id !== bookId)
        : [...current.favorites, bookId],
    }));
  }, []);

  const purchaseBook = useCallback((bookId: number) => {
    updateStore((current) =>
      current.purchases.includes(bookId)
        ? current
        : { ...current, purchases: [...current.purchases, bookId] },
    );
  }, []);

  const hasPurchased = useCallback(
    (bookId: number) => state.purchases.includes(bookId),
    [state.purchases],
  );

  const hasActivePlan = Boolean(
    state.plan &&
      state.planExpiresAt &&
      new Date(state.planExpiresAt).getTime() > bootTime,
  );

  const canRead = useCallback(
    (book: { id: number; free?: boolean }) =>
      Boolean(book.free) || state.purchases.includes(book.id) || hasActivePlan,
    [state.purchases, hasActivePlan],
  );

  const activatePlan = useCallback((planId: PlanId) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + planDurationDays(planId));
    updateStore((current) => ({
      ...current,
      plan: planId,
      planExpiresAt: expires.toISOString(),
    }));
  }, []);

  const login = useCallback((email: string) => {
    updateStore((current) => ({
      ...current,
      user: {
        email,
        name: current.user?.name || nameFromEmail(email),
      },
    }));
  }, []);

  const signup = useCallback((name: string, email: string) => {
    updateStore((current) => ({ ...current, user: { name, email } }));
  }, []);

  const logout = useCallback(() => {
    updateStore((current) => ({ ...current, user: null }));
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      ready,
      isFavorite,
      toggleFavorite,
      purchaseBook,
      hasPurchased,
      hasActivePlan,
      canRead,
      activatePlan,
      login,
      signup,
      logout,
    }),
    [
      state,
      ready,
      isFavorite,
      toggleFavorite,
      purchaseBook,
      hasPurchased,
      hasActivePlan,
      canRead,
      activatePlan,
      login,
      signup,
      logout,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
