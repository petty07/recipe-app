import { useCallback, useEffect, useState } from 'react';
import { getCategories } from '../api/mealApi';
import type { Category } from '../types/meal';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null);
    getCategories(controller.signal).then(setData).catch((e: unknown) => {
      if (!controller.signal.aborted) setError('We couldn’t load categories. Check your connection and try again.');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [version]);
  const retry = useCallback(() => setVersion(v => v + 1), []);
  return { data, loading, error, retry };
}
