import { Dimensions } from 'react-native';
import { CONTENT_PADDING, GRID_GAP } from '../constants';

export function getGridColumns(width = Dimensions.get('window').width): number {
  if (width >= 900) return 4;
  if (width >= 620) return 3;
  return 2;
}
export function getCardWidth(width: number, columns: number): number {
  const horizontalPadding = CONTENT_PADDING * 2;
  const gaps = GRID_GAP * (columns - 1);
  return Math.max(120, (width - horizontalPadding - gaps) / columns);
}
