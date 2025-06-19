const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites }) => {

  const formatRating = (rating) => {
    if (!rating || rating === 'N/A') return 'N/A';
    return parseFloat(rating).toFixed(1);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`Постер фильма "${movie.Title}"`} />
        ) : (
          <div className="no-poster">Нет постера</div>
        )}
      </div>
      <div className="movie-details">
        <h2>{movie.Title} ({movie.Year})</h2>
        
        <div className="detail-row">
          <span className="detail-label">Жанр:</span>
          <span>{movie.Genre || 'N/A'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Длительность:</span>
          <span>{movie.Runtime || 'N/A'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Режиссёр:</span>
          <span>{movie.Director || 'N/A'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Актёры:</span>
          <span>{movie.Actors || 'N/A'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Рейтинг IMDb:</span>
          <span className="imdb-rating">{formatRating(movie.imdbRating)}</span>
        </div>

        <div className="movie-actions">
          {onAddToFavorites && (
            <button 
              onClick={onAddToFavorites} 
              className="favorite-btn"
              aria-label="Добавить в избранное"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  strokeWidth="2" 
                />
              </svg>
              В избранное
            </button>
          )}

          {onRemoveFromFavorites && (
            <button 
              onClick={onRemoveFromFavorites} 
              className="remove-btn"
              aria-label="Удалить из избранного"
            >
              <span className="keyboard-x">×</span>
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;