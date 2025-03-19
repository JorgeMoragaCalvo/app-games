import React, { useState, useEffect } from "react";
import GameList from "./components/GameList";
import Pagination from "./components/Pagination";
import GameFilters from "./components/GameFilters";
import SearchBox from "./components/SearchBox";
import { fetchGamesByMetacritic } from "./services/apiService";
import "./App.css";

function App() {
  // Estados para almacenar la lista de juegos, carga de datos, almacenar errores, página actual y filtros de búsqueda
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
        setLoading(true); // Indica que los datos se están cargando
        console.log("Loading games with filters:", filters);
        const data = await fetchGamesByMetacritic(page, filters); // Llama a la API para obtener los juegos
        console.log("Games data received:", data);
        setGames(data.results || []); // Actualiza el estado con los resultados de la API
        setLoading(false); // Indica que la carga ha finalizado
      } catch (err) {
        console.error("Error loading games:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Se establece un timeout para evitar peticiones excesivas
    const timeoutId = setTimeout(() => {
      loadGames();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, filters]); // Se ejecuta cuando cambia de `page` o `filters`

  // Manejador para la página anterior
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1); // Si no es la primera página se disminuye
  };

  // Manejador para la página siguiente
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Manejador para el cambio en los filtros
  const handleFilterChange = (newFilters) => {
    console.log("Filters changed:", newFilters);
    // Reset to page 1 when filters change
    setPage(1);
    setFilters({ ...filters, ...newFilters }); // se actualiza los filtros
  };

  // Manejador para la búsqueda
  const handleSearch = (searchTerm) => {
    // Reset to page 1 when search changes
    setPage(1);
    setFilters({ ...filters, search: searchTerm });
  };

  // Función para obtener la descripción de los filtros activos
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
      : "No se aplicaron filtros";
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
                <p>Mostrando {games.length} games</p>
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
