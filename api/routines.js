const express = require("express");
const { getAllRoutines } = require("../db");
const routinesRouter = express.Router();
const { requireUser } = require("./utils");

// GET /api/routines

routinesRouter.get("/", async (req, res) => {
  const routines = await getAllRoutines();

  res.send({
    routines,
  });
});

// POST /api/routines

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
