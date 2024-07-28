import React from 'react';
import './SearchBar.css';

function SearchBar({ query, setQuery }) {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;