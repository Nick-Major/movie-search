import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, addToFavorites } from "../store/movieSlice";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { movies, loading, error, favorites } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMovies(query));
    }
  };

  const handleAddToFavorites = (movie) => {
    dispatch(addToFavorites(movie));
  };

  return (
    <div className="movie-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <MovieList 
        movies={movies} 
        onAddToFavorites={handleAddToFavorites}
      />

      <div className="favorites">
        <h2>Favorites ({favorites.length})</h2>
        <MovieList 
          movies={favorites} 
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
    </div>
  );
};

export default MovieSearch;