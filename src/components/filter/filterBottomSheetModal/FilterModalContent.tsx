import useFetchFilteredListV2 from '@apis/filter';
import { TemplestaySearchParamsV2 } from '@apis/filter/type';
import ButtonBar from '@components/common/button/buttonBar/ButtonBar';
import Divider from '@components/common/divider/Divider';
import FilterBox from '@components/filter/filterBox/FilterBox';
import FILTERS from '@constants/filters';
import useFilter from '@hooks/useFilter';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';
import { filterListInstance, priceAtom } from 'src/store/store';
import titleMap from 'src/type/titleMap';

import * as styles from './filterModalContent.css';

interface Props {
  onComplete?: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  searchText?: string;
}

const FilterModalContent = ({ onComplete, scrollRef, searchText }: Props) => {
  const { toggleFilter, handleResetFilter, handleSearch } = useFilter();
  const { logClickEvent } = useEventLogger('filter_tag');
  const [price, setPrice] = useAtom(priceAtom);

  const [filtersState, setFiltersState] = useState(() => filterListInstance.getAllStates());

  const currentSearchParams = useMemo((): TemplestaySearchParamsV2 => {
    const selectedFilters = filterListInstance.getGroupedSelectedFilters();

    const getFilterValue = (filter: string[] | undefined) => {
      if (!filter || filter.length === 0) return undefined;
      return filter.join(',');
    };

    return {
      search: searchText,
      region: getFilterValue(selectedFilters.region),
      type: getFilterValue(selectedFilters.type),
      activity: getFilterValue(selectedFilters.activity),
      etc: getFilterValue(selectedFilters.etc),
      min: price.minPrice,
      max: price.maxPrice,
      page: 1,
      size: 5,
    };
  }, [price, filtersState, searchText]);

  const { data } = useFetchFilteredListV2(currentSearchParams);
  const totalCount = data?.totalElements || 0;

  const handleToggleFilter = (filterName: string) => {
    toggleFilter(filterName);
    const updatedState = filterListInstance.getAllStates();
    setFiltersState(updatedState);
  };

  const handleReset = async () => {
    await handleResetFilter();
    setFiltersState(filterListInstance.getAllStates());
    setPrice({ minPrice: 0, maxPrice: 30 });
  };

  const searchFilter = async () => {
    const selectedFilters = filterListInstance.getGroupedSelectedFilters();
    const searchParams = {
      ...selectedFilters,
      min: price.minPrice,
      max: price.maxPrice,
      search: searchText,
    };
    handleSearch(searchParams);
    logClickEvent('click_list', { label: '' });
    onComplete?.();
  };

  return (
    <>
      <main className={styles.main} ref={scrollRef}>
        {Object.entries(FILTERS).map(([key, items]) => (
          <div key={key}>
            <FilterBox
              title={titleMap[key]}
              items={items}
              id={key}
              filtersState={filtersState}
              onToggleFilter={handleToggleFilter}
            />
            <Divider />
          </div>
        ))}
      </main>
      <ButtonBar
        type="reset"
        label={`${totalCount}개의 템플스테이 보기`}
        largeBtnClick={searchFilter}
        handleResetFilter={handleReset}
        isDisabled={totalCount === 0}
      />
    </>
  );
};
export default FilterModalContent;
