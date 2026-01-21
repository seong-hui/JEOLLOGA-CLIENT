import { getTypeRandom, getTypeRecommend } from '@apis/recommend/axios';
import { TypeRandomResponse, TypeRecommendResponse } from '@apis/recommend/type';
import { ApiResponse } from '@apis/response';
import { useQuery } from '@tanstack/react-query';

const useGetTypeRandom = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['typeRandom'],
    queryFn: () => getTypeRandom(),
    select: (res: ApiResponse<TypeRandomResponse>) => res.data.results,
  });

  return { data, isLoading, isError };
};

export const useGetTypeRecommend = (enabled: boolean = true) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['typeRecommend'],
    queryFn: () => getTypeRecommend(),
    enabled,
    select: (res: ApiResponse<TypeRecommendResponse>) => res.data.results,
  });

  return { data, isLoading, isError };
};

export default useGetTypeRandom;
