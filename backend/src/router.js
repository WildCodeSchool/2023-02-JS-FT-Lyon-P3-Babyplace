const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const proControllers = require("./controllers/proControllers");
const dashboardProControllers = require("./controllers/dashboardProControllers");
const {
  getParentByEmail,
  getProByEmail,
  verifyPassword,
  hashPassword,
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/parent", parentControllers.browse);
router.get("/parent/:id", parentControllers.read);
router.post("/parent/login", getParentByEmail, verifyPassword);
router.post("/parent/register", hashPassword);
router.post("/parent", hashPassword, parentControllers.add);

router.get("/pro", proControllers.browse);
router.get("/pro/:id", proControllers.read);
router.post("/pro/login", getProByEmail, verifyPassword);
router.post("/pro/register", hashPassword);
router.post("/pro", hashPassword, proControllers.add);

router.get(
  "/dashboard/reservations",
  dashboardProControllers.browseReservations
);

module.exports = router;
