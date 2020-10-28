require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('./models');

db.user
	.findOrCreate({
		where: {
			username: 'codddd',
			password: 'moooooooooooooooooooo',
			firstName: 'Brian',
			lastName: 'Blankenship',
			email: 'brian.ga.edddul@gmail.com',
			title: 'hombre',
			quote: 'Noooooooo',
			jobTitle: 'SoftwareEngineer',
			bio: 'Iamme',
		},
	})
	.then(([user, created]) => {
		console.log('This is\n', user);
		db.question
			.findOrCreate({
				where: {
					summary: 'HelloBob',
					content: 'Boo',
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
