import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const movie = useSelector(state => 
    [...state.movies.movies, ...state.movies.favorites]
      .find(movie => movie.imdbID === id)
  );

    if (!movie) {
        return (
        <div className="not-found">
            <p>Фильм не найден</p>
            <button onClick={() => navigate(-1)}>Вернуться назад</button>
        </div>
        );
    }

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-button">
        Назад к списку
      </button>
      
      <div className="movie-details-content">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'} 
          alt={movie.Title}
        />
        
        <div className="movie-info">
          <h1>{movie.Title} ({movie.Year})</h1>
          <p><strong>Рейтинг:</strong> {movie.imdbRating}</p>
          <p><strong>Жанр:</strong> {movie.Genre}</p>
          <p><strong>Длительность:</strong> {movie.Runtime}</p>
          <p><strong>Режиссер:</strong> {movie.Director}</p>
          <p><strong>Актеры:</strong> {movie.Actors}</p>
          <p><strong>Описание:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;