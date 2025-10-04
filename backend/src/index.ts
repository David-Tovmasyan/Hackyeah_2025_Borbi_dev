import express from 'express';

const main = () => {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	const port = Number.parseFloat(process.env.PORT ?? '3000');

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
};

main();
