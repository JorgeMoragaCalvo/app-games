const API_KEY = "5f4b1cb41e354a0fabafffd3358a049a";
const BASE_URL = "https://api.rawg.io/api";

export const fetchGamesByMetacritic = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    key: API_KEY,
    ordering: "-metacritic",
    page: page.toString(),
    page_size: "18",
  });

  if (filters.search && filters.search.trim() !== "") {
    params.append("search", filters.search.trim());
    params.append("search_precise", "true");
  }

  // Add filters if they exist
  if (filters.year) {
    const year = parseInt(filters.year);
    // RAWG API requires dates in format YYYY-MM-DD
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    params.append("dates", `${startDate},${endDate}`);
    console.log(`Filtering by year: ${year} (${startDate} to ${endDate})`);
  }

  if (filters.genre) {
    params.append("genres", filters.genre);
    console.log(`Filtering by genre ID: ${filters.genre}`);
  }

  if (filters.platform) {
    params.append("platforms", filters.platform);
  }

  if (filters.developer) {
    params.append("developer", filters.developer);
  }
};
