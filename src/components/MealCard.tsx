import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { MealSummary } from '../types/meal';
import { useAppTheme } from '../theme/ThemeProvider';
import { FavoriteButton } from './FavoriteButton';

export const MealCard = memo(function MealCard({ meal, favorite, onToggleFavorite, onPress }:
  {
    meal: MealSummary;
    favorite: boolean;
    onToggleFavorite: () => void;
    onPress: () => void;
  }) {
  const { theme } = useAppTheme();
  return <Pressable onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`View ${meal.strMeal} recipe`}
    style={({ pressed }) => [styles.card, {
      backgroundColor: theme.surface,
      shadowColor: theme.shadow,
      opacity: pressed ? 0.92 : 1,
      transform: [{ scale: pressed ? 0.99 : 1 }]
    }]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: meal.strMealThumb }}
        style={styles.image}
        accessibilityLabel={meal.strMeal} />
      <View style={styles.favorite}>
        <FavoriteButton active={favorite} onPress={onToggleFavorite} /></View>
    </View>
    <View style={styles.content}>
      <Text numberOfLines={2}
        style={[styles.title, { color: theme.text }]}>{meal.strMeal}</Text>
      <Text style={[styles.caption, { color: theme.secondaryText }]}>VIEW RECIPE  ↗</Text>
    </View>
  </Pressable>;
});
const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 }
  },
  imageContainer: { aspectRatio: 1.12, position: 'relative' },
  image: { width: '100%', height: '100%', backgroundColor: '#E8E9E1' },
  favorite: { position: 'absolute', right: 9, top: 9 },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 78,
    justifyContent: 'space-between',
    gap: 8
  },
  title: { fontSize: 14, fontWeight: '700', lineHeight: 19 },
  caption: { fontSize: 9, letterSpacing: 1.1, fontWeight: '700' }
});
