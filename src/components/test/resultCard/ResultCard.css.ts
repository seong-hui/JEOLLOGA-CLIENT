import theme from '@styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

const container = recipe({
  base: {
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.8rem',
  },
  variants: {
    color: {
      GREEN: {
        width: '20.6rem',
        height: '26.6rem',
        boxShadow: theme.COLORS.greenDropshadow,
        backgroundColor: theme.COLORS.white,
      },
      BLUE: {
        width: '20.6rem',
        height: '26.6rem',
        boxShadow: theme.COLORS.blueDropshadow,
        backgroundColor: theme.COLORS.white,
      },
      NONE: { boxShadow: 'none' },
    },
  },
  defaultVariants: {
    color: 'NONE',
  },
});

export default container;
