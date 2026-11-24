import { useState, useEffect, useCallback } from 'react';

export function usePersistentState<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }, [key, state]);

  const setPersistent = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => (typeof value === 'function' ? (value as (p: T) => T)(prev) : value));
  }, []);

  return [state, setPersistent];
}
