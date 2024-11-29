import { useState, useCallback } from 'react';

type UseLocalStorageType<T> = {
  storedValue: T;
  setValue: (newValue: T) => void;
  removeValue: () => void;
};

export const useLocalStorage = <T,>(key: string, initialValue: T): UseLocalStorageType<T> => {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setStoredValue(valueToStore);
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: key,
            newValue: JSON.stringify(valueToStore),
            storageArea: localStorage,
          })
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: key,
          newValue: null,
          storageArea: localStorage,
        })
      );
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return {
    storedValue,
    setValue,
    removeValue,
  };
};
