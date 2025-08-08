export interface WishItemV2 {
  templestayId: number;
  templeName: string;
  templestayName: string;
  region: string;
  type: string;
  imgUrl: string;
  wish: boolean;
}

export interface WishlistResponseV2 {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  content: WishItemV2[];
}

export interface WishActionResponse {
  code: number;
  msg: string;
}
