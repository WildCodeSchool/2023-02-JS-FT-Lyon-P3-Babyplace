const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const childControllers = require("./controllers/childControllers");
const proControllers = require("./controllers/proControllers");
const dashboardProControllers = require("./controllers/dashboardProControllers");

const {
  getParentByEmail,
  getProByEmail,
  verifyPassword,
  hashPassword,
  verifyIfProRegistered,
  verifyToken,
  logout,
  verifyIfParentRegistered,
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/logout", logout);

router.get("/parent", parentControllers.browse);
router.get("/parent/:id", parentControllers.read);
router.get("/parent/child/:id", parentControllers.showChildWithParent);
router.post("/parent/login", getParentByEmail, verifyPassword);
router.post(
  "/parent/register",
  verifyIfParentRegistered,
  hashPassword,
  parentControllers.add
);
router.get("/dispo/:id", proControllers.browseProAndDispo);

router.get("/child", childControllers.browse);
router.post("/child/register", childControllers.add);

router.get("/pro", proControllers.browse);
router.get("/pro/profile", verifyToken, proControllers.profile);
router.get("/pro/:id", proControllers.read);
router.patch("/pro/:id", verifyToken, proControllers.edit);

router.post("/pro/login", getProByEmail, verifyPassword, proControllers.login);

router.post(
  "/pro/register",
  verifyIfProRegistered,
  hashPassword,
  proControllers.register
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
router.get(
  "/dashboard/calendar/:date",
  verifyToken,
  dashboardProControllers.getDateOrder
);
router.get(
  "/dashboard/overview/calendar/:month",
  verifyToken,
  dashboardProControllers.getAllReservationsForCalendar
);

module.exports = router;
