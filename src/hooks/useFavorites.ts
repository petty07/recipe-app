import { useCallback, useEffect, useState } from 'react';
import { readFavorites, writeFavorites } from '../storage/favoritesStorage';
import type { FavoriteMeal, MealSummary } from '../types/meal';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    let alive = true;
    readFavorites().then(items => { if (alive) setFavorites(items); }).catch(() => {
      if (alive) setStorageError(true);
    }).finally(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);
  const toggleFavorite = useCallback(async (meal: MealSummary) => {
    const exists = favorites.some(item => item.idMeal === meal.idMeal);
    const next = exists ? favorites.filter(item => item.idMeal !== meal.idMeal) : [
      ...favorites, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }
    ];
    setFavorites(next);
    try { await writeFavorites(next); setStorageError(false); }
    catch { setStorageError(true); }
  }, [favorites]);
  const isFavorite = useCallback((id: string) => favorites.some(item => item.idMeal === id), [favorites]);
  return { favorites, ready, storageError, toggleFavorite, isFavorite };
}
