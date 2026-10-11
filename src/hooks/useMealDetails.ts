import { useCallback, useEffect, useState } from 'react';
import { getMealDetails } from '../api/mealApi';
import type { Meal } from '../types/meal';

export function useMealDetails(mealId: string) {
  const [data, setData] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null);
    getMealDetails(mealId, controller.signal).then(meal => {
      if (!controller.signal.aborted) setData(meal);
    }).catch(() => {
      if (!controller.signal.aborted) setError('We couldn’t load this recipe.');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [mealId, revision]);
  const retry = useCallback(() => setRevision(v => v + 1), []);
  return { data, loading, error, retry };
}
