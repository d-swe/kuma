import React from 'react';
import './SearchBar.css';
import { Search } from '@trussworks/react-uswds';

function SearchBar({ query, setQuery }) {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div className="search-bar">
      <Search />    
    </div>
  );
}

export default SearchBar;