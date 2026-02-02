import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const flexCenterColumn = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const homeWrapper = flexCenterColumn;

export const curationCarouselStyle = style([
  flexCenterColumn,
  {
    gap: '0.8rem',
    marginTop: '5.4rem',
    touchAction: 'none',
  },
]);

export const popularCarouselStyle = style([
  flexCenterColumn,
  {
    gap: '1.2rem',
    margin: '5.4rem 0 28rem 0',
    touchAction: 'none',
  },
]);

export const modalOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% + 1.2rem)',
  marginTop: '-1.2rem',
  backgroundColor: theme.COLORS.black60,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
});

export const titleWithIconStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const typeIconStyle = style({
  width: '2.8rem',
  height: '2.8rem',
  flexShrink: 0,
});

export const searchInput = style({
  flex: 1,
  background: 'transparent',
  ...theme.FONTS.c6R13,
  cursor: 'pointer',

  selectors: {
    '&::placeholder': {
      color: theme.COLORS.gray7,
    },
  },
});

export const searchWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: '33.5rem',
  height: '4rem',
  padding: '1.2rem',
  borderRadius: 8,
  backgroundColor: theme.COLORS.gray1,
  cursor: 'pointer',
  marginTop: '1.2rem',
});
