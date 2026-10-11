import React, { ComponentProps } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { useAppTheme } from '../theme/ThemeProvider';
import { FavoritesProvider } from '../state/FavoritesProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { theme } = useAppTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          ...Platform.select({
            ios: { height: 84, paddingBottom: 24, paddingTop: 10 },
            android: { height: 66, paddingBottom: 10, paddingTop: 8 }
          })
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          fontFamily: Platform.select({ ios: undefined, android: 'Inter-SemiBold' })
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: ComponentProps<typeof Ionicons>['name'] = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName as any} size={size + 1} color={color} />;
        }
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Discover' }} />
      <Tabs.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Saved' }} />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  return (
    <FavoritesProvider>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
}
