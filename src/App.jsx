// App.js
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dice from "./Dice";
import Table from "./Table";

const App = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
    alert("Local storage eliminado.");
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Lanzar Dados</Link> | <Link to="/table">Tabla</Link>
        </nav>
        <button onClick={clearLocalStorage} style={{ margin: "10px", padding: "5px 10px" }}>
          Eliminar Local Storage
        </button>
        <Switch>
          <Route exact path="/" component={Dice} />
          <Route path="/table" component={Table} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
