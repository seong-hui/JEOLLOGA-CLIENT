import FILTERS from '@constants/filters';
import { atom } from 'jotai';
import FilterList from 'src/model/filter/filterList';

export const priceAtom = atom({ minPrice: 0, maxPrice: 30 });

export const filterListInstance = new FilterList(FILTERS);
