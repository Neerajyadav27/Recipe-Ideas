import React from 'react';
import { Search } from 'lucide-react';
import './SearchForm.css';

const SearchForm = ({ searchTerm, setSearchTerm, searchRecipes, fetchRandomRecipes }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search recipes (e.g., pasta, chicken, vegan)..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" />
      </div>
      <div className="search-buttons">
        <button type="submit" className="button search-button">
          Search Recipes
        </button>
        <button type="button" onClick={fetchRandomRecipes} className="button random-button">
          Random Recipes
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
