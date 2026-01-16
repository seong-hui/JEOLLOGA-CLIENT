import { style } from '@vanilla-extract/css';
import theme from '@styles/theme.css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
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

export const startBg = style({
  backgroundImage: "url('/assets/images/test/test_start_img.png')",
});

export const stepBg = style({
  backgroundImage: "url('/assets/images/test/test_question_img.png')",
});

export const lottieStyle = style({
  width: '21rem',
  height: '21rem',
});

export const pendingContainer = style({
  ...theme.FONTS.h4Sb17,
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.2rem',
  flex: 1,

  backgroundImage: "url('/assets/images/test/test_result_loading_bg.png')",
  backgroundPosition: 'center',
  backgroundSize: 'contain',

  backgroundRepeat: 'no-repeat',
});
