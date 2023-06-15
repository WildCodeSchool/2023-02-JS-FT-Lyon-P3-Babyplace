const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const proControllers = require("./controllers/proControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/parent", parentControllers.browse);
router.get("/parent/:id", parentControllers.read);

router.get("/pro", proControllers.browse);
router.get("/dispo/:id", proControllers.browseProAndDispo);
router.get("/pro/:id", proControllers.read);

module.exports = router;
