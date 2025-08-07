export interface DelResponse {
  data: string;
  msg: string;
}

export interface Content {
  id: number;
  search: string;
}

export interface SearchHistoryResponse {
  searchList: Content[];
}
