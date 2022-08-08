import { get, controller, use } from './decorators';
import { NextFunction, Request, Response } from 'express';

const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	}

	res.status(403);
	res.send('У вас нет допуска');
};

@controller('')
class RootController {
	@get('/')
	getRoot(req: Request, res: Response) {
		if (req.session && req.session.loggedIn) {
			res.send(`
			<div>
				<div>Вы вошли в систему</div>
				<a href="/auth/logout">Выйти</a>
			</div>
		`);
		} else {
			res.send(`
			<div>
				<div>Вы не вошли в систему</div>
				<a href="/auth/login">Войти</a>
			</div>
		`);
		}
	}

	@get('/protected')
	@use(requiredAuth)
	getProtected(req: Request, res: Response) {
		res.send(`добро пожаловать на защищенный путь`);
	}
}
