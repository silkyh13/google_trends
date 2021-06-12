const router = require("express").Router();
const googletrends = require("../controllers/googletrends");

router.get("/googletrends", googletrends.get);

module.exports = router;
