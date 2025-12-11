import theme from '@styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
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
      NONE: { boxShadow: 'none' }, // 빈칸으로 나두면 안됨?
    },
  },
  defaultVariants: {
    color: 'NONE', // 기본값
  },
});
