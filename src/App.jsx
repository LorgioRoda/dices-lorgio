import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dice from "./Dice";
import Table from "./Table";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Lanzar Dados</Link> | <Link to="/table">Tabla</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dice />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
