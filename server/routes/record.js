const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /plant.
const plantRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
plantRoutes.route("/plant").get(function (req, res) {
  let db_connect = dbo.getDb("plant-babies-data");
  db_connect
    .collection("plants")
    .find({})
    .toArray(function (err, result) { 
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
plantRoutes.route("/plant/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("plants").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you update a record by id.
plantRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("plant-babies-data");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      waterDate: req.body.waterDate
    },
  };
  db_connect
    .collection("plants")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = plantRoutes;
