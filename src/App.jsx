import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import SearchTab from './components/Menu/SearchTab';
import FavouritesTab from './components/Menu/FavouritesTab';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Menu />
      <Routes>
        <Route path="/" element={<SearchTab />} />
        <Route path="/favorites" element={<FavouritesTab />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
