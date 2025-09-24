# PROJETO 1 - Programação Web Fullstack

## 👥 Alunos

- **Victor Motta de Oliveira** - RA: 2346613
- **Vitor Encinas Negrão de Tulio** - RA: 2346621

## 📋 Descrição do Projeto

**O que assistir hoje?** é uma aplicação React SPA (Single Page Application) que permite aos usuários descobrir novos shows de TV através de busca e recomendação aleatória. O app utiliza a API pública [TVMaze](https://www.tvmaze.com/api) para fornecer informações detalhadas sobre séries, incluindo imagens, gêneros, avaliações e links para mais detalhes.

A aplicação está disponível online e pode ser acessada através do link:

**🔗 [https://mottapng.github.io/proj1-web-fullstack/](https://mottapng.github.io/proj1-web-fullstack/)**

## Hook e Biblioteca do React escolhidos

- **useReducer**: Para gerenciamento de estado no SearchContext para controlar busca de shows, estados de loading, erros e ordenação
- **Material UI**: Para utilização de componentes já estilizados

## ✨ Funcionalidades

### 🔍 Sistema de Busca

- **Busca por nome**: Campo obrigatório para pesquisar shows específicos
- **Ordenação**:
  - Por relevância (padrão)
  - Por popularidade (shows mais famosos primeiro)

### 🎯 Recomendações Aleatórias

- **Algoritmo de sugestão**: Seleciona shows populares baseado em:
  - Peso de popularidade (weight > 50)
  - Avaliações altas (rating > 7.0)
  - Conteúdo recente (2015+)
- **Fallback**: Se não encontrar shows muito populares, usa critérios menos restritivos

## 🌐 API Utilizada

### TVMaze API

- **Documentação**: https://www.tvmaze.com/api
- **Endpoints utilizados**:
  - `GET /search/shows`: Busca shows por nome e gênero
    - Parâmetros: `?q={query}`
    - Exemplo: `https://api.tvmaze.com/search/shows?q=breaking`
  - `GET /shows`: Lista completa de shows para recomendações
    - Sem parâmetros: retorna todos os shows disponíveis

## 🎣 Hook useReducer

**Onde foi usado**: No arquivo `src/contexts/SearchContext.jsx` para gerenciar todo o estado da aplicação relacionado à busca de shows.

**Como foi implementado**: O useReducer gerencia 5 estados principais da aplicação:

```javascript
// Estado inicial no SearchContext.jsx
const initialState = {
  query: "", // Termo de busca atual
  results: [], // Lista de shows encontrados
  loading: false, // Estado de carregamento
  error: null, // Mensagens de erro
  sortBy: "relevance", // Tipo de ordenação (relevância ou popularidade)
};

// Reducer com 3 ações principais
const searchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        loading: true,
        error: null,
        query: action.payload.query || state.query,
        sortBy: action.payload.sortBy || state.sortBy,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload.results,
        error: null,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        results: [],
      };
    default:
      return state;
  }
};
```

**Como é usado nos componentes**:

1. **SearchForm.jsx**: Despacha `SEARCH_START` ao enviar formulário
2. **RandomShowCard.jsx**: Despacha `SEARCH_START` ao buscar sugestão
3. **ResultsList.jsx**: Consome `results`, `loading` e `error` para renderizar estados
4. **Todos os componentes**: Acessam estado via `useSearch()` hook

## 📁 Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── SearchForm.jsx   # Formulário de busca com validação
│   ├── ResultsList.jsx   # Lista de resultados com estados visuais
│   ├── ResultCard.jsx   # Card individual de show
│   └── RandomShowCard.jsx # Componente de recomendações
├── contexts/            # Contextos para gerenciamento de estado
│   └── SearchContext.jsx # Contexto principal da aplicação
├── App.jsx             # Componente raiz da aplicação
├── main.jsx            # Ponto de entrada da aplicação
├── App.css             # Estilos globais
└── index.css           # Reset e estilos base
```

## 🚀 Instruções para Executar Localmente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/tv-show-finder.git
cd tv-show-finder
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**

```bash
npm run dev
```

4. **Acesse a aplicação**

- Abra seu navegador em `http://localhost:5173`
- A aplicação será recarregada automaticamente quando você fizer alterações

### Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
npm run lint     # Verificação de código
```

_Este projeto foi desenvolvido para primeira entrega da matéria de Desenvolvimento Full Stack do curso de Engenharia de Software, demonstrando boas práticas de React, gerenciamento de estado e integração com APIs externas._
