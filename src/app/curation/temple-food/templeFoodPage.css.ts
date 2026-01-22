import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.COLORS.white,
  position: 'relative',
});

export const stickyHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: theme.COLORS.white,
});

export const topImageContainer = style({
  width: '100%',
  position: 'relative',
  aspectRatio: '375 / 490',
});

export const contentContainer = style({
  padding: '2.7rem 2rem',
});

export const cardList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '0.9rem',
  rowGap: '4.4rem',
});
