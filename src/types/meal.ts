export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
export interface Meal extends MealSummary {
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strYoutube: string | null;
  strTags: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
export interface ParsedIngredient { ingredient: string; measure: string; }
export type FavoriteMeal = Pick<MealSummary, 'idMeal' | 'strMeal' | 'strMealThumb'>;
export interface ApiListResponse<T> { meals: T[] | null; }
export interface CategoryResponse { categories: Category[] | null; }
