require('dotenv').config();
require(__dirname + '/config/config.js')[process.env.DB_PASS];
const db = require('./models');

/* db.user
	.findOne({
		where: {
			username: 'TestAccount',
			password: 'CrankyAccountsbeCranky',
			firstName: 'Chuck',
			lastName: 'Norris',
			email: 'that2@email.com',
			title: 'hombre',
			quote: 'Noooooooo',
			jobTitle: 'Actor',
			bio: 'I am me',
		},
	})
	.then(([user, created]) => {
		//console.log('This is\n', user);
		db.question
			.create({
				where: {
					createdBy: user.dataValues.id,
					summary: 'What sound does the ghost make?',
					content: 'Boo',
				},
			})
			.then(([question, created]) => {
				console.log(question);

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
 */
async function testDB() {
	const [user, created] = await db.user.create({
		username: 'SecretAgent',
		password: 'sasquatchisrealyesheis',
		email: 'that@email.com',
		firstName: 'James',
		lastName: 'Bond',
	});

	console.log(created);
	console.log(user);
	console.log('-------------------\n');

	const question = await db.question.create({
		summary: 'Where are my keys?',
		content: "I've looked everywhere for them and they're no where to be seen!",
	});

	user.associate(question);
}
