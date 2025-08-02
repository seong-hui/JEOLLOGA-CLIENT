import getRanking from '@apis/ranking/axios';
import { RankingResponse } from '@apis/ranking/type';
import { ApiResponse } from '@apis/response';
import { useQuery } from '@tanstack/react-query';

const useGetRanking = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ranking'],
    queryFn: () => getRanking(),
    select: (res: ApiResponse<RankingResponse>) => res.data.recommendTemplestays,
  });

  return { data, isLoading, isError };
};

export default useGetRanking;
