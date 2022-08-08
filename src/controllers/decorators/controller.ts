import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, Request, RequestHandler, Response } from 'express';

function bodyValidators(keys: string): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.body) {
			res.status(422).send('некорректный запрос');
			return;
		}

		for (const key of keys) {
			if (!req.body[key]) {
				res.status(422).send(`поля ${key} не существует`);
				return;
			}
		}
		next();
	};
}

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (let targetKey in target.prototype) {
			const routeHandler = target.prototype[targetKey];
			const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, targetKey);
			const method: Methods = Reflect.getMetadata(
				MetadataKeys.method,
				target.prototype,
				targetKey,
			);

			const middlewares =
				Reflect.getMetadata(MetadataKeys.middleware, target.prototype, targetKey) || [];

			const requiredBodyProps =
				Reflect.getMetadata(MetadataKeys.validator, target.prototype, targetKey) || [];

			const validator = bodyValidators(requiredBodyProps);

			if (path)
				router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
		}
	};
}
