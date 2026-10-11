import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useFavoritesContext } from '../state/FavoritesProvider';
import { MealGrid } from '../components/MealGrid';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { useAppTheme } from '../theme/ThemeProvider';

export function FavoritesScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favorites, ready, isFavorite, toggleFavorite } = useFavoritesContext();

  return <SafeAreaView
    style={[styles.safe,
    { backgroundColor: theme.background }]}
    edges={['top']}>
    <View style={styles.header}>
      <Text style={[styles.kicker, { color: theme.primary }]}>YOUR COLLECTION</Text>
      <Text style={[styles.title, { color: theme.text }]}>Saved recipes</Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        All the good things, in one place.</Text></View>
    {!ready ? <LoadingState /> : favorites.length === 0 ?
      <EmptyState
        title="Nothing saved just yet"
        message="Tap the heart on any meal to keep a recipe close at hand." /> :
      <MealGrid
        meals={favorites}
        refreshing={false}
        onRefresh={() => undefined}
        onMealPress={mealId => navigation.navigate('MealDetail',
          { mealId })} isFavorite={isFavorite}
        onToggleFavorite={meal => { void toggleFavorite(meal); }} />}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 18 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { fontSize: 14, marginTop: 8 }
});
