import { Request, Response } from 'express';
import { get, controller } from './decorators';

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
}
