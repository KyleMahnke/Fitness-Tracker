const client = require("./client");

// database functions
async function getAllActivities() {
  const { rows } = await client.query(`
  SELECT *
  FROM activities;`);
  return rows;
}

async function getActivityById(id) {
  const {
    rows: [activity],
  } = await client.query(
    `SELECT *
    FROM activities
    WHERE id=$1;`,
    [id]
  );
  return activity;
}

async function getActivityByName(activityName) {
  const {
    rows: [activities],
  } = await client.query(
    `SELECT * FROM activities
    WHERE name=$1`,
    [activityName]
  );
  return activities;
}

async function attachActivitiesToRoutines(routines) {
  const routinesToReturn = [...routines];
  const routineInfo = routinesToReturn
    .map((fieldName, index) => `$${index + 1}`)
    .join(", ");
  const routineIds = routinesToReturn.map(
    (fieldName, index) => `$${index + 1}`
  );
  const { rows: activities } = await client.query(
    `SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities.id AS "routineActivityId", routine_activities."routineId"
    FROM activities
    JOIN routine_activities ON "activityId" = activities.id
    WHERE routine_activities."routineId" IN (${routineInfo})
    `,
    routineIds
  );
}

// select and return an array of all activities
async function createActivity(activity) {
  const { name, description } = activity;
  const {
    rows: [newActivity],
  } = await client.query(
    `INSERT INTO activities(name, description)
      VALUES($1, $2)
      RETURNING *;
      `,
    [name, description]
  );
  return newActivity;
}

// return the new activity
async function updateActivity({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(", ");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `UPDATE activities SET ${setString}
    WHERE id = $1
    RETURNING *;
    `,
    [id, ...fieldValues]
  );

  const [activity] = rows;

  return activity;
}

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
