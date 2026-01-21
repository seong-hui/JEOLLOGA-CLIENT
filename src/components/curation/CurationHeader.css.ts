import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'start',

  width: '37.5rem',
  height: '6.4rem',
});

export const backButton = style({
  width: '4rem',
  height: '4rem',
});

export const headerTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
  alignItems: 'center',
  width: '100%',
  padding: '0 1.2rem',
});
