import { useHistory } from "react-router";
import React, { useState } from "react";

const NewActivity = ({ isLoggedIn }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const TOKEN = window.localStorage.getItem("token");
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.id) {
      setSuccessMessage("Thanks for adding an activity!");
      setTimeout(() => {
        history.push("/activities");
      }, 1500);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h2>Create New Activity</h2>
          {successMessage ? <h4>{successMessage}</h4> : null}
          <form className="createPostForm" onSubmit={handleSubmit}>
            <label>
              Activity name:
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
              Description:
              <input
                type="text"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <input type="submit" value="Create new listing" />
          </form>
        </>
      ) : (
        <h1>Please log in to create a new activity</h1>
      )}
    </>
  );
};

export default NewActivity;
