const router = require("express").Router();
const googletrends = require("../controllers/googletrends");

router.post("/googletrends", googletrends.post);

module.exports = router;
