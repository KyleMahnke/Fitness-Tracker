import { useState, useEffect } from "react";

const ActivitiesToRoutines = ({ routineId }) => {
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState([]);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const TOKEN = window.localStorage.getItem("token");

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities
        `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          activityId,
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    console.log(activityId);
  };

  return (
    <>
      <h1>Attaching activities to your routine</h1>
      <h3>Select an activity:</h3>
      <form>
        <select
          value={activities}
          onChange={(e) => setActivityId(e.target.value)}
        >
          {activities.map((activity) => (
            <option value={activity.id}>{activity.name}</option>
          ))}
        </select>
        <br />
        <label>
          Desired Count:
          <input
            type="text"
            required
            name="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Desired Duration:
          <input
            type="text"
            required
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Activity</button>
      </form>
    </>
  );
};

export default ActivitiesToRoutines;
