require('dotenv').config();
const path = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
const hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const flash = require('connect-flash');

// const sassMiddleware = require('node-sass-middleware');
const notifications = require('./middlewares/flash');

// âšī¸ Connects to the database
require('./configs/db');

// đĒ Routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

// äˇ Sessions
require('./configs/session')(app);

// âšī¸ Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Registered HBS Helpers
require('./configs/hbs');

// Flash notifications
app.use(flash());
app.use(notifications(app));

// đ Handling routes here
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', usersRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => next(createError(404)));

// âī¸ Error Handler
app.use((error, req, res) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
