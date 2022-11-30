const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record.js"));
// get driver connection
const dbo = require("./db/conn");

dbo.connectToServer(function (err) {
  // perform a database connection when server starts, quit without calling app.listen if connection error
  if (err) {
    console.error(err);
    return false;
  }

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
