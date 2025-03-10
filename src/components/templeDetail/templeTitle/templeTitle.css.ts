import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '33.5rem',
  minHeight: '5rem',
  maxHeight: '10.6rem',
  gap: '0.4rem',
});

export const tagBox = style({
  display: 'flex',
  gap: '0.6rem',
  ...theme.FONTS.c2R14,
  color: theme.COLORS.gray8,
});

export const templeNameBox = style({
  ...theme.FONTS.h2Sb20,
});
