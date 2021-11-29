const express = require("express");
const activitiesRouter = express.Router();
const { requireUser } = require("./utils");

// GET /api/activities/:activityId/routines

// activitiesRouter.get("/", async(req, res) => {
//     try {
//         const publicRoutinesByActivity = await getPublicRoutinesByActivity
//     }
// })

// GET /api/activities

activitiesRouter.get("/", async (req, res) => {
  const activities = await getAllActivities();

  res.send({
    activities,
  });
});

// POST /api/activities

activitiesRouter.post("/", requireUser);

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
