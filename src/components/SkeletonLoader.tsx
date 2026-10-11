import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../theme/ThemeProvider';

export function SkeletonLoader({ count = 4 }: { count?: number }) {
  const { theme } = useAppTheme();
  return <View style={styles.grid}>{Array.from({ length: count },
    (_, i) => <View key={i}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={[styles.image, { backgroundColor: theme.surfaceAlt }]} />
      <View style={[styles.line, { backgroundColor: theme.surfaceAlt }]} />
      <View style={[styles.shortLine, { backgroundColor: theme.surfaceAlt }]} />
    </View>)}</View>;
}
const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 14 },
  card: { width: '47.5%', borderRadius: 20, padding: 8, borderWidth: 1, marginBottom: 4 },
  image: { width: '100%', aspectRatio: 1.05, borderRadius: 14 },
  line: { height: 12, borderRadius: 6, marginTop: 12, width: '90%' },
  shortLine: { height: 8, borderRadius: 4, marginTop: 7, width: '52%' }
});
