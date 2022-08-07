import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (let targetKey in target.prototype) {
			const routeHandler = target.prototype[targetKey];
			const path = Reflect.getMetadata('path', target.prototype, targetKey);

			if (path) router.get(`${routePrefix}${path}`, routeHandler);
		}
	};
}
