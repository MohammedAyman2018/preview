const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const helmet = require('helmet');

const session = require('express-session');

require('dotenv').config();

// Create express instance
const app = express()

// connect to db
async function db() {
  await mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to db')).catch(err => console.log(err))
};

db();

// Require API routes
const posts = require('./routes/posts');
const users = require('./routes/users');
const words = require('./routes/words');
const comments = require('./routes/comments');

// Middlewares
app.use(function(req, res, next) {
  req.url = decodeURI(req.url);
  next();
});


app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Import API Routes
app.use(posts);
app.use(users);
app.use(words);
app.use(comments);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
