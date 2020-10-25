require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('/models');

db.user
	.findOrCreate({
		userName: 'c0dezer019',
		password: '123',
		firstName: 'Brian',
		lastName: 'Blankenship',
	})
	.then(createdUser => {
		createdUser.createQuestion({
			summary: 'Where am I?',
			content: 'Who are you?',
			category: 'Random',
		});
	});
