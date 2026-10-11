import { useCallback, useEffect, useRef, useState } from 'react';
import { getMealsByCategory, searchMeals } from '../api/mealApi';
import type { MealSummary } from '../types/meal';

export function useMeals(category: string, query: string) {
  const [data, setData] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const requestId = useRef(0);
  const refreshRef = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const id = ++requestId.current;
    const normalizedQuery = query.trim();
    if (!normalizedQuery && !category) { setData([]); setLoading(false); return () => controller.abort(); }
    setLoading(!refreshRef.current); setError(null);
    const request = normalizedQuery ? searchMeals(normalizedQuery, controller.signal) : getMealsByCategory(category, controller.signal);
    request.then(result => {
      if (id === requestId.current) setData(result);
    }).catch(() => {
      if (!controller.signal.aborted && id === requestId.current) setError('Something went wrong while loading meals.');
    }).finally(() => {
      if (id === requestId.current) {
        setLoading(false); setRefreshing(false); refreshRef.current = false;
      }
    });
    return () => controller.abort();
  }, [category, query, revision]);
  const retry = useCallback(() => setRevision(v => v + 1), []);
  const refresh = useCallback(() => {
    refreshRef.current = true;
    setRefreshing(true);
    setRevision(v => v + 1);
  }, []);
  return { data, loading, refreshing, error, retry, refresh };
}
