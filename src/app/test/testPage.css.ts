import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
});

export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
});
