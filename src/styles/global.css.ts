import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  width: '100%',
  fontSize: '62.5%',
  scrollBehavior: 'smooth',
});

globalStyle('#root', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  maxWidth: '37.5rem',
  minHeight: '100dvh',
  margin: '0 auto',
  paddingTop: '1.2rem',
});

globalStyle('body, button, input, select, table, textarea', {
  fontFamily: `
      Pretendard-Medium,
      Pretendard-Regular,
      Pretendard-Bold,
      -apple-system,
      BlinkMacSystemFont,
      Malgun Gothic,
      맑은 고딕,
      helvetica,
      sans-serif`,
});
