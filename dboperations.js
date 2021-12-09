var config = require("./dbconfig");
const sql = require("mysql");




//importing required modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8090;
app.listen(port);


//Config the app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


//GET Student API http://localhost:8090/api/student
router.route('/student').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM student", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//GET Staff API http://localhost:8090/api/staff
router.route('/staff').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM staff", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//GET Workday API http://localhost:8090/api/workday
router.route('/workday').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM workday", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

// GET Crew API http://localhost:8090/api/crew
router.route('/crew').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM crew", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

// GET Boat API http://localhost:8090/api/boat
router.route('/boat').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM boat", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

// GET Administrator API http://localhost:8090/api/admin
router.route('/admin').get((request, response)=>{
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM administrator", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})
