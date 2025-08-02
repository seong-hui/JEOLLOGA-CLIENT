import ButtonBar from '@components/common/button/buttonBar/ButtonBar';
import Divider from '@components/common/divider/Divider';
import FilterBox from '@components/filter/filterBox/FilterBox';
import FILTERS from '@constants/filters';
import useFilter from '@hooks/useFilter';
import { useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';
import { filterListInstance } from 'src/store/store';
import titleMap from 'src/type/titleMap';

import * as styles from './filterModalContent.css';

interface Props {
  onComplete?: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const FilterModalContent = ({ onComplete, scrollRef }: Props) => {
  const { toggleFilter, handleResetFilter, handleSearch } = useFilter();
  const { logClickEvent } = useEventLogger('filter_tag');

  const [filtersState, setFiltersState] = useState(() => filterListInstance.getAllStates());

  const handleToggleFilter = (filterName: string) => {
    toggleFilter(filterName);
    const updatedState = filterListInstance.getAllStates();
    setFiltersState(updatedState);
  };

  const handleReset = async () => {
    await handleResetFilter();
    setFiltersState(filterListInstance.getAllStates());
  };

  const searchFilter = async () => {
    const selectedFilters = filterListInstance.getGroupedSelectedFilters();
    handleSearch(selectedFilters);
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
        label={`템플스테이 보기`}
        largeBtnClick={searchFilter}
        handleResetFilter={handleReset}
      />
    </>
  );
};
export default FilterModalContent;
