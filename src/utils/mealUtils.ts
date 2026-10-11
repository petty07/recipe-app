import type { Meal, ParsedIngredient } from '../types/meal';

export function parseIngredients(meal: Partial<Meal>): ParsedIngredient[] {
  const ingredients: ParsedIngredient[] = [];
  for (let i = 1; i <= 20; i += 1) {
    const rawIngredient = meal[`strIngredient${i}` as keyof Meal];
    const ingredient = typeof rawIngredient === 'string' ? rawIngredient.trim() : '';
    if (!ingredient) continue;
    const rawMeasure = meal[`strMeasure${i}` as keyof Meal];
    const measure = typeof rawMeasure === 'string' ? rawMeasure.trim() : '';
    ingredients.push({ ingredient, measure });
  }
  return ingredients;
}
