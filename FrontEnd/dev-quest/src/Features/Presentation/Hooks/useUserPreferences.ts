"use client";

import { useSyncExternalStore, useCallback } from "react";
import { UserOnboardingPreferences } from "../Types/Presentation.types";

export const USER_PREFERENCES_STORAGE_KEY = "@dev-quest:user-preferences";

let cachedRaw: string | null = null;
let cachedPreferences: UserOnboardingPreferences | null = null;

function getPreferencesSnapshot(): UserOnboardingPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_PREFERENCES_STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedPreferences;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedPreferences = null;
      return null;
    }
    cachedPreferences = JSON.parse(raw) as UserOnboardingPreferences;
    return cachedPreferences;
  } catch (err) {
    console.error("Erro ao ler preferências do snapshot:", err);
    cachedPreferences = null;
    return null;
  }
}

function getServerSnapshot(): UserOnboardingPreferences | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("devquest:preferences-updated", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("devquest:preferences-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getStoredPreferences(): UserOnboardingPreferences | null {
  return getPreferencesSnapshot();
}

export function savePreferences(preferences: UserOnboardingPreferences): void {
  if (typeof window === "undefined") return;
  try {
    const payload: UserOnboardingPreferences = {
      ...preferences,
      completedAt: preferences.completedAt || new Date().toISOString(),
    };
    const stringified = JSON.stringify(payload);
    cachedRaw = stringified;
    cachedPreferences = payload;
    localStorage.setItem(USER_PREFERENCES_STORAGE_KEY, stringified);
    window.dispatchEvent(new Event("devquest:preferences-updated"));
  } catch (err) {
    console.error("Erro ao salvar preferências do usuário:", err);
  }
}

export function clearPreferences(): void {
  if (typeof window === "undefined") return;
  try {
    cachedRaw = null;
    cachedPreferences = null;
    localStorage.removeItem(USER_PREFERENCES_STORAGE_KEY);
    window.dispatchEvent(new Event("devquest:preferences-updated"));
  } catch (err) {
    console.error("Erro ao limpar preferências do usuário:", err);
  }
}

export function useUserPreferences() {
  const preferences = useSyncExternalStore(
    subscribe,
    getPreferencesSnapshot,
    getServerSnapshot
  );

  const setPreferences = useCallback((data: UserOnboardingPreferences) => {
    savePreferences(data);
  }, []);

  return {
    preferences,
    setPreferences,
    clearPreferences,
    isLoaded: true,
  };
}
