import { useState } from 'react';
import SearchTab from './SearchTab';
import FavoritesTab from './FavoritesTab';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="menu">
      <div className="tabs">
        <button
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Поиск
        </button>
        <button
          className={activeTab === 'favorites' ? 'active' : ''}
          onClick={() => setActiveTab('favorites')}
        >
          Избранное
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'search' ? <SearchTab /> : <FavoritesTab />}
      </div>
    </div>
  );
};

export default Menu;