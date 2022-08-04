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

router.get('/login', (req: Request, res: Response) => {
	res.send(`
		<form method="post">
			<div>
				<label>email</label>
				<input name="email">
			</div>
			<div>
				<label>пароль</label>
				<input name="password" type="password">
			</div>
			<button>отправить</button>
		</form>
	`);
});

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;
	res.redirect('/');
});

router.get('/protected', requiredAuth, (req: Request, res: Response) => {
	res.send(`добро пожаловать на защищенный путь`);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
	const { email, password } = req.body;

	if (email && password && email === 'hi@hi.ru' && password === '1234') {
		req.session = { loggedIn: true };
		res.redirect('/');
	} else {
		res.send('неправильный email или пароль');
	}
});

export { router };
