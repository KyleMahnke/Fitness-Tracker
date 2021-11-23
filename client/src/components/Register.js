import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    }
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const data = await response.json();
    window.localStorage.setItem("token", data.token);

    if (response.ok === true) {
      setIsLoggedIn(true);
      setSuccessMessage("Thanks for registering!");
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <>
      <h2>Register for our Fitness App</h2>
      {errorMessage ? <h4>{errorMessage}</h4> : null}
      {successMessage ? <h4>{successMessage}</h4> : null}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            required
            minLength="4"
            name="name"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            required
            minLength="6"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            required
            minLength="6"
            name="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register;
