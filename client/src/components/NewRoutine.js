import { useHistory } from "react-router";
import React, { useState } from "react";

const NewRoutine = ({ isLoggedIn }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const TOKEN = window.localStorage.getItem("token");
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.id) {
      history.push("/myroutines");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h2>Create your new routine, bitch!</h2>
          {successMessage ? <h4>{successMessage}</h4> : null}
          <form className="createPostForm" onSubmit={handleSubmit}>
            <label>
              Routine Name:
              <input
                type="text"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Goal:
              <input
                type="text"
                required
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </label>
            <br />
            <label>Is public?</label>
            <input
              type="checkbox"
              checked={isPublic}
              name="ispublic"
              onChange={() => setIsPublic(!isPublic)}
            ></input>
            <input type="submit" value="Create Routine" />
          </form>
        </>
      ) : (
        <h1>Please log in to create a new routine.</h1>
      )}
    </>
  );
};

export default NewRoutine;
