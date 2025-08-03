import { delSearchRecord, delAllSearchRecord, getSearchHistory } from '@apis/search/axios';
import { SearchHistoryResponse } from '@apis/search/type';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

export const useDelSearchRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (searchId: number) => delSearchRecord(searchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDelAllSearchRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => delAllSearchRecord(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetSearchHistory = () => {
  const accessToken = getCookie('Accesstoken');

  const { data, isLoading, isError } = useQuery<SearchHistoryResponse>({
    queryKey: ['searchHistory'],
    queryFn: () => getSearchHistory(),
    enabled: !!accessToken, // accessToken이 있을 때만 실행
    refetchOnWindowFocus: true, // 창이 다시 활성화되면 데이터 갱신
    staleTime: 0, // 항상 최신 데이터를 가져오기 위함 ,,
  });

  return { data, isLoading, isError };
};
