const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const childControllers = require("./controllers/childControllers");
const proControllers = require("./controllers/proControllers");
const dashboardProControllers = require("./controllers/dashboardProControllers");
const notificationControllers = require("./controllers/NotificationControllers");
const proDisponibilityControllers = require("./controllers/proDisponibilityControllers");
const resetPasswordControllers = require("./controllers/resetPasswordControllers");

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

const {
  verifyProEmail,
  verifyParentEmail,
  generatePasswordTokenForPro,
  generatePasswordTokenForParent,
  verifyTokenPasswordPro,
  verifyTokenPasswordParent,
  hashNewPassword,
} = require("./controllers/resetPasswordControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// ----------------  Parent & Child routes  -------------------

router.get("/logout", logout);

router.get("/parent", parentControllers.browse);

router.get(
  "/parent/reservations",
  verifyToken,
  parentControllers.getReservations
);
router.get("/parent/:id", parentControllers.read);

router.get("/parent/child/:id", parentControllers.showChildWithParent);

router.patch(
  "/parent/mail",
  verifyToken,
  verifyIfParentRegistered,
  parentControllers.edit
);

router.patch(
  "/parent/password",
  verifyToken,
  hashPassword,
  parentControllers.edit
);

router.put(
  "/parent/reservations/cancel/:id",
  verifyToken,
  parentControllers.cancelReservation
);
router.patch("/parent/modify", verifyToken, parentControllers.edit);

router.post("/parent/login", getParentByEmail, verifyPassword);

router.post(
  "/parent/register",
  verifyIfParentRegistered,
  hashPassword,
  parentControllers.add
);

router.post(
  "/parent/reservation",
  verifyToken,
  parentControllers.saveReservation
);

router.get("/dispo/:id", proControllers.browseProAndDispo);

router.get("/child", childControllers.browse);

router.post("/child/register", childControllers.add);

router.get(
  "/available/days/:id",
  proDisponibilityControllers.GetAvailableDaysOfPro
);

// ---------------- / Parent & Child routes  -------------------

// ----------------  Pro routes  -------------------

router.get("/pro", proControllers.browse);

router.get("/pro/profile", verifyToken, proControllers.profile);

router.patch(
  "/pro/mail",
  verifyToken,
  verifyIfParentRegistered,
  proControllers.editAuth
);
router.patch(
  "/pro/password",
  verifyToken,
  hashPassword,
  proControllers.editAuth
);

router.get("/pro/:id", proControllers.read);

router.patch("/pro/:id", verifyToken, proControllers.edit);

router.post("/pro/login", getProByEmail, verifyPassword, proControllers.login);

router.post(
  "/pro/register",
  verifyIfProRegistered,
  hashPassword,
  proControllers.register
);

// ---------------- / Pro routes  -------------------

// ----------------  Upload image routes  -------------------

router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  proControllers.upload
);

router.get("/upload/:id", proControllers.read);

// ---------------- / Upload image routes  -------------------

// ----------------  Notifications routes  -------------------

router.get(
  "/notifications/parents",
  verifyToken,
  notificationControllers.GetAllNotificationsForParent
);

router.get(
  "/notifications/pro",
  verifyToken,
  notificationControllers.GetAllNotificationsForPro
);

router.get(
  "/notifications/checked/parent",
  verifyToken,
  notificationControllers.AllParentNotificationsAreRead
);
router.get(
  "/notifications/checked/pro",
  verifyToken,
  notificationControllers.AllProNotificationsAreRead
);

router.get(
  "/notifications/number/parent",
  verifyToken,
  notificationControllers.getNumberOfParentNewNotifications
);

router.get(
  "/notifications/number/pro",
  verifyToken,
  notificationControllers.getNumberOfProNewNotifications
);

// ---------------- / Notifications routes  -------------------

// ----------------  Pro Dashboard routes  -------------------

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

router.get(
  "/dashboard/preview",
  verifyToken,
  dashboardProControllers.getProInfoForPreview
);

router.get(
  "/dashboard/days",
  verifyToken,
  dashboardProControllers.getProDaysForPreview
);

router.get(
  "/dashboard/chart/:date",
  verifyToken,
  dashboardProControllers.getDataForToday
);

router.get(
  "/dashboard/waiting-order",
  verifyToken,
  dashboardProControllers.browseReservationsWaiting
);

router.get(
  "/dashboard/occupation/:date",
  verifyToken,
  dashboardProControllers.getDataForToday
);

router.get(
  "/occupation/:date",
  verifyToken,
  dashboardProControllers.getOccupationRates
);

// ---------------- / Pro Dashboard routes  -------------------

// ----------------  Reset Password routes  -------------------

router.post(
  "/pro/forgottenpassword",
  verifyProEmail,
  generatePasswordTokenForPro,
  resetPasswordControllers.sendForgottenPassword
);

router.post(
  "/pro/resetpassword",
  verifyTokenPasswordPro,
  hashNewPassword,
  resetPasswordControllers.resetPasswordPro
);

router.post(
  "/parent/forgottenpassword",
  verifyParentEmail,
  generatePasswordTokenForParent,
  resetPasswordControllers.sendForgottenPassword
);

router.post(
  "/parent/resetpassword",
  verifyTokenPasswordParent,
  hashNewPassword,
  resetPasswordControllers.resetPasswordParent
);

// ---------------- / Reset Password routes  -------------------

module.exports = router;
