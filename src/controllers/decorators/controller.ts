import 'reflect-metadata';
import { Router } from 'express';

export const router = Router();

export function controller(routePrefix: string) {
	return function (target: Function) {
		for (let targetKey in target.prototype) {
			const routeHandler = target.prototype[targetKey];
			const path = Reflect.getMetadata('path', target.prototype, targetKey);

			if (path) router.get(`${routePrefix}${path}`, routeHandler);
		}
	};
}
