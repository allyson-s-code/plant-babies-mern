const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /plant.
const plantRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conndb/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
plantRoutes.route("/plants").get(function (req, res) {
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
plantRoutes.route("/plants/:id").get(function (req, res) {
  let db_connect = dbo.getDb();

  //let number = parseInt(req.params.id);
  let id = ObjectId(req.params.id);

  let myquery = { _id: id };

  db_connect.collection("plants").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
plantRoutes.route("/plants/create").post(function (req, response) {
  let db_connect = dbo.getDb("plant-babies-data");
  let myobj = {
    name: req.body.name,
    botanicalName: req.body.botanicalName,
    img: req.body.img,
    waterFrequency: req.body.waterFrequency,
    feedFrequency: req.body.feedFrequency,
    light: req.body.light,
    care: req.body.care,
    waterDate: req.body.waterDate,
    feedDate: req.body.feedDate,
  };
  db_connect.collection("plants").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
plantRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("plant-babies-data");

  //let number = parseInt(req.params.id);
  let id = ObjectId(req.params.id);

  let myquery = { _id: id };

  let newvalues = {
    $set: {
      waterDate: req.body.waterDate,
      feedDate: req.body.feedDate,
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

// This section will help you edit a record by id.
plantRoutes.route("/:id/edit").post(function (req, response) {
  let db_connect = dbo.getDb("plant-babies-data");

  let id = ObjectId(req.params.id);

  let myquery = { _id: id };

  let newvalues = {
    $set: {
      name: req.body.name,
      botanicalName: req.body.botanicalName,
      img: req.body.img,
      waterFrequency: req.body.waterFrequency,
      feedFrequency: req.body.feedFrequency,
      light: req.body.light,
      care: req.body.care,
      waterDate: req.body.waterDate,
      feedDate: req.body.feedDate,
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

// This section will help you delete a record
plantRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("plant-babies-data");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("plants").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = plantRoutes;
