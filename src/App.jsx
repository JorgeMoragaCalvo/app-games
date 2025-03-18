import React, { useState, useEffect } from "react";
import GameList from "./components/GameList";
import Pagination from "./components/Pagination";
import GameFilters from "./components/GameFilters";
import SearchBox from "./components/SearchBox";
import { fetchGamesByMetacritic } from "./services/apiService";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    year: null,
    genre: null,
    platform: null,
    developer: null,
  });

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        console.log("Loading games with filters:", filters);
        const data = await fetchGamesByMetacritic(page, filters);
        console.log("Games data received:", data);
        setGames(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading games:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadGames();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, filters]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleFilterChange = (newFilters) => {
    console.log("Filters changed:", newFilters);
    // Reset to page 1 when filters change
    setPage(1);
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearch = (searchTerm) => {
    // Reset to page 1 when search changes
    setPage(1);
    setFilters({ ...filters, search: searchTerm });
  };

  const getActiveFiltersDescription = () => {
    const activeFilters = [];

    if (filters.search) activeFilters.push(`Search: "${filters.search}"`);
    if (filters.year) activeFilters.push(`Year: ${filters.year}`);
    if (filters.genre) {
      const genreName = document.querySelector(
        `#genre-filter option[value="${filters.genre}"]`
      )?.textContent;
      if (genreName) activeFilters.push(`Genre: ${genreName}`);
    }
    if (filters.platform) {
      const platformName = document.querySelector(
        `#platform-filter option[value="${filters.platform}"]`
      )?.textContent;
      if (platformName) activeFilters.push(`Platform: ${platformName}`);
    }
    if (filters.developer) {
      const developerName = document.querySelector(
        `#developer-filter option[value="${filters.developer}"]`
      )?.textContent;
      if (developerName) activeFilters.push(`Developer: ${developerName}`);
    }

    return activeFilters.length > 0
      ? activeFilters.join(" • ")
      : "No filters applied";
  };

  return (
    <div className="container">
      <header>
        <h1>Top Video Games</h1>
        <h3>by Metacritic Rating</h3>
      </header>

      <div className="search-and-filters">
        <SearchBox onSearch={handleSearch} />

        <GameFilters
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        <Pagination
          page={page}
          onPrevious={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <h2>Loading games...</h2>
        </div>
      ) : error ? (
        <div className="error-container">
          <h2>Error: {error}</h2>
        </div>
      ) : (
        <>
          <div className="active-filters">
            <p>{getActiveFiltersDescription()}</p>
          </div>

          {games.length === 0 ? (
            <div className="no-results">
              <h2>No games found with the selected filters</h2>
              <p>Try changing your filter selections</p>
            </div>
          ) : (
            <>
              <div className="results-info">
                <p>Showing {games.length} games</p>
              </div>
              <GameList games={games} />
            </>
          )}

          <Pagination
            page={page}
            onPrevious={handlePrevPage}
            onNext={handleNextPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
