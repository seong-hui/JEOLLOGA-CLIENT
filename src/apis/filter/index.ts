import { fetchFilteredListV2, convertToV2Params } from '@apis/filter/axios';
import { FetchFilteredListProps } from '@apis/filter/type';
import { useMutation } from '@tanstack/react-query';
import queryClient from 'src/queryClient';

// v2 api 사용하는 hook
const useFetchFilteredListV2 = () => {
  return useMutation({
    mutationFn: ({
      groupedFilters,
      adjustedPrice,
      searchQuery,
      page,
      userId,
      sort,
    }: FetchFilteredListProps & { sort?: string }) => {
      const params = convertToV2Params(
        groupedFilters,
        adjustedPrice,
        searchQuery,
        page,
        userId,
        sort,
      );
      return fetchFilteredListV2(params);
    },
    onSuccess: (data, variables) => {
      const { groupedFilters, page, userId } = variables;
      queryClient.setQueryData(['filteredListV2', groupedFilters, page, userId], data);
    },
  });
};

export default useFetchFilteredListV2;
