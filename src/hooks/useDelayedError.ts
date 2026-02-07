import { useEffect, useState } from "react";

export function useDelayedError(error: string | null, delay = 500) {
  const [delayedError, setDelayedError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedError(error);
    }, delay);

    return () => clearTimeout(timer);
  }, [error, delay]);

  return delayedError;
}
