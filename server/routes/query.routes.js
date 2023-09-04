const express = require("express");
const router = express.Router();

const QueryController = require("../controllers/query.controller");
const checkAuth = require("../middleware/auth");

router.get("/", checkAuth, QueryController.getQuery);

module.exports = router;