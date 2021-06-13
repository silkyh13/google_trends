const express = require("express");
const app = express();
const port = 3000;
const GoogleTrends = require("./server/routes/googletrends");

app.use(
  express.json({
    type: "*/*", // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
  })
);
app.use("/api", GoogleTrends);
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
