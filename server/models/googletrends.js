const axios = require("axios");
const googleTrends = require("google-trends-api");

const get = (searchWord, cb) => {
  googleTrends
    .interestOverTime({
      keyword: searchWord,
      startTime: new Date(Date.now() - 168 * 60 * 60 * 1000),
    })
    .then(function (results) {
      let result = JSON.parse(results);
      result = JSON.stringify({ timelineData: result.default.timelineData });
      cb(null, result);
    })
    .catch(function (err) {
      cb(err);
      console.error("Oh no there was an error", err);
    });
};
module.exports = {
  get,
};
