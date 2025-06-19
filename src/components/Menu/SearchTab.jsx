import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, resetSearch } from '../../store/movieSlice';
import MovieList from '../MovieList';

const SearchTab = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { movies, loading, error, searchPerformed } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMovies(query));
    }
  };

  const handleReset = () => {
    setQuery('');
    dispatch(resetSearch());
  };

  return (
    <div className="search-tab">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти фильм..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Идет поиск...' : 'Поиск'}
        </button>
        {searchPerformed && (
          <button 
            type="button" 
            onClick={handleReset}
            className="reset-btn"
          >
            Сбросить
          </button>
        )}
      </form>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Загружаем детали фильмов...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Произошла ошибка: {error}</p>
        </div>
      )}

      {!loading && searchPerformed && movies.length === 0 && (
        <div className="no-results">
          <p>Фильмы не найдены. Попробуйте другой запрос.</p>
        </div>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default SearchTab;