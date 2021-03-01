const qs = require('qs');

class SearchCriteria {
    filterGroups = [];
    pageSize = 50;
    currentPage = 0;
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

    build () {
        const output = {
            searchCriteria: {
                filterGroups: this.filterGroups,
                ...(this.sortOrders.length && { sortOrders: this.sortOrders }),
                ...(this.pageSize && { pageSize: this.pageSize }),
                ...(this.currentPage && { currentPage: this.currentPage })
            }
        };

        return qs.stringify(output, { arrayFormat: 'bracket' });
    }
}

module.exports = SearchCriteria;
