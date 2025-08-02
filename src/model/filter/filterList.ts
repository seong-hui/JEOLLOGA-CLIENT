import Filter from 'src/model/filter/filter';

class FilterList {
  private filters: Map<string, Filter>;

  constructor(initData: Record<string, string[]>) {
    this.filters = new Map();

    Object.entries(initData).forEach(([group, filterNames]) => {
      filterNames.forEach((filterName) => {
        this.filters.set(filterName, new Filter(filterName, group, 0));
      });
    });
  }

  toggleStatus(filterName: string): void {
    const filter = this.filters.get(filterName);
    if (filter) {
      filter.toggleStatus();
      return;
    }
    throw new Error(`${filterName} 필터가 존재하지 않습니다.`);
  }

  getState(filterName: string): number {
    const filter = this.filters.get(filterName);
    if (filter) {
      return filter.getState();
    }
    throw new Error(`${filterName} 필터가 존재하지 않습니다.`);
  }

  getAllStates(): Record<string, number> {
    const result: Record<string, number> = {};
    this.filters.forEach((filter, name) => {
      result[name] = filter.getState();
    });

    return result;
  }

  resetAllStates(): void {
    this.filters.forEach((filter) => {
      filter.setState(0);
    });
  }

  getGroupedSelectedFilters(): Record<string, string[]> {
    const selectedFilters: Record<string, string[]> = {};

    this.filters.forEach((filter) => {
      if (filter.getState() === 1) {
        const group = filter.getGroup();
        const name = filter.getName();
        if (!selectedFilters[group]) {
          selectedFilters[group] = [];
        }
        selectedFilters[group].push(name);
      }
    });

    return selectedFilters;
  }
}

export default FilterList;
