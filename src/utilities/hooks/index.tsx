import { useEffect, useState } from "react";

export const useDebounce = (state: any, delayTime?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(state), delayTime || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [state, delayTime]);

  return debouncedValue;
};
