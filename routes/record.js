const express = require('express');
const router = express.Router();
var config = require("../dbconfig");
const sql = require("mysql");

router.get('/', (req, res) => {
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM workday", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
  // res.render('record');
});

module.exports = router;