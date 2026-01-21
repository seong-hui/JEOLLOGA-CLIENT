export interface TypeRandomTemplestay {
  templestayId: number;
  region: string;
  type: string;
  templestayName: string;
  templeName: string;
  imgUrl: string;
  wish?: boolean;
}

export interface TypeRandomResponse {
  results: TypeRandomTemplestay[];
}

export interface TypeRecommendResponse {
  results: TypeRandomTemplestay[];
}
