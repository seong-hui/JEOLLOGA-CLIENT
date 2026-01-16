import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const myPageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const userInfoContainer = style({
  minHeight: '75rem',
  position: 'relative',
});

export const modalOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% + 1.2rem)',
  backgroundColor: theme.COLORS.black60,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '-1.2rem',
});

export const resultSection = style({
  marginTop: '3.7rem',
  marginBottom: '6rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const cardWrapper = style({
  display: 'flex',
  justifyContent: 'center',
});

export const profileInfoBox = style({
  marginTop: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.2rem',
  marginBottom: '2.4rem',
});

export const nameRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  ...theme.FONTS.h5Sb16,
  color: theme.COLORS.black,
});

export const typeContent = style({
  color: theme.COLORS.primary600,
});

export const nickname = style({
  color: theme.COLORS.black,
});

export const email = style({
  ...theme.FONTS.f3R10,
  color: theme.COLORS.gray7,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '0.9rem',
  justifyContent: 'center',
  width: '100%',
});
