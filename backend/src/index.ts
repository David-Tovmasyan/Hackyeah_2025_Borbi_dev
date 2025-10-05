import express from 'express';
import { userControllerFactory } from './controllers/users.controller';
import { goalsControllerFactory } from './controllers/goals.controller';

const main = () => {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	const port = Number.parseFloat(process.env.PORT ?? '3000');
	userControllerFactory(app)
	goalsControllerFactory(app)
	
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
};

main();
