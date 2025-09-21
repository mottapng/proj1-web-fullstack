import React from "react";
import { useSearch } from "../contexts/SearchContext";

const RandomShowCard = () => {
  const { searchStart, searchSuccess, searchError, loading } = useSearch();

  // Buscar show aleatório da API TVMaze
  const getRandomShow = async () => {
    try {
      // Despachar SEARCH_START
      searchStart("Show Aleatório", "");

      // Buscar lista de shows (primeira página)
      const response = await fetch("https://api.tvmaze.com/shows");

      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} ${response.statusText}`
        );
      }

      const shows = await response.json();

      if (!shows || shows.length === 0) {
        throw new Error("Nenhum show encontrado na API");
      }

      // Escolher um show aleatório
      const randomIndex = Math.floor(Math.random() * shows.length);
      const randomShow = shows[randomIndex];

      // Formatar como resultado da busca (mesmo formato do SearchForm)
      const formattedResult = [
        {
          show: randomShow,
        },
      ];

      // Despachar SEARCH_SUCCESS com o show aleatório
      searchSuccess(formattedResult);
    } catch (error) {
      // Despachar SEARCH_ERROR
      searchError(error.message);
    }
  };

  return (
    <div className="random-show-card">
      <div className="random-content">
        <div className="random-icon">🎲</div>
        <h3>Surpreenda-me!</h3>
        <p>Descubra um show aleatório</p>
        <button
          onClick={getRandomShow}
          disabled={loading}
          className="random-button"
        >
          {loading ? "Buscando..." : "Mostrar Show Aleatório"}
        </button>
      </div>
    </div>
  );
};

export default RandomShowCard;
