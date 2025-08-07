export const TAPS = {
  filter: ['지역', '유형', '가격', '체험', '기타'],
  detail: ['리뷰', '프로그램 일정', '가격', '템플스테이 정보', '지도'],
} as const;

export type TapType = keyof typeof TAPS;
