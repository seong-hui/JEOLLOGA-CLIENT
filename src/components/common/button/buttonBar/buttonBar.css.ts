import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const buttonBarWrapper = style({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 100,
});

export const buttonBarContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '37.5rem',
  maxWidth: '100%',
  height: '7.2rem',
  padding: '1rem 2rem',
  boxSizing: 'border-box',
  background: theme.COLORS.white,
  boxShadow: `0px -4px 16px 0px rgba(0, 0, 0, 0.05)`,
});
