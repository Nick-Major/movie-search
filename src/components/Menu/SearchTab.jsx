import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/movieSlice';
import MovieList from '../MovieList';

const SearchTab = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchMovies(query));
    }
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
        <button type="submit">Поиск</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <MovieList movies={movies} />
    </div>
  );
};

export default SearchTab;