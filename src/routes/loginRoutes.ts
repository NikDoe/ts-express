import { Request, Response, Router } from 'express';

const router = Router();

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

router.post('/login', (req: Request, res: Response) => {
	const { email, password } = req.body;

	res.send(email + password);
});

export { router };
