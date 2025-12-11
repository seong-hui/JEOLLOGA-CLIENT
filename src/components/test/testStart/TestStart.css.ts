import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
});

export const bottom = style({
  marginTop: 'auto',
  paddingBottom: '4rem',
});

export const title = style({
  ...theme.FONTS.h1Sb24,
  color: theme.COLORS.white,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
  paddingTop: '5.4rem',
});

export const subTitle = style({
  ...theme.FONTS.c5M13,
  color: theme.COLORS.white,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
  margin: '0.8rem 0 6.1rem 0',
});
