const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const GoogleTrends = require("./server/routes/googletrends");

app.use("/api", GoogleTrends);
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
