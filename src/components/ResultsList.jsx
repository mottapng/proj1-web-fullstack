import React from "react";
import { useSearch } from "../contexts/SearchContext";
import ResultCard from "./ResultCard";
import { Typography, Grid, Alert, CircularProgress, Box } from "@mui/material";

const ResultsList = () => {
  const { results, loading, error, query } = useSearch();

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography mt={2}>Buscando shows...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!query) {
    return <Typography textAlign="center" mt={4}>🔍 Busque por shows</Typography>;
  }

  if (!results || results.length === 0) {
    return (
      <Typography textAlign="center" mt={4}>
        <h3>😔</h3>
        Nenhum show encontrado para "{query}"
      </Typography>
    );
  }

  // Renderizar lista de resultados
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Resultados para "{query}"
      </Typography>
      <Typography variant="body2" gutterBottom>
        {results.length} show{results.length !== 1 ? "s" : ""} encontrado
        {results.length !== 1 ? "s" : ""}
      </Typography>

      <Grid container spacing={2} justifyContent={results.length === 1 ? "center" : "flex-start"}>
        {results.map((result) => (
          <Grid 
            item 
            xs={12} 
            sm={results.length === 1 ? 8 : 6} 
            md={results.length === 1 ? 6 : 4} 
            lg={results.length === 1 ? 4 : 4}
            key={result.show.id} 
            sx={{ display: 'flex' }}
          >
            <ResultCard show={result.show} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsList;
