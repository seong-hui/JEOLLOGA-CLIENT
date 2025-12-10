import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const bubble = style({
  backgroundColor: theme.COLORS.green8,
  borderRadius: '40px',
  position: 'relative',
  ...theme.FONTS.i2R14,
  color: theme.COLORS.green7,
  textAlign: 'center',
  width: 'fit-content',
  padding: '0.6rem 1.6rem',
});

export const tail = style({
  position: 'absolute',
  transform: 'translateX(-50%)',
  bottom: '-1rem',
  left: '50%',
  borderLeft: '0.6rem solid transparent',
  borderRight: '0.6rem solid transparent',
  borderTop: `1rem solid ${theme.COLORS.green8}`,
});
