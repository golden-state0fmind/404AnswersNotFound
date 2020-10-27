const db = require('../models');
const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

router.get('/inquire/create/inquisition', (req, res) => {
	const locals = {
		title: 'Ask a Question',
		description: null,
		// eslint-disable-next-line prettier/prettier
		style: "/css/inquisition.css",
	};

	res.render('inquire/ask', { meta: locals });
});

module.exports = router;
