import React from "react";
import { useSearch } from "../contexts/SearchContext";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const RandomShowCard = () => {
  const { searchStart, searchSuccess, searchError, loading } = useSearch();

  const getSmartSuggestion = async () => {
    try {
      searchStart("Sugestão Inteligente", "popularity");
      const response = await fetch("https://api.tvmaze.com/shows");
      if (!response.ok) throw new Error("Erro na API");
      const shows = await response.json();
      const popularShows = shows.filter(
        (s) =>
          s.weight > 50 &&
          s.rating?.average > 7 &&
          (s.image?.medium || s.image?.original) &&
          new Date(s.premiered).getFullYear() >= 2015
      );
      const list = popularShows.length > 0 ? popularShows : shows;
      const suggestedShow = list[Math.floor(Math.random() * list.length)];
      searchSuccess([{ show: suggestedShow }]);
    } catch (error) {
      searchError(error.message);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          ✨ Recomendação para você!
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Descubra um show popular que as pessoas estão amando
        </Typography>
        <Button
          onClick={getSmartSuggestion}
          variant="outlined"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Me Surpreenda"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RandomShowCard;
