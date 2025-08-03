export interface TempleDetail {
  id: number;
  templestayName: string;
  templeName: string;
  address: string;
  phone: string;
  schedule: string;
  price: number;
  introduction: string;
  url: string;
  lat: number;
  lon: number;
  wish: boolean;
}

export interface TemplestayImg {
  imgurl: string;
}

export interface TemplestayImgsResponse {
  id: number;
  imgUrls: TemplestayImg[];
}

export interface Review {
  reviewId?: string;
  reviewTitle?: string;
  reviewLink?: string;
  reviewName?: string;
  reviewDescription?: string;
  reviewDate?: string;
  reviewImgUrl?: string;
}

export interface ReviewsResponse {
  templestayId: string;
  page: number;
  pageSize: number;
  totalPages: number;
  reviewCount: number;
  reviews?: Review[];
}
