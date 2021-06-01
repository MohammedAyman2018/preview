const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const logger = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const flash = require('connect-flash');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();

const app = express();

// Passport cofig
require('./middlewares/passport')(passport)
require('./middlewares/facebook')

/** Connect to db */
async function db() {
  /**
   *    process.env.db
   *  "mongodb://localhost:27017/lap-store"
   */
  await mongoose.connect( process.env.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('connected to the db'))
    .catch((err) => console.log(err));
};
db();

app.use(function (req, res, next) {
  req.url = decodeURI(req.url);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: false }));

// set cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['secret']
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss())
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'public')));

/** Routes */
const admin = require('./routes/admin');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth-route');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/order');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', admin);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
