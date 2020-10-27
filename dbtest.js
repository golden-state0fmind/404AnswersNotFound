require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('./models');

/* db.user
	.findOrCreate({
		where: {
			username: 'c0dezer019',
			password: 'fooBar',
			firstName: 'Brian',
			lastName: 'Blankenship',
			email: 'brian.ga.edu@gmail.com',
			title: 'hombre',
			quote: 'Noooooooo!',
			jobTitle: 'Software Engineer',
			bio: 'I am me',
		},
	})
	.then(([user, created]) => {
		db.question
			.findOrCreate({
				where: {
					summary: 'Hello World',
				},
			})
			.then(([question, created]) => {
				user.addQuestion(question).then(relationInfo => {
					console.log(relationInfo);
				});
			});
	}); */

/* db.categories
	.findOrCreate({
		where: {
			category: 'Location',
		},
	})
	.then(([categories, created]) => {
		db.question
			.findOne({
				where: {
					id: 1,
				},
			})
			.then(question => {
				categories.addQuestion(question);
			});
	}); */
