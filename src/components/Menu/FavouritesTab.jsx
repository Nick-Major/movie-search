import { useSelector } from 'react-redux';
import Favourites from '../Favourites';

const FavouritesTab = () => {
  const { favorites } = useSelector((state) => state.movies);

  return (
    <div className="favorites-tab">
      <h2>Избранное</h2>
      <Favourites movies={favorites} />
    </div>
  );
};

export default FavouritesTab;