import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const token = localStorage.getItem("token");

const MyRoutines = ({
  username,
  setRoutineId,
  routineActivityId,
  setRoutineActivityId,
}) => {
  const [routines, setRoutines] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleDeleteRoutine = async (routineId) => {
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

  // handleDeleteActivity not working correctly. Gives auth error if hardcoded routineActivityId.
  const handleDeleteActivity = async (routineActivityId) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="myRoutines">
        {errorMessage ? <p>{errorMessage}</p> : null}
        <h1 className="routinesTitle">These are my routines, bruhh.</h1>
        <Link to="/createroutine">
          <button className="createNewRoutine">Create New Routine</button>
        </Link>
        {routines.map((routine) => (
          <div className="myRoutineInfo">
            <h2>Routine: {routine.name}</h2>
            <h3>Goal: {routine.goal}</h3>
            <h3>Creator Name: {routine.creatorName}</h3>
            {console.log(routine.id)}
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
                      <Link to="/editactivity">
                        <button
                          onClick={() =>
                            setRoutineActivityId(routineActivityId)
                          }
                        >
                          Edit Activities
                        </button>
                      </Link>
                      {/* deletes the activity if you hard-refresh the page after clicking the delete button */}
                      <Link>
                        <button
                          onClick={() =>
                            handleDeleteActivity(activity.routineActivityId)
                          }
                        >
                          Delete Activity from Routine - not working yet
                        </button>
                      </Link>
                      <br />
                    </>
                  ))}
                </ul>
              </>
            ) : null}
            <Link to="/addactivities">
              <button onClick={() => setRoutineId(routine.id)}>
                Add Activities
              </button>
            </Link>
            <Link to="/editroutine">
              <button onClick={() => setRoutineId(routine.id)}>
                Edit Routine Name/Goal
              </button>
            </Link>
            <br />
            <button
              className="addRoutine"
              onClick={() => handleDeleteRoutine(routine.id)}
            >
              Delete Routine
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyRoutines;
