import React from 'react';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme } from '@react-navigation/native';
import { StatusBar, useColorScheme, ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';

function Root() {
  const scheme = useColorScheme();
  const { theme, isDark } = useAppTheme();
  
  const navigationTheme = {
    ...(isDark ? NavDarkTheme : NavLightTheme),
    colors: { 
      ...(isDark ? NavDarkTheme.colors : NavLightTheme.colors), 
      background: theme.background, 
      card: theme.surface, 
      text: theme.text, 
      border: theme.border, 
      primary: theme.primary 
    }
  };

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  // Pre-load Inter vectors cleanly at the shell root wrapper layer
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Inter-ExtraBold': Inter_800ExtraBold,
  });

  // Hold mounting the navigation tree structure until fonts resolve safely to prevent content stuttering
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F1' }}>
        <ActivityIndicator size="large" color="#FF6C44" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
