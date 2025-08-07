import fetchFilteredListV2 from '@apis/filter/axios';
import { TemplestaySearchParamsV2 } from '@apis/filter/type';
import { useQuery } from '@tanstack/react-query';

const useFetchFilteredListV2 = (params: TemplestaySearchParamsV2) => {
  return useQuery({
    queryKey: ['filteredListV2', params],
    queryFn: () => fetchFilteredListV2(params),
    enabled: true,
    placeholderData: (previousData) => previousData,
  });
};

export default useFetchFilteredListV2;
