import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ParsedIngredient } from '../types/meal';
import { useAppTheme } from '../theme/ThemeProvider';

export function IngredientList({ ingredients }: { ingredients: ParsedIngredient[] }) {
  const { theme } = useAppTheme();
  return <View style={{ gap: 0 }}>
    {ingredients.map((item, index) =>
      <View key={`${item.ingredient}-${index}`}
        style={[styles.row, { borderBottomColor: theme.border }]}>
        <View style={[styles.dot, { backgroundColor: theme.primarySoft }]}>
          <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '800' }}>
            {index + 1}</Text>
        </View>
        <Text style={[styles.ingredient, { color: theme.text }]}>{item.ingredient}</Text>
        <Text style={[styles.measure, { color: theme.secondaryText }]}>{item.measure || 'To taste'}</Text>
      </View>)}</View>;
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth, gap: 11
  },
  dot: { width: 27, height: 27, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  ingredient: { flex: 1, fontSize: 14, fontWeight: '600' },
  measure: { fontSize: 13, maxWidth: '38%', textAlign: 'right' }
});
