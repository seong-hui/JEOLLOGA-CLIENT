import useLocalStorage from '@hooks/useLocalStorage';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import queryClient from 'src/queryClient';
import { filterListInstance } from 'src/store/store';

type FilterQueryParams = {
  region?: string[];
  type?: string[];
  activity?: string[];
  etc?: string[];
  min?: number;
  max?: number;
  sort?: string;
  search?: string;
  page?: number;
  size?: number;
};

const isLoggedIn = getCookie('userNickname');

const useFilter = () => {
  const { addStorageValue } = useLocalStorage();

  // 필터 상태 토글
  const toggleFilter = async (filterName: string) => {
    try {
      filterListInstance.toggleStatus(filterName);
      queryClient.invalidateQueries({ queryKey: ['filteredList'], exact: false });
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();

  const handleSearch = useCallback(
    (params: FilterQueryParams = {}) => {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else {
            searchParams.set(key, String(value));
          }
        }
      });

      if (
        !isLoggedIn &&
        params.search &&
        typeof params.search === 'string' &&
        params.search.trim() !== ''
      ) {
        addStorageValue(params.search);
      }

      const queryString = searchParams.toString();
      router.push(queryString ? `/searchResult?${queryString}` : `/searchResult`);
    },
    [router, addStorageValue],
  );

  // 필터 초기화
  const handleResetFilter = async () => {
    filterListInstance.resetAllStates();
    router.replace('/searchResult');

    queryClient.invalidateQueries({ queryKey: ['filteredList'], exact: false });
  };

  return { toggleFilter, handleSearch, handleResetFilter };
};

export default useFilter;
