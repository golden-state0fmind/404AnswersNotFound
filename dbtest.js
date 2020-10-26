require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('./models');

async function runTest() {
	const user = await db.user.findOrCreate({
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
	});

	await db.question.create(
		{
			summary: 'Where is my purse?',
			content:
				'I last put them on the counter and now they are gone. Can I write a function that will find my keys?',
			lastModifiedBy: 1,
		},
		{
			include: [
				{
					association: user,
				},
			],
		}
	);
}

runTest();
