export interface Temple {
  id: number;
  rank: number;
  templestayName: string;
  imgUrl: string;
  region: string;
  templeName: string;
  wish: boolean;
}

export interface RankingResponse {
  recommendTemplestays: Temple[];
}
