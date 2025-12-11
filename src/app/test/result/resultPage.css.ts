import theme from '@styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';
import bgImage from '@assets/images/test/test_result_img.png';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const resultSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  width: '100%',
  minHeight: '91.8rem',
  backgroundImage: `url(${bgImage.src})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '5.4rem 0',
});

export const title = style({
  ...theme.FONTS.h1Sb24,
  color: theme.COLORS.green7,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
});

export const subtitle = style({
  ...theme.FONTS.c5M13,
  color: theme.COLORS.green7,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
  margin: '0.8rem 0 3.2rem 0',
});

export const saveButton = style({
  width: '20.6rem',
  height: '4.6rem',
  borderRadius: '40px',
  boxShadow: theme.COLORS.greenDropshadow,
  background: theme.COLORS.btnGradient,
  marginTop: '1.2rem',
  ...theme.FONTS.c5M13,
  color: theme.COLORS.green5,
});

export const description = style({
  ...theme.FONTS.c4M14,
  color: theme.COLORS.gray10,
  padding: '4rem 2rem 5rem 2rem',
});

globalStyle(`${description} li`, {
  listStyle: 'disc',
});

export const divider = style({
  width: '29.5rem',
  border: `1px solid ${theme.COLORS.gray3}`,
  margin: '3.2rem 0',
});

export const footerText = style({
  ...theme.FONTS.c1Sb15,
  color: theme.COLORS.green7,
  textShadow: theme.COLORS.titleDropshadow,
  textAlign: 'center',
});

export const mateSection = style({
  ...theme.FONTS.c5M13,
  color: theme.COLORS.gray11,
  display: 'flex',
  gap: '2.4rem',
  paddingTop: '3.6rem',
});

export const mateTitle = style({
  ...theme.FONTS.h2Sb20,
});

export const mateSubtitle = style({
  ...theme.FONTS.c5M13,
  color: theme.COLORS.gray11,
  marginTop: '1.6rem',
});

export const bestMate = style({
  ...theme.FONTS.h5Sb16,
  color: theme.COLORS.primary600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const worstMate = style({
  ...theme.FONTS.h5Sb16,
  color: theme.COLORS.pink2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const buttonSection = style({
  marginTop: '5.8rem',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1.2rem',
  paddingBottom: '4.4rem',
});
