const express = require('express');
const router = express.Router();
var config = require("../dbconfig");
const sql = require("mysql");

// Take the user to the homepage if they're already logged in
router.use('/', (req, res, next) => {
  if (req.userContext) {
    return res.redirect('/');
  }

  next();
});

const fields = [
  { name: 'userName', label: 'UserName' },
  { name: 'password', label: 'Password', type: 'password' }
];

router.get('/', (req, res) => {
  res.render('login', { fields });
});

router.post('/', async (req, res) => {
  console.log('req.body::', req.body);
  try {
    var con = sql.createConnection(config);
    con.connect();
    con.query("SELECT * FROM student Where NAME = '" + req.body.userName + "' and PASSWORD = '" + req.body.password + "'", function (err, result, fields) {
      if (err) throw err;
      console.log('result####', result);
      if(Object.entries(result).length === 0) {
        console.log('Invalid User Id or Password!!!');
      }
      else {
        console.log('Login successful!!!');
      }
      // res.json(result);
    });
    con.end();
  } catch (error) {
    console.log(error);
  }
  res.render('login', { fields });
  // const { body } = req;

  // try {
  //   await client.authUser({
  //     profile: {
  //       userName: body.userName,
  //     },
  //     credentials: {
  //       password: {
  //         value: body.password
  //       }
  //     }
  //   });
  // } catch ({ errorCauses }) {
  //   const errors = {};

    // errorCauses.forEach(({ errorSummary }) => {
    //   const [, field, error] = /^(.+?): (.+)$/.exec(errorSummary);
    //   errors[field] = error;
    // });

  //   res.render('login', {
  //     errors,
  //     fields: fields.map((field) => ({
  //       ...field,
  //       error: errors[field.name],
  //       value: body[field.name]
  //     }))
  //   });
  // }
});

module.exports = router;