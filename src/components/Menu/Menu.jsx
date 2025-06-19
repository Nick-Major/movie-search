import { Link, useLocation } from 'react-router-dom';
import SearchTab from './SearchTab';
import FavoritesTab from './FavoritesTab';

const Menu = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="tabs">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          Поиск
        </Link>
        <Link
          to="/favorites"
          className={location.pathname === '/favorites' ? 'active' : ''}
        >
          Избранное
        </Link>
      </div>

      <div className="tab-content">
        {location.pathname === '/' && <SearchTab />}
        {location.pathname === '/favorites' && <FavoritesTab />}
      </div>
    </div>
  );
};

export default Menu;