import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Routines from "./components/Routines";
import Activities from "./components/Activities";
import NewActivity from "./components/NewActivity";
import MyRoutines from "./components/MyRoutines";
import NewRoutine from "./components/NewRoutine";
import ActivitiesToRoutines from "./components/ActivitiesToRoutines";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [routineId, setRoutineId] = useState("");

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
      console.log(data.username);
      setUsername(data.username);

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
              <Routines />
            </Route>
            <Route path="/myroutines">
              <MyRoutines username={username} setRoutineId = {setRoutineId} />
            </Route>
            <Route path="/activities">
              <Activities isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/newactivity">
              <NewActivity isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/createroutine">
              <NewRoutine isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/addactivities">
              <ActivitiesToRoutines isLoggedIn={isLoggedIn} routineId = {routineId} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
