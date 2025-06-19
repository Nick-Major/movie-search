import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "64405bd2";
const DETAILS_REQUEST_DELAY = 200; // Задержка между запросами деталей в ms

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery, { rejectWithValue }) => {
    try {
      // Первый запрос - поиск по названию
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
      );

      if (!data.Search || data.Search.length === 0) {
        return [];
      }

      // Последовательные запросы деталей с задержкой
      const detailedMovies = [];
      for (const movie of data.Search) {
        await delay(DETAILS_REQUEST_DELAY);
        try {
          const { data: details } = await axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
          );
          detailedMovies.push(details);
        } catch (error) {
          console.error(`Failed to fetch details for ${movie.imdbID}:`, error);
          continue; // Пропускаем фильм при ошибке
        }
      }

      return detailedMovies;
    } catch (error) {
      return rejectWithValue(error.response?.data?.Error || error.message);
    }
  }
);

const initialState = {
  movies: [],
  favorites: [],
  loading: false,
  error: null,
  searchPerformed: false
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.some((fav) => fav.imdbID === movie.imdbID)) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.imdbID !== action.payload
      );
    },
    resetSearch: (state) => {
      state.movies = [];
      state.searchPerformed = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchPerformed = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movies = [];
      });
  },
});

export const { addToFavorites, removeFromFavorites, resetSearch } = movieSlice.actions;
export default movieSlice.reducer;