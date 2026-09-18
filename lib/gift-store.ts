"use client";

import { useSyncExternalStore } from "react";
import { type Gift, isGift, sampleGifts } from "./gifts";

const storageKey = "podaruj.gifts.v1";
const changeEvent = "podaruj:gifts-changed";
let currentGifts = sampleGifts;
let previousValue: string | null | undefined;

// Cache the snapshot so React receives the same reference until data changes.
function getSnapshot(): Gift[] {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value !== previousValue) {
      previousValue = value;
      const parsed: unknown = value === null ? sampleGifts : JSON.parse(value);
      if (
        Array.isArray(parsed) &&
        parsed.every(isGift) &&
        new Set(parsed.map((gift) => gift.id)).size === parsed.length
      ) {
        currentGifts = parsed;
      }
    }
  } catch {
    // Keep the working list usable if storage is unavailable or invalid.
  }
  return currentGifts;
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, listener);
  };
}

const getServerSnapshot = () => sampleGifts;

export function useGifts() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function updateGifts(update: (gifts: Gift[]) => Gift[]): boolean {
  currentGifts = update(getSnapshot());
  let saved = true;
  try {
    const value = JSON.stringify(currentGifts);
    window.localStorage.setItem(storageKey, value);
    previousValue = value;
  } catch {
    saved = false;
  }
  window.dispatchEvent(new Event(changeEvent));
  return saved;
}
