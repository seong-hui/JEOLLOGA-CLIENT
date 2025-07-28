export interface PriceType {
  minPrice: number;
  maxPrice: number;
}

export interface FilterType {
  region?: Record<string, number>;
  type?: Record<string, number>;
  purpose?: Record<string, number>;
  activity?: Record<string, number>;
  etc?: Record<string, number>;
}

export interface FetchFilteredListProps {
  groupedFilters: FilterType;
  adjustedPrice: PriceType;
  searchQuery: string;
  page: number;
  userId: string;
}

export interface TemplestaySearchParamsV2 {
  region?: string;
  type?: string;
  activity?: string;
  etc?: string;
  min?: number;
  max?: number;
  sort?: string;
  search?: string;
  page?: number;
  userId?: string;
  size?: number;
}
