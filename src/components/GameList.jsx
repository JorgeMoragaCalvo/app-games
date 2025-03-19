import React from "react";
import GameCard from "./GameCard";
// takes a game list and renders each game as a GameCard component
const GameList = ({ games }) => {
  return (
    <div className="games-grid">
      {games.map((game) => (
        // Renders a GameCard component for each game
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
