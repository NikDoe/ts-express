import express from 'express';
import { router } from './routes/loginRoutes';

const app = express();
const port: number = 9000;

app.use(router);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
