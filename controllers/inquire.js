const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

router.get('/create/inquisition', (req, res) => {
	const locals = {
		title: 'Ask a Question',
		description: null,
		// eslint-disable-next-line prettier/prettier
		style: "/css/inquisition.css",
	};

	res.render('inquire/inquisition', { meta: locals });
});

module.exports = router;
