import { useEffect, useState } from "react";

const MyRoutines = ({ username }) => {
  const [routines, setRoutines] = useState([]);
  console.log("USERNAME:", username);

  useEffect(() => {
    const getMyRoutines = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/sandra/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    getMyRoutines();
  }, []);

  return (
    <>
      <h1>These are my routines, bitch</h1>
    </>
  );
};

export default MyRoutines;
