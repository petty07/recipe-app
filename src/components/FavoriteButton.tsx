import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/ThemeProvider';

export function FavoriteButton({ active, onPress }:
  { active: boolean; onPress: () => void }) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Remove from favourites' : 'Add to favourites'}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: theme.surface,
          opacity: pressed ? 0.7 : 1
        }
      ]}
    >
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={21}
        color={active ? theme.primary : theme.secondaryText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
