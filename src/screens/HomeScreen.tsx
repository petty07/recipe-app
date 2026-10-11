import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import { useCategories } from '../hooks/useCategories';
import { useDebounce } from '../hooks/useDebounce';
import { useMeals } from '../hooks/useMeals';
import { SEARCH_DEBOUNCE_MS, CONTENT_PADDING } from '../constants';
import { SearchBar } from '../components/SearchBar';
import { CategoryChip } from '../components/CategoryChip';
import { MealGrid } from '../components/MealGrid';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { useAppTheme } from '../theme/ThemeProvider';
import { getRandomMeal } from '../api/mealApi';
import { useFavoritesContext } from '../state/FavoritesProvider';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;
type Nav = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen(_props: Props) {
  const { theme } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);
  const { data: categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    retry: retryCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!selectedCategory && categories.length) setSelectedCategory(categories[0].strCategory);
  }, [categories, selectedCategory]);

  const { data: meals, loading, refreshing, error, retry, refresh } = useMeals(selectedCategory, debouncedSearch);
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const onRandom = async () => {
    try {
      const meal = await getRandomMeal();
      if (meal) navigation.navigate('MealDetail', { mealId: meal.idMeal });
      else Alert.alert('No recipe found', 'Please try again in a moment.');
    } catch {
      Alert.alert('Could not find a random meal', 'Check your connection and try again.');
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <MealGrid
        meals={loading || error ? [] : meals}
        refreshing={refreshing}
        onRefresh={refresh}
        onMealPress={mealId => navigation.navigate('MealDetail', { mealId })}
        isFavorite={isFavorite}
        onToggleFavorite={meal => { void toggleFavorite(meal); }}

        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <View style={[styles.logo, { backgroundColor: theme.primary }]}>
                  <Text style={styles.logoText}>m</Text>
                </View>
                <View style={styles.headerContainer}>
                  <Text style={[styles.brand, { color: theme.text }]}>Mobcast RE</Text>
                  <Text style={[styles.tagline, { color: theme.secondaryText }]}>Recipes. Explored. Easily.</Text>
                </View>
                <View style={{ flex: 1 }} />
                <Pressable
                  onPress={onRandom}
                  accessibilityRole="button"
                  accessibilityLabel="Discover a random meal"
                  style={[styles.random, { backgroundColor: theme.primarySoft }]}
                >
                  <View style={styles.randomContent}>
                    <Text style={[styles.randomText, { color: theme.primary }]}>Surprise me</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={Platform.OS === 'ios' ? 12 : 14}
                      color={theme.primary}
                      style={styles.arrowIcon}
                    />
                  </View>
                </Pressable>
              </View>

             
              <View style={styles.textBlock}>
                <Text style={[styles.eyebrow, { color: theme.primary }]}>YOUR NEXT FAVOURITE</Text>
                <Text style={[styles.headline, { color: theme.text }]}>Good food,{"\n"}good mood.</Text>
                <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Discover something delicious today.</Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <SearchBar value={search} onChangeText={setSearch} />
              </View>
            </View>

            <View style={styles.categoryHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore categories</Text>
              <Text style={[styles.hint, { color: theme.secondaryText }]}>Swipe to explore</Text>
            </View>

            {categoriesError ? (
              <ErrorState message={categoriesError} onRetry={retryCategories} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
                {categoriesLoading && categories.length === 0 ? (
                  <Text style={{ color: theme.secondaryText }}>Finding categories…</Text>
                ) : (
                  categories.map(category => (
                    <CategoryChip
                      key={category.idCategory}
                      category={category}
                      selected={!debouncedSearch && selectedCategory === category.strCategory}
                      onPress={() => { setSearch(''); setSelectedCategory(category.strCategory); }}
                    />
                  ))
                )}
              </ScrollView>
            )}

            {/* Dynamic Section Header Title Status */}
            <View style={styles.mealsHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  {debouncedSearch ? 'Search results' : selectedCategory || 'Popular meals'}
                </Text>
                <Text style={[styles.hint, { color: theme.secondaryText }]}>
                  {debouncedSearch ? `Results for “${debouncedSearch.trim()}”` : 'Handpicked inspiration for you'}
                </Text>
              </View>
              <Text style={[styles.count, { color: theme.secondaryText }]}>
                {!loading && meals.length ? `${meals.length} recipes` : ''}
              </Text>
            </View>

            {loading && <SkeletonLoader />}
            {error && <ErrorState message={error} onRetry={retry} />}
          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <EmptyState
              title="No meals found"
              message={debouncedSearch.trim()
                ? `We couldn't find meals for “${debouncedSearch.trim()}”. Try another search.`
                : 'Try another category to find your next favourite.'}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 16 : 10,
    paddingBottom: 8
  },
  headerContainer: { alignItems: 'flex-start' },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: CONTENT_PADDING
  },
  textBlock: {
    paddingHorizontal: CONTENT_PADDING
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  logoText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '900',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },
  brand: {
    fontSize: 24,
    letterSpacing: -0.5,
    fontWeight: '900',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },
  random: {
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 14,
    paddingVertical: Platform.OS === 'ios' ? 6 : 8,
    borderRadius: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    }),
  },
  randomContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  randomText: {
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    fontWeight: '800',
  },
  arrowIcon: {
    marginLeft: 4,
    transform: [{ rotate: '-45deg' }] 
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Bold' }),
  },
  tagline: {
    fontSize: 14,
    marginTop: 2,
    letterSpacing: 0.2,
    fontWeight: '400',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Regular' }),
  },
  headline: {
    fontSize: 32,
    letterSpacing: -1,
    lineHeight: 38,
    marginBottom: 8,
    fontWeight: '900',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Regular' }),
  },
  categoryHeader: {
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: -0.3,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Bold' }),
  },
  hint: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-SemiBold' }),
  },
  categories: { paddingHorizontal: CONTENT_PADDING, gap: 8, paddingBottom: 4 },
  mealsHeader: {
    paddingHorizontal: CONTENT_PADDING,
    marginTop: 32,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  count: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-SemiBold' }),
  }
});
