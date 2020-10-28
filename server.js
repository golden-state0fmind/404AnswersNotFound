require('dotenv').config();
require(__dirname + '/config/config.js');
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
	})
);

app.use(flash());

// Must come below session config.
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
	};
	res.render('home', { meta: locals });
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

var server = app.listen(process.env.PORT || 8000, () =>
	console.log(
		`🎧You're listening to the smooth sounds of port ${
			process.env.PORT || 8000
		}🎧`
	)
);

module.exports = server;
