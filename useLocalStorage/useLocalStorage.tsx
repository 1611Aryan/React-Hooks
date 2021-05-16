import { useEffect, useState } from "react";

const PREFIX = "Messenger-user-";

const useLocalStorage = <T extends unknown>(key: string, initialValue: T) => {
  const PREFIXED_KEY = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(PREFIXED_KEY);
    if (storedValue !== null) return JSON.parse(storedValue);
    if (typeof initialValue === "function") return initialValue();
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY]);

  return [value, setValue];
};

export default useLocalStorage;
