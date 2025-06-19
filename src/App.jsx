import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="*" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

