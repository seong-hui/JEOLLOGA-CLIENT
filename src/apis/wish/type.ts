export interface WishItem {
  templestayId: number;
  templeName: string;
  templestayName: string;
  region: string;
  type: string;
  imgUrl: string;
  wish: boolean;
}

export interface WishlistResponse {
  code: number;
  msg: string;
  data: {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: WishItem[];
  };
}

export interface WishActionResponse {
  code: number;
  msg: string;
}
