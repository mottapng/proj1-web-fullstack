import React, { useState } from "react";
import { useSearch } from "../contexts/SearchContext";

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

  // Manipular mudanças nos inputs
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
    // Construir URL com parâmetros
    const baseUrl = "https://api.tvmaze.com/search/shows";
    const params = new URLSearchParams();
    params.append("q", query);

    if (genre) {
      params.append("genre", genre);
    }

    const url = `${baseUrl}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("Nenhum show encontrado para os critérios de busca");
    }

    // Ordenar por popularidade se solicitado
    if (sortBy === "popularity") {
      data = data.sort((a, b) => {
        const weightA = a.show.weight || 0;
        const weightB = b.show.weight || 0;
        return weightB - weightA; // Maior peso primeiro (mais popular)
      });
    }

    return data;
  };

  // Manipular envio do formulário
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
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="query">Buscar Shows *</label>
        <input
          type="text"
          id="query"
          name="query"
          value={formData.query}
          onChange={handleInputChange}
          placeholder="Digite o nome do show..."
          className={validationErrors.query ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.query && (
          <span className="error-message">{validationErrors.query}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="sortBy">Ordenar por</label>
        <select
          id="sortBy"
          name="sortBy"
          value={formData.sortBy}
          onChange={handleInputChange}
          disabled={loading}
        >
          <option value="relevance">Relevância</option>
          <option value="popularity">Mais Famosos</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="search-button">
        {loading ? "Buscando..." : "Buscar Shows"}
      </button>
    </form>
  );
};

export default SearchForm;
