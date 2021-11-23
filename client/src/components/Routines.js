import { useEffect, useState } from "react";
import Link from "react-router-dom";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getAllRoutines = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setRoutines(data);
    };
    getAllRoutines();
  }, []);
  return (
    <>
      <h1>All Routines</h1>
      {routines.map((routine) => (
        <div>
          <h2>Routine: {routine.name}</h2>
          <h3>Goal: {routine.goal}</h3>
          <h3>Creator Name: {routine.creatorName}</h3>
          {routine.activities.length ? (
            <p>Activities: {routine.activities.name}</p>
          ) : (
            <p>Activities: none</p>
          )}
        </div>
      ))}
    </>
  );
};

export default Routines;
