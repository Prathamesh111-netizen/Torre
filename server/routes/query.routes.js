const express = require("express");
const router = express.Router();

const QueryController = require("../controllers/query.controller");
const checkAuth = require("../middleware/auth");

router.get("/", checkAuth, QueryController.getQuery);
router.get("/recent", checkAuth, QueryController.recentQueries);

module.exports = router;