import React, { createContext, useContext, useReducer } from "react";

// Action types
const SEARCH_START = "SEARCH_START";
const SEARCH_SUCCESS = "SEARCH_SUCCESS";
const SEARCH_ERROR = "SEARCH_ERROR";

// Initial state
const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
  sortBy: "relevance", // "relevance" or "popularity"
};

// Reducer function
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

// Context
const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Action creators
  const searchStart = (query, sortBy = "relevance") => {
    dispatch({
      type: SEARCH_START,
      payload: { query, sortBy },
    });
  };

  const searchSuccess = (results) => {
    dispatch({
      type: SEARCH_SUCCESS,
      payload: { results },
    });
  };

  const searchError = (error) => {
    dispatch({
      type: SEARCH_ERROR,
      payload: { error },
    });
  };

  // Context value
  const value = {
    ...state,
    searchStart,
    searchSuccess,
    searchError,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

// Custom hook to use the context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Export action types for external use if needed
export { SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR };
