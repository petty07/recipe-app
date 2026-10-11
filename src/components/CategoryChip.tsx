import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Category } from '../types/meal';
import { useAppTheme } from '../theme/ThemeProvider';

export function CategoryChip({ category, selected, onPress }:
  {
    category: Category;
    selected: boolean;
    onPress: () => void
  }) {
  const { theme } = useAppTheme();
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}
    style={({ pressed }) => [styles.item, { opacity: pressed ? 0.8 : 1 }]}>
    <View style={[styles.imageWrap,
    {
      borderColor: selected ? theme.primary : theme.border,
      backgroundColor: selected ? theme.primarySoft : theme.surface
    }]}>
      <Image source={{ uri: category.strCategoryThumb }}
        style={styles.image}
        accessibilityLabel={`${category.strCategory} category`} />
    </View>
    <Text numberOfLines={1}
      style={[styles.label,
      {
        color: selected ? theme.primary : theme.secondaryText,
        fontWeight: selected ? '700' : '500'
      }]}>{category.strCategory}</Text>
  </Pressable>;
}
const styles = StyleSheet.create({
  item: { width: 76, alignItems: 'center', gap: 7 },
  imageWrap: { width: 62, height: 62, borderRadius: 22, borderWidth: 2, padding: 3, overflow: 'hidden' },
  image: { width: '100%', height: '100%', borderRadius: 18 },
  label: { fontSize: 12, maxWidth: 76 }
});
