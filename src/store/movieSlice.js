import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "64405bd2"; // Замени на свой ключ

// Асинхронный запрос для поиска фильмов
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
    );
    return response.data.Search || []; // Если фильмов нет, вернём пустой массив
  }
);

// Асинхронный запрос для получения деталей фильма
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (imdbID) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
    );
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
  },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;