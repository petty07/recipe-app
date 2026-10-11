import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_KEY } from '../constants';
import type { FavoriteMeal } from '../types/meal';

export async function readFavorites(): Promise<FavoriteMeal[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is FavoriteMeal =>
      typeof item?.idMeal === 'string' && typeof item?.strMeal === 'string' && typeof item?.strMealThumb === 'string'
    );
  } catch {
    return [];
  }
}
export async function writeFavorites(favorites: FavoriteMeal[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
