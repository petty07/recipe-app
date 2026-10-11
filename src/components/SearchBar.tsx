import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

export function SearchBar({ value, onChangeText }:
  { value: string; onChangeText: (text: string) => void }) {
  const { theme } = useAppTheme();
  return <View style={[styles.wrap, { backgroundColor: theme.surface, borderColor: theme.border }]}>
    <Text style={[styles.icon, { color: theme.secondaryText }]}>⌕</Text>
    <TextInput
      value={value} onChangeText={onChangeText} placeholder="Search meals, ingredients..."
      placeholderTextColor={theme.muted} style={[styles.input, { color: theme.text }]}
      returnKeyType="search" accessibilityLabel="Search meals"
      autoCapitalize="none" clearButtonMode="while-editing"
    />
  </View>;
}
const styles = StyleSheet.create({
  wrap: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  icon: {
    fontSize: 25,
    lineHeight: 30
  },
  input: { flex: 1, fontSize: 14, paddingVertical: 12 }
});
