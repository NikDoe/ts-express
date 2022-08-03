import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';

const app = express();
const port: number = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
