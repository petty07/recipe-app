import { parseIngredients } from '../src/utils/mealUtils';
import type { Meal } from '../src/types/meal';

describe('parseIngredients', () => {
  it('parses multiple ingredients and measures', () => {
    const meal = { strIngredient1: ' Chicken ', strMeasure1: ' 500g ', strIngredient2: 'Salt', strMeasure2: '1 tsp' } as Partial<Meal>;
    expect(parseIngredients(meal)).toEqual([{ ingredient: 'Chicken', measure: '500g' }, { ingredient: 'Salt', measure: '1 tsp' }]);
  });
  it('ignores empty ingredients', () => {
    expect(parseIngredients({ strIngredient1: '', strMeasure1: '1 tsp', strIngredient2: 'Pepper' } as Partial<Meal>))
      .toEqual([{ ingredient: 'Pepper', measure: '' }]);
  });
  it('handles missing measures', () => {
    expect(parseIngredients({ strIngredient1: 'Lemon' } as Partial<Meal>)).toEqual([{ ingredient: 'Lemon', measure: '' }]);
  });
  it('trims whitespace and ignores whitespace-only ingredients', () => {
    expect(parseIngredients({ strIngredient1: '   ', strIngredient2: '  Olive oil  ', strMeasure2: '  2 tbsp ' } as Partial<Meal>))
      .toEqual([{ ingredient: 'Olive oil', measure: '2 tbsp' }]);
  });
  it('returns an empty array when all ingredients are empty', () => {
    expect(parseIngredients({ strIngredient1: '', strIngredient2: null, strIngredient3: '  ' } as Partial<Meal>)).toEqual([]);
  });
});
