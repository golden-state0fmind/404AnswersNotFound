/* eslint-disable prettier/prettier */
require('dotenv').config();
require(__dirname + '/config/config.json');
const db = require('./models');
const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const flash = require('connect-flash');
const layouts = require('express-ejs-layouts');
const passport = require('./config/ppConfig.js');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(require('morgan')('dev'));
app.use(
     express.urlencoded({
          extended: false,
     })
);
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// Session config
app.use(
     session({
          secret: process.env.SECRET,
          resave: false,
          saveUninitialized: true,
          cookie: {
               sameSite: 'strict',
          },
     })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
     res.locals.alerts = req.flash();
     res.locals.currentUser = req.user;
     next();
});

// Routes

app.get('/', (req, res) => {
     const locals = {
          title: '404AnswersNotFound',
          description: 'Where answers are not found, but found.',
          style: '/css/home.css',
          isLoggedIn: true,
     };
     if (req.user) {
          locals.isLoggedIn = true;
     } else {
          locals.isLoggedIn = false;
     }

     db.question.findAll({ limit: 3 }).then(question => {
          db.answer
               .findAll({ limit: 3 })
               .then(answer => {
                    db.categories
                         .findAll()
                         .then(category => {
                              res.render('home', {
                                   meta: locals,
                                   questions: question,
                                   answers: answer,
                                   cat: category,
                              });
                         })
                         .catch(err => {
                              console.log(err);
                         });
               })
               .catch(err => {
                    console.log(err);
               });
     });
});

app.get('/profile', isLoggedIn, (req, res) => {
     const locals = {
          title: 'Test',
          description: 'This is a test',
     };
     res.render('profile', { meta: locals });
});

app.use('/auth', require('./controllers/auth'));
app.use('/inquire', require('./controllers/inquire'));
app.use('/users', require('./controllers/profiles'));

var server = app.listen(process.env.PORT || 8000, () =>
     console.log(
          `🎧You're listening to the smooth sounds of port ${process.env.PORT || 8000
          }🎧`
     )
);

module.exports = server;
