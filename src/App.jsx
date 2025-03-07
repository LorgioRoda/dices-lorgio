import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Table from "./Table";
import { Dices } from "./core/dices/UI/components/Dices";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Lanzar Dados</Link> | <Link to="/table">Tabla</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dices />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
