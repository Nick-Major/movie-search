import MovieCard from './MovieCard';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../store/movieSlice';

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAddToFavorites={() => dispatch(addToFavorites(movie))}
        />
      ))}
    </div>
  );
};

export default MovieList;