import express, { Request, Response } from 'express';

const app = express();
const port: number = 9000;

app.get('/', (req: Request, res: Response) => {
	res.send(`<h1>H1 there</h1>`);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
