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
  marginTop: '0.8rem',
});

export const centerCard = style({
  width: '20.6rem',
  height: '26.6rem',
  borderRadius: '20px',
  backgroundColor: theme.COLORS.white,
  boxShadow: theme.COLORS.blueDropshadow,
  marginTop: '6.1rem',
});
