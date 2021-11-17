const client = require("./client");

// database functions
async function getAllActivities() {
  const { rows } = await client.query(`SELECT * FROM activities;`);
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

async function attachActivitiesToRoutines(routines) {}

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
async function updateActivity(activity) {
  const { name, description } = activity;
  const {
    rows: [updateActivity],
  } = await client.query(
    `INSERT INTO activities(name, description)
    VALUES($1,$2)
    RETURNING *;
    `,
    [name, description]
  );
  return updateActivity;
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
