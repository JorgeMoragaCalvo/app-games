const API_KEY = "5f4b1cb41e354a0fabafffd3358a049a";
const BASE_URL = "https://api.rawg.io/api";

// Función para obtener juegos filtrados por puntuación de Metacritic
export const fetchGamesByMetacritic = async (
  page = 1, // Página actual (por defecto, la primera página)
  filters = {} // Objeto con filtros de búsqueda
  //searchQuery = ""
) => {
  // Inicializa los parámetros de la URL con valores base
  const params = new URLSearchParams({
    key: API_KEY,
    ordering: "-metacritic", // Ordena por Metacritic de mayor a menor
    page: page.toString(),
    page_size: "18", // Tamaño de la cantidad de juegos por página
  });

  // Si hay un término de búsqueda en los filtros, se añade a los parámetros
  if (filters.search && filters.search.trim() !== "") {
    params.append("search", filters.search.trim()); // Añade el término de búsqueda
    params.append("search_precise", "true"); // Búsqueda precisa
  }

  // Si hay un filtro de año, se añade a los parámetros
  if (filters.year) {
    const year = parseInt(filters.year);
    // RAWG API format YYYY-MM-DD
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    params.append("dates", `${startDate},${endDate}`);
    console.log(`Filtering by year: ${year} (${startDate} to ${endDate})`);
  }

  // Si hay un filtro de género, se añade a los parámetros
  if (filters.genre) {
    params.append("genres", filters.genre);
    console.log(`Filtering by genre ID: ${filters.genre}`);
  }

  // Si hay un filtro de plataforma, se añade a los parámetros
  if (filters.platform) {
    params.append("platforms", filters.platform); // Agrega el ID de la plataforma
  }

  // Si hay un filtro de desarrollador, se añade a los parámetros
  if (filters.developer) {
    params.append("developers", filters.developer); // Agrega el ID de la empresa desarrolladora del juego
  }

  const url = `${BASE_URL}/games?${params.toString()}`;
  console.log("Fetching games with URL:", url);

  // Petición a la API
  const response = await fetch(url);

  // mensaje de error si la respuesta no es exitosa
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

// Función para obtener la lista de géneros
export const fetchGenres = async () => {
  const params = new URLSearchParams({
    key: API_KEY,
  });

  const url = `${BASE_URL}/genres?${params.toString()}`;
  console.log("Fetching genres with URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

// Función para obtener la lista de plataformas
export const fetchPlatforms = async () => {
  const params = new URLSearchParams({
    key: API_KEY,
  });

  const response = await fetch(`${BASE_URL}/platforms?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

// Función para obtener la lista de las empresas desarrolladoras
export const fetchDevelopers = async () => {
  const params = new URLSearchParams({
    key: API_KEY,
    page_size: 50,
  });

  const response = await fetch(`${BASE_URL}/developers?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};
