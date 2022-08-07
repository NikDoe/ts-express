import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router as controllerRouter } from './controllers/decorators/controller';
import './controllers/LoginControler';

const app = express();
const port: number = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['qwerty'] }));
app.use(router);
app.use(controllerRouter);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
