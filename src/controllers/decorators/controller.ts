import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (let targetKey in target.prototype) {
			const routeHandler = target.prototype[targetKey];
			const path = Reflect.getMetadata('path', target.prototype, targetKey);
			const method: Methods = Reflect.getMetadata('method', target.prototype, targetKey);

			if (path) router[method](`${routePrefix}${path}`, routeHandler);
		}
	};
}
