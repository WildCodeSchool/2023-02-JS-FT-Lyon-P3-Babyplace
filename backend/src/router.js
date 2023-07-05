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
router.get("/parent/child/:id", parentControllers.showChildWithParent);
router.post("/parent/login", getParentByEmail, verifyPassword);
router.post("/parent/register", hashPassword, parentControllers.add);
router.get("/dispo/:id", proControllers.browseProAndDispo);

router.get("/child", childControllers.browse);
router.post("/child/register", childControllers.add);

router.get("/pro", proControllers.browse);
router.get("/pro/profile", proControllers.profile);
router.get("/pro/:id", proControllers.read);
router.post("/pro/login", getProByEmail, verifyPassword);
router.post(
  "/pro/register",
  verifyIfRegistered,
  hashPassword,
  proControllers.add
);
// router.post("/pro", hashPassword, proControllers.add);

router.get(
  "/dashboard/reservations",
  dashboardProControllers.browseReservations
);
router.get(
  "/dashboard/reservations/:id",
  verifyToken,
  dashboardProControllers.showMoreInfoOnOrder
);
router.put(
  "/dashboard/reservations/validate/:id",
  dashboardProControllers.validateOrder
);
router.put(
  "/dashboard/reservations/refuse/:id",
  dashboardProControllers.refuseOrder
);
router.put(
  "/dashboard/reservations/cancel/:id",
  dashboardProControllers.cancelOrder
);

module.exports = router;
