import React, { useState, useEffect } from "react";

const GameFilters = ({ onFilterChange, currentFilters }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState({
    genres: true,
    platforms: true,
    developers: true,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i
  );
};
