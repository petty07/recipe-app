import React, { useMemo } from 'react';
import { Alert, Image, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../types/navigation';
import { useMealDetails } from '../hooks/useMealDetails';
import { parseIngredients } from '../utils/mealUtils';
import { IngredientList } from '../components/IngredientList';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { useAppTheme } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export function MealDetailScreen({ route, navigation }: Props) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: meal, loading, error, retry } = useMealDetails(route.params.mealId);

  const ingredients = useMemo(() => (meal ? parseIngredients(meal) : []), [meal]);

  const watchYoutube = async () => {
    if (!meal?.strYoutube?.trim()) return;
    try {
      const url = meal.strYoutube.trim();
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open YouTube', 'Please try opening the link again later.');
    }
  };


  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (error || !meal) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.background }]}>
        <ErrorState message={error ?? 'This recipe is no longer available.'} onRetry={retry} />
      </SafeAreaView>
    );
  }

  const backButtonTop = Math.max(insets.top, 15);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={styles.hero}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.heroImage} accessibilityLabel={meal.strMeal} />

          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={[styles.back, { backgroundColor: theme.surface, top: backButtonTop }]}
          >
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </Pressable>

          <View style={styles.heroShade} />

          <View style={styles.heroText}>
            <Text style={styles.heroKicker}>THE RECIPE</Text>
            <Text style={styles.heroTitle}>{meal.strMeal}</Text>
            <Text style={styles.meta}>
              {[meal.strArea, meal.strCategory].filter(Boolean).join('  •  ')}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients</Text>
            <Text style={[styles.badge, { color: theme.primary, backgroundColor: theme.primarySoft }]}>
              {ingredients.length} items
            </Text>
          </View>

          <IngredientList ingredients={ingredients} />

          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 30, marginBottom: 12 }]}>
            Cooking instructions
          </Text>
          <Text style={[styles.instructions, { color: theme.secondaryText }]}>
            {meal.strInstructions?.trim() || 'No cooking instructions are available for this recipe.'}
          </Text>


          {!!meal.strYoutube?.trim() && (
            <Pressable onPress={watchYoutube} accessibilityRole="button" style={[styles.youtube, { backgroundColor: theme.primary }]}>

              <Ionicons name="play" size={16} color="#FFFFFF" />
              <Text style={styles.youtubeText}>Watch on YouTube</Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#FFFFFF"
                style={{ transform: [{ rotate: '-45deg' }] }}
              />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center' },
  hero: { height: 390, position: 'relative', justifyContent: 'flex-end' },
  heroImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  heroShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.38)' },
  back: {
    position: 'absolute',
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  heroText: { padding: 24, zIndex: 1 },
  heroKicker: {
    color: '#FFD0C4',
    fontSize: 10,
    letterSpacing: 2.3,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 37,
    letterSpacing: -0.7,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },
  meta: {
    color: '#F3F3F0',
    fontSize: 13,
    marginTop: 10,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Regular' }),
  },
  content: { paddingHorizontal: 22, paddingTop: 26 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  sectionTitle: {
    fontSize: 21,
    letterSpacing: -0.5,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-ExtraBold' }),
  },
  badge: {
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Bold' }),
  },
  instructions: {
    fontSize: 15,
    lineHeight: 25,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Regular' }),
  },
  youtube: {
    marginTop: 25,
    borderRadius: 16,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 5 },
      android: { elevation: 2 },
    }),
  },
  youtubeText: {
    color: '#FFFFFF',
    fontSize: 15,
    flex: 1,
    fontFamily: Platform.select({ ios: undefined, android: 'Inter-Bold' }),
  }
});
