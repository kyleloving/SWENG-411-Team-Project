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
  { name: 'userName', label: 'UserName' },
  { name: 'password', label: 'Password', type: 'password' }
];

router.get('/', (req, res) => {
  res.render('login', { fields });
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    await client.authUser({
      profile: {
        userName: body.userName,
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

    res.render('login', {
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