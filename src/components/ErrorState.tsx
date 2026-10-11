import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { theme } = useAppTheme();
  return <View style={styles.wrap}>
    <Text style={styles.emoji}>🥣</Text>
    <Text style={[styles.title, { color: theme.text }]}>A little kitchen hiccup</Text>
    <Text style={[styles.message, { color: theme.secondaryText }]}>{message}</Text>
    <Pressable onPress={onRetry} accessibilityRole="button" 
    style={[styles.button, { backgroundColor: theme.primary }]}>
      <Text style={styles.buttonText}>Try again</Text>
    </Pressable>
  </View>;
}
const styles = StyleSheet.create({
  wrap: { padding: 28, alignItems: 'center', justifyContent: 'center', minHeight: 260 },
  emoji: { fontSize: 36, marginBottom: 12 }, 
  title: { fontSize: 19, fontWeight: '800', marginBottom: 7 },
  message: { fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 280 },
  button: { marginTop: 18, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  buttonText: { color: '#FFFFFF', fontWeight: '700' }
});
