import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const token = localStorage.getItem("token");

const MyRoutines = ({ username, setRoutineId }) => {
  const [routines, setRoutines] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(username);
  useEffect(() => {
    const getMyRoutines = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data;
      try {
        data = await response.json();
      } catch (error) {
        setRoutines([]);
        return;
      }

      console.log("DATA ", data);
      if (data.error) {
        setErrorMessage("No routine exists for this user.");
      } else {
        console.log(data);
        setRoutines(data);
      }
    };
    getMyRoutines();
  }, [username]);

  const handleDelete = async (routineId) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response2 = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("HEERERERERERERE", response2);
    let data2;
    try {
      data2 = await response2.json();
    } catch (error) {
      setRoutines([]);
      return;
    }

    if (data2.error) {
      setErrorMessage("No routine exists for this user.");
    } else {
      console.log(data2);
      setRoutines(data2);
    }
  };

  return (
    <>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <h1>These are my routines, bitch</h1>
      <Link to="/createroutine">
        <button>Create New Routine</button>
      </Link>
      {routines.map((routine) => (
        <div>
          <h2>Routine: {routine.name}</h2>
          <h3>Goal: {routine.goal}</h3>
          <h3>Creator Name: {routine.creatorName}</h3>
          {console.log(routine.id)}
          <Link to="/addactivities">
            <button
              onClick={() => setRoutineId(routine.id)}
              className="addRoutine"
            >
              Add Activities
            </button>
          </Link>
          <button
            className="addRoutine"
            onClick={() => handleDelete(routine.id)}
          >
            Delete
          </button>
          {routine.activities.length ? (
            <>
              <h4>Activities:</h4>
              <ul>
                {routine.activities.map((activity) => (
                  <>
                    <li>
                      {activity.name}: {activity.description}
                    </li>
                    <li>Number of reps: {activity.count}</li>
                    <li>Duration: {activity.duration}</li>
                    <br />
                  </>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default MyRoutines;
