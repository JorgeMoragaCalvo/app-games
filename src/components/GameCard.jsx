import React from "react";
// This component takes a game object as prop and displays key information from game: image, metacritic ranking, release, genres.
// N/A -> metacritic ranking not available
const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          className="game-image"
        />
      )}
      <div className="game-info">
        <h2>{game.name}</h2>
        <div className="metacritic">
          <span
            className={`score ${
              game.metacritic >= 75
                ? "high"
                : game.metacritic >= 50
                ? "medium"
                : "low"
            }`}
          >
            {game.metacritic || "N/A"}
          </span>
        </div>
        <p>Released: {game.released || "Unknown"}</p>
        <div className="genres">
          {game.genres?.map((genre) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
