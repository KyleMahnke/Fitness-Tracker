import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
