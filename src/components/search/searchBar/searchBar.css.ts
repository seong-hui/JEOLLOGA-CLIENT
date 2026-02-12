import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const searchBarContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.6rem',

  width: '29.5rem',
  height: '4.4rem',
  padding: '1rem 0.8rem',
  borderRadius: 8,
  backgroundColor: theme.COLORS.gray1,

  color: theme.COLORS.black,
});

export const searchBarLayout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.6rem',

  width: '24.9rem',
  height: '2.4rem',
});

export const inputStyle = style({
  width: '21.9rem',
  backgroundColor: 'inherit',
  ...theme.FONTS.b7R16,
  lineHeight: '1.5rem',
  transform: 'scale(0.9375)',
  transformOrigin: 'left center',
  selectors: {
    '&::placeholder': {
      color: theme.COLORS.gray5,
      lineHeight: '1.5rem',
      transform: 'scale(0.9375)',
      transformOrigin: 'left center',
    },
  },
});
export const pointer = style({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
