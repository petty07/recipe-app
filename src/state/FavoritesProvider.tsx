import React, { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { FavoriteMeal, MealSummary } from '../types/meal';

interface FavoritesContextValue {
  favorites: FavoriteMeal[];
  ready: boolean;
  storageError: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (meal: MealSummary) => Promise<void>;
}
const FavoritesContext = createContext<FavoritesContextValue | null>(null);
export function FavoritesProvider({ children }: React.PropsWithChildren) {
  const value = useFavorites();
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export function useFavoritesContext() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error('useFavoritesContext must be used inside FavoritesProvider');
  return value;
}
