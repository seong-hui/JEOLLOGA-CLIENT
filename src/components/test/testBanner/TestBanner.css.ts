import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const bannerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '33.5rem',
  height: '6.5rem',
  backgroundImage: "url('/assets/images/test/test_banner_bg.png')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: 8,

  ...theme.FONTS.c5M13,
  color: theme.COLORS.white,
  padding: '1.2rem',
  textAlign: 'left',
});

export const highlight = style({
  ...theme.FONTS.h5Sb16,
});
