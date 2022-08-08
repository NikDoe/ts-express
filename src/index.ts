import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginControler';
import './controllers/RootController';

const app = express();
const port: number = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['qwerty'] }));
app.use(AppRouter.getInstance());

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
