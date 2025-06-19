import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import FavoritesTab from "./components/Menu/FavoritesTab";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/favorites" element={<FavoritesTab />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

