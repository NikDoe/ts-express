import { Request, Response } from 'express';
import { get, post, controller, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {
	@get('/login')
	getLogin(req: Request, res: Response) {
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
	}

	@post('/login')
	@bodyValidator('email', 'password')
	postLogin(req: Request, res: Response) {
		const { email, password } = req.body;

		if (email && password && email === 'hi@hi.ru' && password === '1234') {
			req.session = { loggedIn: true };
			res.redirect('/');
		} else {
			res.send('неправильный email или пароль');
		}
	}
}
