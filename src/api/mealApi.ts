import type { AxiosRequestConfig } from 'axios';
import { apiClient } from './client';
import type { ApiListResponse, Category, CategoryResponse, Meal, MealSummary } from '../types/meal';

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await apiClient.get<CategoryResponse>('/categories.php', { signal });
  return response.data.categories ?? [];
}
export async function getMealsByCategory(category: string, signal?: AbortSignal): Promise<MealSummary[]> {
  const response = await apiClient.get<ApiListResponse<MealSummary>>('/filter.php', { params: { c: category }, signal });
  return response.data.meals ?? [];
}
export async function searchMeals(query: string, signal?: AbortSignal): Promise<MealSummary[]> {
  const normalized = query.trim();
  if (!normalized) return [];
  const response = await apiClient.get<ApiListResponse<MealSummary>>('/search.php', { params: { s: normalized }, signal });
  return response.data.meals ?? [];
}
export async function getMealDetails(id: string, signal?: AbortSignal): Promise<Meal | null> {
  const response = await apiClient.get<ApiListResponse<Meal>>('/lookup.php', { params: { i: id }, signal });
  return response.data.meals?.[0] ?? null;
}
export async function getRandomMeal(signal?: AbortSignal): Promise<Meal | null> {
  const response = await apiClient.get<ApiListResponse<Meal>>('/random.php', { signal });
  return response.data.meals?.[0] ?? null;
}
