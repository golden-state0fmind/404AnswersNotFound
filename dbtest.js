require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('./models');

db.user
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
			.create({
				summary: 'Where are my car keys?',
				content:
					'I last put them on the kitchen counter and now they are gone. Can I write a function that will find my keys?',
				createdBy: 1,
				lastModifiedBy: 1,
			})
			.then(([question, created]) => {
				user.addQuestion(question).then(relationInfo => {
					console.log(relationInfo);
					console.log(
						`${user.username} asked ${question.summary}`
					);
				});
			});
	});
