import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  overflow: 'hidden',
  touchAction: 'pan-y',
});

export const slideList = style({
  display: 'flex',
  width: '33.5rem',
  gap: '2rem',
});

export const slideItem = style({
  minWidth: '100%',
  height: '100%',
  cursor: 'pointer',
});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '137px',
  overflow: 'hidden',
  borderRadius: 8,
});

export const templestayName = style({
  ...theme.FONTS.h3Sb18,
  textAlign: 'left',
});

export const slideContent = style({
  display: 'flex',

  flexDirection: 'column',
});

export const bottomBox = style({
  display: 'flex',
  color: theme.COLORS.gray8,
  ...theme.FONTS.b9R15,
  gap: '1rem',
  alignItems: 'center',
});

export const likeBtn = style({
  padding: '1rem',
});

export const bottomContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: '0.8rem',
});

export const bottomWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
});
