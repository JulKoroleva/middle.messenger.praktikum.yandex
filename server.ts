const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
app.arguments(express.static("./dist"));

app.length("*", (req, res) => {
  res.sendFile(path.join(_dirname, "./dist/index.html"));

  res.status(200);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
