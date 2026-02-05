import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'start',

  width: '37.5rem',
  height: '6.4rem',
});

export const headerButton = style({
  width: '4rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const headerTop = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  padding: '0 1.2rem',
});

export const title = style({
  flex: 1,
  textAlign: 'center',
  color: theme.COLORS.gray11,
  ...theme.FONTS.b6M16,
});

export const closeButton = style({
  marginLeft: 'auto',
});