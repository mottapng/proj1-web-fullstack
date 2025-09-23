import React from "react";
import { useSearch } from "../contexts/SearchContext";

const RandomShowCard = () => {
  const { searchStart, searchSuccess, searchError, loading } = useSearch();

  // Buscar sugestão inteligente da API TVMaze
  const getSmartSuggestion = async () => {
    try {
      // Despachar SEARCH_START
      searchStart("Sugestão Inteligente", "popularity");

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

      // Filtrar shows populares (com peso alto e rating bom)
      const popularShows = shows.filter((show) => {
        const hasGoodWeight = show.weight && show.weight > 50;
        const hasGoodRating = show.rating?.average && show.rating.average > 7.0;
        const hasImage = show.image?.medium || show.image?.original;
        const isRecent =
          show.premiered && new Date(show.premiered).getFullYear() >= 2015;

        return hasGoodWeight && hasGoodRating && hasImage && isRecent;
      });

      // Se não encontrar shows populares, usar os com maior peso
      const showsToChooseFrom =
        popularShows.length > 0
          ? popularShows
          : shows.filter((show) => show.weight && show.weight > 30);

      if (showsToChooseFrom.length === 0) {
        throw new Error("Nenhum show popular encontrado");
      }

      // Escolher um show da lista de populares
      const randomIndex = Math.floor(Math.random() * showsToChooseFrom.length);
      const suggestedShow = showsToChooseFrom[randomIndex];

      // Formatar como resultado da busca (mesmo formato do SearchForm)
      const formattedResult = [
        {
          show: suggestedShow,
        },
      ];

      // Despachar SEARCH_SUCCESS com a sugestão
      searchSuccess(formattedResult);
    } catch (error) {
      // Despachar SEARCH_ERROR
      searchError(error.message);
    }
  };

  return (
    <div className="random-show-card">
      <div className="random-content">
        <div className="random-icon">✨</div>
        <h3>Recomendação para você!</h3>
        <p>Descubra um show popular que as pessoas estão amando</p>
        <button
          onClick={getSmartSuggestion}
          disabled={loading}
          className="random-button"
        >
          {loading ? "Buscando..." : "Me Surpreenda"}
        </button>
      </div>
    </div>
  );
};

export default RandomShowCard;
