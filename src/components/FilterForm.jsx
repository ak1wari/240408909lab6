function FilterForm({ filter, onFilterChange, onClear }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <label htmlFor="title-filter">Filter posts by title</label>
      <div className="filter-controls">
        <input
          id="title-filter"
          type="text"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          placeholder="Type a title..."
        />
        <button type="button" className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
