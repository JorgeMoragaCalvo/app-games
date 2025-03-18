import React, { useState, useEffect } from "react";
import {
  fetchGenres,
  fetchPlatforms,
  fetchDevelopers,
} from "../services/apiService";

const GameFilters = ({ onFilterChange, currentFilters }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState({
    genres: true,
    platforms: true,
    developers: true,
  });

  // Generate years from 1990 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        // Load genres
        const genresData = await fetchGenres();
        setGenres(genresData.results);
        setIsLoading((prev) => ({ ...prev, genres: false }));

        // Load platforms
        const platformsData = await fetchPlatforms();
        setPlatforms(platformsData.results);
        setIsLoading((prev) => ({ ...prev, platforms: false }));

        // Load developers
        const developersData = await fetchDevelopers();
        setDevelopers(developersData.results);
        setIsLoading((prev) => ({ ...prev, developers: false }));
      } catch (err) {
        console.error("Failed to load filter data:", err);
        setIsLoading({
          genres: false,
          platforms: false,
          developers: false,
        });
      }
    };

    loadFilterData();
  }, []);

  const handleYearChange = (e) => {
    onFilterChange({
      ...currentFilters,
      year: e.target.value === "all" ? null : e.target.value,
    });
  };

  const handleGenreChange = (e) => {
    onFilterChange({
      ...currentFilters,
      genre: e.target.value === "all" ? null : e.target.value,
    });
  };

  const handlePlatformChange = (e) => {
    onFilterChange({
      ...currentFilters,
      platform: e.target.value === "all" ? null : e.target.value,
    });
  };

  const handleDeveloperChange = (e) => {
    onFilterChange({
      ...currentFilters,
      developer: e.target.value === "all" ? null : e.target.value,
    });
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="year-filter">Year:</label>
        <select
          id="year-filter"
          value={currentFilters.year || "all"}
          onChange={handleYearChange}
          className="filter-select"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="genre-filter">Genre:</label>
        <select
          id="genre-filter"
          value={currentFilters.genre || "all"}
          onChange={handleGenreChange}
          className="filter-select"
          disabled={isLoading.genres}
        >
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="platform-filter">Platform:</label>
        <select
          id="platform-filter"
          value={currentFilters.platform || "all"}
          onChange={handlePlatformChange}
          className="filter-select"
          disabled={isLoading.platforms}
        >
          <option value="all">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="developer-filter">Developer:</label>
        <select
          id="developer-filter"
          value={currentFilters.developer || "all"}
          onChange={handleDeveloperChange}
          className="filter-select"
          disabled={isLoading.developers}
        >
          <option value="all">All Developers</option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>
              {developer.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameFilters;
