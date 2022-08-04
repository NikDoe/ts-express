import { Request, Response, Router } from 'express';

const router = Router();

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
			<div>
				<div>You are logged in</div>
				<a href="/logout">logout</a>
			</div>
		`);
	} else {
		res.send(`
			<div>
				<div>You are not logged in</div>
				<a href="/login">login</a>
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
				<label>password</label>
				<input name="password" type="password">
			</div>
			<button>submit</button>
		</form>
	`);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
	const { email, password } = req.body;

	if (email && password && email === 'hi@hi.ru' && password === '1234') {
		req.session = { loggedIn: true };
		res.redirect('/');
	} else {
		res.send('invalid email or pass');
	}
});

export { router };
