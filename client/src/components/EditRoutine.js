import { useState } from "react";
import { useHistory } from "react-router";

const EditRoutine = ({ routineId }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const TOKEN = window.localStorage.getItem("token");

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}
        `,
      {
        method: "PATCH",
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
    history.push("/myroutines");
  };

  return (
    <>
      <h2>Edit your Routine</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Updated name:
          <input
            type="text"
            required
            name="name"
            defaultValue={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Updated goal:
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
        <br />
        <br />
        <input type="submit" value="Edit Routine" />
      </form>
    </>
  );
};

export default EditRoutine;
