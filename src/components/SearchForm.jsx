import React, { useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Criar tema customizado com melhor contraste
const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#222222ff',
            '& fieldset': {
              borderColor: '#ccbfa7ff',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ccbfa7ff',
          },
          '& .MuiInputBase-input': {
            color: '#cccccc',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#1b1b1bff',
          color: '#ccbfa7ff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#e3f2fd',
          color: '#2b2b2bff',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          },
        },
      },
    },
  },
});

const SearchForm = () => {
  const [formData, setFormData] = useState({
    query: "",
    genre: "",
    sortBy: "relevance",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { searchStart, searchSuccess, searchError, loading } = useSearch();

  // Validação do formulário
  const validateForm = () => {
    const errors = {};

    if (!formData.query.trim()) {
      errors.query = "Query é obrigatória";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro de validação quando o usuário começar a digitar
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Buscar shows na API TVMaze
  const searchShows = async (query, genre = "", sortBy = "relevance") => {
    const baseUrl = "https://api.tvmaze.com/search/shows";
    const params = new URLSearchParams({ q: query, genre });
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    if (!response.ok) throw new Error("Erro ao buscar na API");
    let data = await response.json();
    if (sortBy === "popularity") {
      data = data.sort((a, b) => (b.show.weight || 0) - (a.show.weight || 0));
    }
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Despachar SEARCH_START
      searchStart(formData.query, formData.genre, formData.sortBy);

      // Fazer chamada à API
      const results = await searchShows(
        formData.query,
        formData.genre,
        formData.sortBy
      );

      // Despachar SEARCH_SUCCESS
      searchSuccess(results);
    } catch (error) {
      // Despachar SEARCH_ERROR
      searchError(error.message);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Buscar Shows *"
          name="query"
          value={formData.query}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!validationErrors.query}
          helperText={validationErrors.query}
          disabled={loading}
          variant="outlined"
        />
        <TextField
          select
          label="Ordenar por"
          name="sortBy"
          value={formData.sortBy}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={loading}
          variant="outlined"
        >
          <MenuItem value="relevance">Relevância</MenuItem>
          <MenuItem value="popularity">Mais Famosos</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? "Buscando..." : "Buscar Shows"}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SearchForm;
