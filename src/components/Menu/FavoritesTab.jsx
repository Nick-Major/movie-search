import { useSelector } from 'react-redux';
import Favorites from '../Favourites';

const FavoritesTab = () => {
  const { favorites } = useSelector((state) => state.movies);

  return (
    <div className="favorites-tab">
      <h2>Избранное ({favorites.length})</h2>
      <Favorites movies={favorites} />
    </div>
  );
};

export default FavoritesTab;