import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

export function LoadingState() {
  const { theme } = useAppTheme();
  return <View style={styles.wrap}>
    <ActivityIndicator size="large" color={theme.primary} /></View>;
}
const styles = StyleSheet.create({
  wrap: { padding: 30, alignItems: 'center', justifyContent: 'center' }
});
