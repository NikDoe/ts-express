import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}

const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	}

	res.status(403);
	res.send('У вас нет допуска');
};

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
			<div>
				<div>Вы вошли в систему</div>
				<a href="/logout">Выйти</a>
			</div>
		`);
	} else {
		res.send(`
			<div>
				<div>Вы не вошли в систему</div>
				<a href="/login">Войти</a>
			</div>
		`);
	}
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;
	res.redirect('/');
});

router.get('/protected', requiredAuth, (req: Request, res: Response) => {
	res.send(`добро пожаловать на защищенный путь`);
});

export { router };
