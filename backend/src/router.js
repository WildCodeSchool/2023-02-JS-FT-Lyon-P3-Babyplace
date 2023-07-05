const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const proControllers = require("./controllers/proControllers");
const dashboardProControllers = require("./controllers/dashboardProControllers");
const placeControllers = require("./controllers/placeControllers");
const disponibilityControllers = require("./controllers/disponibilityControllers");
const proDisponibilityControllers = require("./controllers/proDisponibilityControllers");
const {
  getParentByEmail,
  getProByEmail,
  verifyPassword,
  hashPassword,
  verifyIfRegistered,
  verifyToken,
  logout,
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/logout", logout);

router.get("/parent", parentControllers.browse);
router.get("/parent/:id", parentControllers.read);
router.post("/parent/login", getParentByEmail, verifyPassword);
router.post("/parent/register", hashPassword);
router.post("/parent", hashPassword, parentControllers.add);
router.get("/dispo/:id", proControllers.browseProAndDispo);

router.get("/pro", proControllers.browse);
router.get("/pro/profile", verifyToken, proControllers.profile);
router.get("/pro/:id", proControllers.read);
router.patch("/pro/:id", verifyToken, proControllers.edit);
router.post(
  "/pro/login",
  getProByEmail,
  placeControllers.countPlaces,
  proDisponibilityControllers.listProDisponibilities,
  verifyPassword
);
router.post(
  "/pro/register",
  verifyIfRegistered,
  hashPassword,
  proControllers.add
);

router.post("/place", verifyToken, placeControllers.add);
router.post("/register/place", placeControllers.add);
router.put(
  "/place",
  verifyToken,
  placeControllers.listPlaces,
  placeControllers.destroy
);

router.post(
  "/proDisponibility",
  verifyToken,
  disponibilityControllers.findByName,
  proDisponibilityControllers.add
);
router.post(
  "/register/proDisponibility",
  disponibilityControllers.findByName,
  proDisponibilityControllers.add
);
router.put(
  "/proDisponibility",
  verifyToken,
  disponibilityControllers.findByName,
  proDisponibilityControllers.destroy
);

router.get(
  "/dashboard/reservations",
  verifyToken,
  dashboardProControllers.browseReservations
);
router.get(
  "/dashboard/reservations/:id",
  verifyToken,
  dashboardProControllers.showMoreInfoOnOrder
);
router.put(
  "/dashboard/reservations/validate/:id",
  verifyToken,
  dashboardProControllers.validateOrder
);
router.put(
  "/dashboard/reservations/refuse/:id",
  verifyToken,
  dashboardProControllers.refuseOrder
);
router.put(
  "/dashboard/reservations/cancel/:id",
  verifyToken,
  dashboardProControllers.cancelOrder
);
router.get("/dashboard/calendar/:date", dashboardProControllers.getDateOrder);

module.exports = router;
