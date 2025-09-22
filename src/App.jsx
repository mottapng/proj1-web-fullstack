import React from "react";
import { SearchProvider } from "./contexts/SearchContext";
import RandomShowCard from "./components/RandomShowCard";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import "./App.css";

function App() {
  return (
    <SearchProvider>
      <div className="app">
        <header className="app-header">
          <h1>🎬 O que assistir hoje?</h1>
          <p>Descubra seus próximos shows favoritos</p>
        </header>

        <main className="app-main">
          <section className="search-section">
            <RandomShowCard />
            <SearchForm />
          </section>

          <section className="results-section">
            <ResultsList />
          </section>
        </main>

        <footer className="app-footer">
          <p>
            Dados fornecidos por{" "}
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              TVMaze API
            </a>
          </p>
        </footer>
      </div>
    </SearchProvider>
  );
}

export default App;
