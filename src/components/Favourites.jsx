import MovieCard from './MovieCard';
import { useDispatch } from 'react-redux';
import { removeFromFavorites } from '../store/movieSlice';

const Favorites = ({ movies }) => {
  const dispatch = useDispatch();

  if (movies.length === 0) {
    return <p>Список избранного пуст. Добавьте фильмы из вкладки "Поиск"!</p>;
  }

  return (
    <div className="favorites-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onRemoveFromFavorites={() => dispatch(removeFromFavorites(movie.imdbID))}
        />
      ))}
    </div>
  );
};

export default Favorites;