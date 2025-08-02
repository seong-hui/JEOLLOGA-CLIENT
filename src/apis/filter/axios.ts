import { FilterType, PriceType, TemplestaySearchParamsV2 } from '@apis/filter/type';
import instance from '@apis/instance';
import MESSAGES from '@apis/messages';
import { isAxiosError } from 'axios';

export const fetchFilteredListV2 = async (params: TemplestaySearchParamsV2) => {
  try {
    const response = await instance.get('/v2/api/templestay', { params });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) throw error;
    else throw new Error(MESSAGES.UNKNOWN_ERROR);
  }
};

const getSelectedItems = (filterGroup?: Record<string, number>): string | undefined => {
  if (!filterGroup) return undefined;
  const selected = Object.entries(filterGroup)
    .filter(([, value]) => value === 1)
    .map(([item]) => item);
  return selected.length > 0 ? selected.join(',') : undefined;
};

export const convertToV2Params = (
  groupedFilters: FilterType,
  price: PriceType,
  search: string,
  page: number,
  userId?: string,
  sort?: string,
): TemplestaySearchParamsV2 => {
  const params: TemplestaySearchParamsV2 = {
    page,
    search: search && search.trim() !== '' ? search : undefined,
    min: price.minPrice > 0 ? price.minPrice : undefined,
    max: price.maxPrice < 30 ? price.maxPrice : undefined,
    sort: sort && sort.trim() !== '' ? sort : undefined,
    userId: userId && userId.trim() !== '' ? userId : undefined,
  };

  params.region = getSelectedItems(groupedFilters.region);
  params.type = getSelectedItems(groupedFilters.type);
  params.activity = getSelectedItems(groupedFilters.activity);
  params.etc = getSelectedItems(groupedFilters.etc);
  return params;
};
