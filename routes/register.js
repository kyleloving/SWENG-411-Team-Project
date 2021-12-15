const express = require('express');

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
  res.render('register', { fields });
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    await client.createUser({
      profile: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        login: body.email
      },
      credentials: {
        password: {
          value: body.password
        }
      }
    });

    res.redirect('/');
  } catch ({ errorCauses }) {
    const errors = {};

    errorCauses.forEach(({ errorSummary }) => {
      const [, field, error] = /^(.+?): (.+)$/.exec(errorSummary);
      errors[field] = error;
    });

    res.render('register', {
      errors,
      fields: fields.map((field) => ({
        ...field,
        error: errors[field.name],
        value: body[field.name]
      }))
    });
  }
});

module.exports = router;