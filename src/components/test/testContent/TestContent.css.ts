import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';
import bgImage from '@assets/images/test_question_img.png';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const title = style({
  ...theme.FONTS.h0Sb22,
  color: theme.COLORS.white,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
  padding: '5.4rem 2rem 0 2rem',
});

export const textButton = style({
  background: theme.COLORS.btnGradient,
  width: '33.5rem',
  height: '6.6rem',
  border: `1px solid ${theme.COLORS.gray2}`,
  borderRadius: '40px',
  boxShadow: theme.COLORS.blueDropshadow,
  color: theme.COLORS.gray11,
  ...theme.FONTS.c1Sb15,
});

export const selectContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginTop: '7.8rem',
});
