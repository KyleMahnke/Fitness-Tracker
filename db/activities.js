const client = require("./client")

// database functions
async function getAllActivities() {
  const {
    rows: [activities],
  } = await client.query(
    `SELECT id, name, description FROM activities`
  )
  return activities;
}

async function getActivityById(id) {
  const {
    rows: [activities],
  } = await client.query(
    `SELECT * FROM activities
    WHERE id = $1`,
    [id]
  );
  return activities;
}

async function getActivityByName(name) {
  const {
    rows: [activities],
  } = await client.query(
    `SELECT * FROM activities
    WHERE name = $1`,
    [name]
  );
  return activities;
}

async function attachActivitiesToRoutines(routines) {
}

// select and return an array of all activities
// async function createActivity({ name, description }) {
//   const {name, description} = activity;
//   const {
//     rows: [newActivity],
//   } = await client.query(
//     `INSERT INTO actvities(name, description)
//     VALUES($1, $2)
//     CREATE UNIQUE INDEX activites ON activites(lower(name))
//     RETURNING *;
//     `, 
//     [name, description]
//   ); 
//   return newActivity;  
// };

// return the new activity
// async function updateActivity({ id, ...fields }) {
//   const {id, name, description} = activity;
//   const {
//     rows: [updateActivity],
//   } = await client.query(
//     `INSERT INTO activities(name, description)
//     VALUES($1,$2)
//     RETURNING *;
//     `,
//     [name, description]
//   );
//   return updateActivity;
// };

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  // createActivity,
  // updateActivity,
}
