/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

router.get('/signup', (req, res) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res) => {
	db.user
		.findOrCreate({
			where: {
				email: req.body.email,
			},
			defaults: {
				name: req.body.name,
				password: req.body.password,
			},
		})
		.then(([user, created]) => {
			// If created, this means success, redirect to home.
			if (created) {
				passport.authenticate('local', {
					successRedirect: '/',
					successFlash: 'Account created and user logged in!',
				})(req, res);
			} else {
				req.flash('error', 'Email already exists!');
				res.redirect('/auth/signup');
			}
		})
		.catch(err => {
			req.flash('error', err.message);
			res.redirect('/auth/signup');
		});
});

router.get('/login', (req, res) => {
	// res.render('auth/login');
	const locals = {
		title: 'Login',
		description: null,
	};
	res.render('auth/login', { meta: locals });
	//console.log({ meta: locals })
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: 'Invalid username or password',
		successFlash: 'You have logged in!',
	})
);

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You have logged out');
	res.redirect('/');
});

module.exports = router;
