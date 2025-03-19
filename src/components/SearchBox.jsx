import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Manejador para el cambio en el input de búsqueda
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejador para limpiar el input de búsqueda
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Búsqueda..."
            className="search-input"
          />
          {/* Se muestra el botón de limpiar si solo hay un término de búsqueda */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              x
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          Búsqueda
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
