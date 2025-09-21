import React from "react";
import { useSearch } from "../contexts/SearchContext";
import ResultCard from "./ResultCard";

const ResultsList = () => {
  const { results, loading, error, query } = useSearch();

  // Componente de Loading
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Buscando shows...</p>
    </div>
  );

  // Banner de Erro
  const ErrorBanner = ({ error }) => (
    <div className="error-banner">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Ops! Algo deu errado</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  // Estado vazio (sem busca ainda)
  const EmptyState = () => (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>Busque por shows</h3>
      <p>Digite o nome de um show na barra de pesquisa acima</p>
    </div>
  );

  // Sem resultados encontrados
  const NoResults = () => (
    <div className="no-results">
      <div className="no-results-icon">😔</div>
      <h3>Nenhum show encontrado</h3>
      <p>Não encontramos shows para "{query}"</p>
      <p>Tente usar termos diferentes ou verifique a ortografia</p>
    </div>
  );

  // Renderizar conteúdo baseado no estado
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner error={error} />;
  }

  if (!query) {
    return <EmptyState />;
  }

  if (!results || results.length === 0) {
    return <NoResults />;
  }

  // Renderizar lista de resultados
  return (
    <div className="results-list">
      <div className="results-header">
        <h2>Resultados para "{query}"</h2>
        <span className="results-count">
          {results.length} show{results.length !== 1 ? "s" : ""} encontrado
          {results.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="results-grid">
        {results.map((result) => (
          <ResultCard key={result.show.id} show={result.show} />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
