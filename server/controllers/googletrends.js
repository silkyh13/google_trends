const googleTrends = require("../models/googletrends");

const post = (req, res) => {
  googleTrends.post(req.body.keyword, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    // console.log(typeof response);
    res.send(response);
  });
};

module.exports = {
  post,
};
