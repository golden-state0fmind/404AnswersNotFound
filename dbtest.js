require('dotenv').config();
require(__dirname + '/config/config.json')[process.env.DB_PASS];
const db = require('./models');

db.user
	.create({
		username: 'coddd',
		password: 'moo',
		firstName: 'Brian',
		lastName: 'Blankenship',
		email: 'brian.ga.eddul@gmail.com',
		title: 'hombre',
		quote: 'Noooooooo!',
		jobTitle: 'Software Engineer',
		bio: 'I am me',
	})
	.then(([user, created]) => {
		console.log('This is\n', user);
		db.question
			.findOrCreate({
				where: {
					summary: 'Hello Bob',
				},
			})
			.then(([question, created]) => {
				user.addQuestion(question)
					.then(relationInfo => {
						console.log(relationInfo);
					})
					.catch(error => {
						console.log(error);
					});
			});
	})
	.catch(error => {
		console.log(error);
	});

db.categories
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
	});
