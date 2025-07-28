import { FilterType, PriceType, TemplestaySearchParamsV2 } from '@apis/filter/type';
import instance from '@apis/instance';
import MESSAGES from '@apis/messages';
import { isAxiosError } from 'axios';

// v2 API
export const fetchFilteredListV2 = async (params: TemplestaySearchParamsV2) => {
  try {
    const response = await instance.get('/v2/api/templestay', { params });

    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) throw error;
    else throw new Error(MESSAGES.UNKNOWN_ERROR);
  }
};

// 필터 데이터를 v2 API 파라미터로 변환하는 헬퍼 함수
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

  // 각 필터 그룹의 선택된 아이템들을 콤마로 구분된 문자열로 변환
  if (groupedFilters.region) {
    const selectedRegions = Object.entries(groupedFilters.region)
      .filter(([, isSelected]) => isSelected)
      .map(([region]) => region);
    if (selectedRegions.length > 0) {
      params.region = selectedRegions.join(',');
    }
  }

  if (groupedFilters.type) {
    const selectedTypes = Object.entries(groupedFilters.type)
      .filter(([, isSelected]) => isSelected)
      .map(([type]) => type);
    if (selectedTypes.length > 0) {
      params.type = selectedTypes.join(',');
    }
  }

  if (groupedFilters.activity) {
    const selectedActivities = Object.entries(groupedFilters.activity)
      .filter(([, isSelected]) => isSelected)
      .map(([activity]) => activity);
    if (selectedActivities.length > 0) {
      params.activity = selectedActivities.join(',');
    }
  }

  if (groupedFilters.etc) {
    const selectedEtc = Object.entries(groupedFilters.etc)
      .filter(([, isSelected]) => isSelected)
      .map(([etc]) => etc);
    if (selectedEtc.length > 0) {
      params.etc = selectedEtc.join(',');
    }
  }

  return params;
};
