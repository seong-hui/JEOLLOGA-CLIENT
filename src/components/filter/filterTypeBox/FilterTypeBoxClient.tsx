'use client';

import FilterTypeBox from '@components/filter/filterTypeBox/FilterTypeBox';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { filterListInstance, priceAtom } from 'src/store/store';

const FilterTypeBoxClient = () => {
  const setPrice = useSetAtom(priceAtom);

  useEffect(() => {
    filterListInstance.resetAllStates();
    setPrice({ minPrice: 0, maxPrice: 30 });
  }, [setPrice]);

  return <FilterTypeBox activeFilters={[]} />;
};

export default FilterTypeBoxClient;
