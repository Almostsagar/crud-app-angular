const express = require("express");
const router = express.Router();
const defaultController = require("../controller/defaultController")
router.route("/").get(defaultController.index);

router.route("/add").post(defaultController.addEmployees);

router.route("/update/:id").post(defaultController.updateEmployees);

router.route("/remove/:id").post(defaultController.removeEmployees);

module.exports = router;
