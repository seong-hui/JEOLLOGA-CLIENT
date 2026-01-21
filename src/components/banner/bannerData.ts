export interface BannerItem {
  id: number;
  thumbnailImage: string;
  detailImage: string | null;
  alt: string;
  link: string;
  type: 'internal' | 'external';
}

const BANNER_DATA: BannerItem[] = [
  {
    id: 1,
    thumbnailImage: '/assets/images/banner/banner_1_thumb.png',
    detailImage: '/assets/images/banner/banner_1_detail.png',
    alt: '사찰음식 템플스테이',
    link: '/curation/temple-food',
    // link: '/searchResult?keyword=사찰음식',
    type: 'internal',
  },
  {
    id: 2,
    thumbnailImage: '/assets/images/banner/banner_2.png',
    detailImage: null,
    alt: '절비티아이 테스트',
    link: '/test',
    type: 'internal',
  },
  {
    id: 3,
    thumbnailImage: '/assets/images/banner/banner_3.png',
    detailImage: null,
    alt: '절로가 공식 인스타그램',
    link: 'https://www.instagram.com/jeol.lo.ga/',
    type: 'external',
  },
  {
    id: 4,
    thumbnailImage: '/assets/images/banner/banner_4.png',
    detailImage: null,
    alt: '목탁이 인스타그램',
    link: 'https://www.instagram.com/moktak_jeolloga/',
    type: 'external',
  },
];

export default BANNER_DATA;
