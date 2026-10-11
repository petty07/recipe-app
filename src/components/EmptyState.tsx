import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

export function EmptyState({ title, message }: { title: string; message: string }) {
  const { theme } = useAppTheme();
  return <View style={styles.wrap}>
    <View style={[styles.icon, { backgroundColor: theme.surfaceAlt }]}>
      <Text style={{ fontSize: 30 }}>🍽️</Text></View>
    <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
    <Text style={[styles.message, { color: theme.secondaryText }]}>{message}</Text>
  </View>;
}
const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', padding: 30, minHeight: 230 },
  icon: { width: 72, height: 72, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { fontSize: 19, fontWeight: '800', marginBottom: 7 }, 
  message: { fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 280 }
});
