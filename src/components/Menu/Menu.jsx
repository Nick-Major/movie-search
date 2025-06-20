import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = () => {
  const location = useLocation();
  const { favorites } = useSelector((state) => state.movies);

  return (
    <div className="menu">
      <div className="tabs">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Поиск
        </Link>
        <Link 
          to="/favorites" 
          className={location.pathname === '/favorites' ? 'active' : ''}
        >
          Избранное
          {favorites.length > 0 && (
            <span className="favorites-count">{favorites.length}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Menu;