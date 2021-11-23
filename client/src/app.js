import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Routines from "./components/Routines";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const TOKEN = window.localStorage.getItem("token");
    const checkAuth = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.id) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, [isLoggedIn]);
  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/login">
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/routines">
              <Routines setIsLoggedIn={setIsLoggedIn} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
