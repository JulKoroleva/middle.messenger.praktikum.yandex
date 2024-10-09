const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

const allowedPaths = ["/"]; 

app.get("*", (req, res) => {
  if (allowedPaths.includes(req.path)) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
  } else {
    res.status(404).send(`Page ${req.path} not found`);
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
