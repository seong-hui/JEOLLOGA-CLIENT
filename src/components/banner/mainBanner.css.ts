import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  aspectRatio: '375 / 347',
  marginBottom: '40px',
});

export const slideList = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  transition: 'transform 0.5s ease-in-out',
});

export const slideItem = style({
  minWidth: '100%',
  height: '100%',
  position: 'relative',
  cursor: 'pointer',
});

export const bannerImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const counterBadge = style({
  position: 'absolute',

  bottom: '30px',
  right: '28px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3px 8px',

  borderRadius: '4px',
  backgroundColor: theme.COLORS.black60,

  color: theme.COLORS.white,
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: 'normal',
});
