import { useEffect, useState } from 'react';

function getStoredValue(key, initialValue) {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const savedValue = window.localStorage.getItem(key);

    if (savedValue === null) {
      return initialValue;
    }

    return JSON.parse(savedValue);
  } catch (error) {
    console.warn(`Unable to parse localStorage key: ${key}`, error);
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Unable to save localStorage key: ${key}`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
