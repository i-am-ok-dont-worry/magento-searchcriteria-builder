## Search Criteria
Search criteria object is used by Magento to apply filtering and sorting
on certain fields on REST API endpoints.

Search criteria allows to apply different conditions by which output 
results will be mapped.


## Filtering
Use `applyFilter` method to apply filter to the query:

* filter by field
```javascript
const sq = new SearchCriteria();
sq.applyFilter('customer_id', '11111', 'eq');
```

* filter not equal
```javascript
const sq = new SearchCriteria();
sq.applyFilter('customer_id', 0, 'neq');
```

## Sorting
Use `applySort` method to sort the results:
```javascript
const sq = new SearchCriteria();
sq.applySort('created_at', 'asc');
```

## Get result
Use `build` method to build stringified search criteria.
```javascript
const sq = new SearchCriteria();
const stringifiedQuery = sq.build();
console.log('Stringified query: ', stringifiedQuery);
``` 
