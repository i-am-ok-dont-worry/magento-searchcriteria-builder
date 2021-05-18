const qs = require('qs');

class SearchCriteria {
    filterGroups = [];
    pageSize = undefined;
    currentPage = undefined;
    sortOrders = [];

    applyFilter (field, value, conditionType) {
        if (!field) { return; }
        const filter = { field, value, conditionType: conditionType || 'eq' };
        const filters = [filter];

        this.filterGroups.push({ filters });
    }

    setPageSize (pageSize) {
        this.pageSize = pageSize || 50;
    }

    setCurrentPage (currentPage) {
        this.currentPage = currentPage || 0;
    }

    applySort (field, direction) {
        if (!field) { return; }
        const sortOrders = { field, direction: direction || 'asc' };
        this.sortOrders.push(sortOrders);
    }
    
    static buildFromSearchQuery (rawQuery) {
      try {
        const searchCriteria = new SearchCriteria();
        const query = JSON.parse(decodeURIComponent(rawQuery));
        const appliedFilters = query._appliedFilters;
        const appliedSort = query._appliedSort;

        if (appliedFilters && appliedFilters instanceof Array) {
          appliedFilters.forEach(filter => {
            const condition = typeof filter.value === 'string' ? 'eq' : Object.keys(filter.value)[0];
            const value = typeof filter.value === 'string' ? filter.value : filter.value[condition];
            searchCriteria.applyFilter(filter.attribute, value, condition);
          });
        }

        if (appliedSort && appliedSort instanceof Array) {
          const [sortOption] = appliedSort;
          searchCriteria.applySort(sortOption.field, sortOption.options);
        }

        return searchCriteria;
      } catch (e) {
        return null;
      }
    }

    build () {
        const output = {
            searchCriteria: {
                filterGroups: this.filterGroups,
                ...(this.sortOrders.length && { sortOrders: this.sortOrders }),
                ...(this.pageSize && { pageSize: this.pageSize }),
                ...(this.currentPage && { currentPage: this.currentPage })
            }
        };

        const stringified = qs.stringify(output, { arrayFormat: 'bracket' });
        return stringified === '' ? 'searchCriteria=' : stringified;
    }
}

module.exports = SearchCriteria;
