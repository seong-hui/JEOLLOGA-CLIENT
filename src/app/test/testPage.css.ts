import { style } from '@vanilla-extract/css';
import StartBgImage from '@assets/images/test/test_start_img.png';
import StepBgImage from '@assets/images/test/test_question_img.png';

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

export const startBg = style({
  backgroundImage: `url(${StartBgImage.src})`,
});

export const stepBg = style({
  backgroundImage: `url(${StepBgImage.src})`,
});
