import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Activities = ({ isLoggedIn }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getAllActivities = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setActivities(data);
    };
    getAllActivities();
  }, []);

  return (
    <>
      <h1>Activites!!!!!!</h1>
      {isLoggedIn ? (
        <Link to="/newactivity">
          <button type="submit">Create New Activity</button>
        </Link>
      ) : null}
      {activities.map((activity) => (
        <div>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
        </div>
      ))}
    </>
  );
};

export default Activities;
