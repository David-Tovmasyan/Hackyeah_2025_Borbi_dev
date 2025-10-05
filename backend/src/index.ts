import express from 'express';
import { userControllerFactory } from './controllers/users.controller';

const main = () => {
	const app = express();
	
	// CORS dla komunikacji z frontendem
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		
		if (req.method === 'OPTIONS') {
			res.sendStatus(200);
		} else {
			next();
		}
	});
	
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	const port = Number.parseFloat(process.env.PORT ?? '3000');
	userControllerFactory(app)
	
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
};

main();
