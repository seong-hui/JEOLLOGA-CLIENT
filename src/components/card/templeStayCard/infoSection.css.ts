import theme from '@styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const infoBox = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  variants: {
    size: {
      default: {
        width: '16.3rem',
      },
      small: {
        width: '10.7rem',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const hashTag = recipe({
  base: {
    width: '100%',
    color: theme.COLORS.gray5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '1.7rem',
  },
  variants: {
    size: {
      default: {
        ...theme.FONTS.c5M13,
      },
      small: {
        ...theme.FONTS.c7R12,
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const title = recipe({
  base: {
    width: '100%',
    alignContent: 'top',
    color: theme.COLORS.black,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
  },
  variants: {
    size: {
      default: {
        height: '4.8rem',
        ...theme.FONTS.h5Sb16,
      },
      small: {
        height: '3.6rem',
        ...theme.FONTS.c3Sb14,
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const tagBox = recipe({
  base: {
    display: 'flex',
    width: '100%',
    gap: '0.6rem',
    height: '2.1rem',
  },
  variants: {
    size: {
      default: {
        marginTop: '0.8rem',
      },
      small: {
        marginTop: '0.4rem',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
