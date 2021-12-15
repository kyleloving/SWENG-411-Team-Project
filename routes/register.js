const express = require('express');
var config = require("../dbconfig");
const sql = require("mysql");

const router = express.Router();

// Take the user to the homepage if they're already logged in
router.use('/', (req, res, next) => {
  if (req.userContext) {
    return res.redirect('/');
  }

  next();
});

const fields = [
  { name: 'idNumber', label: 'User ID Number'},
  { name: 'name', label: 'Full Name'},
  { name: 'address', label: 'Address'},
  { name: 'phone', label: 'Phone Number'},
  { name: 'rating', label: 'Rating'},
  { name: 'mandHours', label: 'Mandatory Hours'},
  { name: 'supIDNumber', label: 'Supervisor\'s ID Number'},
  { name: 'password', label: 'Password', type: 'password' }
];

router.get('/', (req, res) => {
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM student", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      // res.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
  res.render('register', { fields });
});

router.post('/', (req, res) => {
  try {
    var con = sql.createConnection(config);
    var params = {
      DODID_SSN: req.body.idNumber,
      NAME: req.body.name,
      ADDRESS: req.body.address,
      PHONE: req.body.phone,
      RATING: req.body.rating,
      MANDATED_HOURS: req.body.mandHours,
      ACADEMIC_STATUS: req.body.supIDNumber,
      ADVISOR_NUMBER: null,
      CREW: null,
      PASSWORD: req.body.password
    };
    con.connect();
    con.query("INSERT INTO stats.student SET ?", params, function (err, result, fields) {
      if (err) {
        console.log(err);
      };
      console.log(result);
      // res.end(JSON.stringify(result));
    });
    con.end();
  } catch (error) {
    console.log(error);
  } 
  res.render('register', { fields });
  
  // try {
  //   await client.createUser({
  //     profile: {
  //       firstName: body.firstName,
  //       lastName: body.lastName,
  //       email: body.email,
  //       login: body.email
  //     },
  //     credentials: {
  //       password: {
  //         value: body.password
  //       }
  //     }
  //   });

  //   res.redirect('/');
  // } catch ({ errorCauses }) {
  //   const errors = {};

    // errorCauses.forEach(({ errorSummary }) => {
    //   const [, field, error] = /^(.+?): (.+)$/.exec(errorSummary);
    //   errors[field] = error;
    // });

    // res.render('register', {
    //   errors,
    //   fields: fields.map((field) => ({
    //     ...field,
    //     error: errors[field.name],
    //     value: body[field.name]
    //   }))
    // });
  // }
});

module.exports = router;