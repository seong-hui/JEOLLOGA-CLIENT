import { ApiResponse } from '@apis/response';
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
  const isLoggedIn = getCookie('userNickname');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: () => getSearchHistory(),
    enabled: !!isLoggedIn, // 로그인 된 경우만 요청 전송
    refetchOnWindowFocus: true, // 창이 다시 활성화되면 데이터 갱신
    staleTime: 0, // 항상 최신 데이터를 가져오기 위함 ,,
    select: (res: ApiResponse<SearchHistoryResponse>) => res.data.searchList,
  });

  return { data, isLoading, isError };
};
