require('dotenv').config();
require('./dboperations');
const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

//Registration Page
app.use('/register', require('./routes/register'));

//Login Page
app.use('/login', require('./routes/login'));

//Record Time Page
app.use('/record', require('./routes/record'));

//View Timecard Page
app.use('/timecard', require('./routes/timecard'));

//Index Page
app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));