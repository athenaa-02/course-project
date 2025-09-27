
function FilterChips({ activeFilter, setActiveFilter, activeSort, setActiveSort, clearFilters }) {
  return (
    <div className='active_chips'>
      {activeFilter && (
        <div className='filter_chip'>
          <span>{activeFilter}</span>
          <button
            onClick={() => {
              setActiveFilter(null);
              clearFilters("filter");
            }}
          >
            x
          </button>
        </div>
      )}

      {activeSort && (
        <div className='filter_chip'>
          <span>{activeSort}</span>
          <button
            onClick={() => {
              setActiveSort(null);
              clearFilters("sort");
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterChips;