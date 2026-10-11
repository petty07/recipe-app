import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import type { MealSummary } from '../types/meal';
import { GRID_GAP, CONTENT_PADDING } from '../constants';
import { getGridColumns } from '../utils/responsive';
import { MealCard } from './MealCard';

export function MealGrid({
  meals,
  ListHeaderComponent,
  ListEmptyComponent,
  refreshing,
  onRefresh,
  onMealPress,
  isFavorite,
  onToggleFavorite
}: {
  meals: MealSummary[];
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  refreshing: boolean;
  onRefresh: () => void;
  onMealPress: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (meal: MealSummary) => void;
}) {
  const { width } = useWindowDimensions();
  const columns = getGridColumns(width);

  return (
    <FlatList
      key={`grid-${columns}`}
      data={meals}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      numColumns={columns}
      keyExtractor={item => item.idMeal}
      contentContainerStyle={{
        paddingHorizontal: CONTENT_PADDING,
        paddingTop: 8,
        paddingBottom: 110
      }}
      columnWrapperStyle={columns > 1 ? { gap: GRID_GAP } : undefined}
      ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      renderItem={({ item }) => (
        <View style={{ flex: 1, maxWidth: `${100 / columns}%` }}>
          <MealCard
            meal={item}
            favorite={isFavorite(item.idMeal)}
            onToggleFavorite={() => onToggleFavorite(item)}
            onPress={() => onMealPress(item.idMeal)}
          />
        </View>
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews
    />
  );
}
