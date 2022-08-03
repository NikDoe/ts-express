import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.send(`<h1>Hello there</h1>`);
});

export { router };
