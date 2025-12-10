import theme from '@styles/theme.css';
import { style } from '@vanilla-extract/css';
import bgImage from '@assets/images/test_question_img.png';

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
  backgroundImage: `url(${bgImage.src})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
});
