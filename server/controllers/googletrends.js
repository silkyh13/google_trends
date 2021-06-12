const googleTrends = require("../models/googletrends");

const get = (req, res) => {
  googleTrends.get("GME", (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    // console.log(typeof response);
    res.send(response);
  });
};

module.exports = {
  get,
};
