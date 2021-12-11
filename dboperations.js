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

//POST Workday API http://localhost:8090/api/workday
router.route('/workday').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      STUDENT_ID: 123,
      ADVISOR_ID: 456,
      CREW: 'Test',
      CHECK_IN: '2021-12-08 23:59:59',
      CHECK_OUT: '2021-12-08 23:59:59',
      HOURS: 8,
      HOURSSHORT: 1
    };
    con.connect();
    con.query("INSERT INTO stats.workday SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//POST student API http://localhost:8090/api/student
router.route('/student').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      DODID_SSN: 1234567890,
      NAME: 'TEST DATA',
      ADDRESS: '1400 Greensight apt 3 Pittsburgh PA 15220',
      PHONE: '(412) 734 8426',
      RATING: 'MMN3',
      MANDATED_HOURS: 15,
      ACADEMIC_STATUS: 'Good',
      ADVISOR_NUMBER: 1234567890,
      CREW: 'MTS626 A',
      PASSWORD: 'Test'

    };
    con.connect();
    con.query("INSERT INTO stats.student SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//POST staff API http://localhost:8090/api/staff
router.route('/staff').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      DODID_SSN: 4125468872,
      NAME: 'TEST DATA',
      ADDRESS: '1400 Greensight apt 3 Pittsburgh PA 15220',
      PHONE: '(412) 734 8426',
      RATING: 'MMN1',
      SUPERVISOR_ID: 2402063826,
      PASSWORD: 'Testtest',
      CREW: 'MTS635 A'

    };
    con.connect();
    con.query("INSERT INTO stats.staff SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//POST crew API http://localhost:8090/api/crew
router.route('/crew').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      SHIFT: 'MIDS',
      HULL: 'MTS645',
      NAME: 'MTS645 D'
    };
    con.connect();
    con.query("INSERT INTO stats.crew SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//POST boat API http://localhost:8090/api/boat
router.route('/boat').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      HULL: 'MTS645',
      REACTOR: 'S6W',
      COMMISSION: '2001-02-20',
      DECOMMISSION: '2022-02-20',
      LOCATION: 'NWS Chaeleston North Pier'
    };
    con.connect();
    con.query("INSERT INTO stats.boat SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})

//POST admin API http://localhost:8090/api/admin
router.route('/admin').post((request, response)=>{
  try {
    var con = sql.createConnection(config);
    var params = {
      DODID_SSN: 4125468872,
      NAME: 'TEST DATA',
      ADDRESS: '1400 Greensight apt 3 Pittsburgh PA 15220',
      PHONE: '(412) 734 8426',
      RATING: 'MMN1',
      HULL: 'MTS645',
      PASSWORD: 'Testtest'
    };
    con.connect();
    con.query("INSERT INTO stats.administrator SET ?", params, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
})