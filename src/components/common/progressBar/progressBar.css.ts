import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '37.5rem',
});

export const barContainer = style({
  width: '100%',
  height: '0.2rem',
  overflow: 'hidden',
});

export const barStyle = style({
  height: '100%',
  backgroundColor: theme.COLORS.blue2,
  transition: 'width 0.3s ease-in-out',
});
