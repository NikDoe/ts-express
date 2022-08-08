import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...props: string[]) {
	return function (target: any, key: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata(MetadataKeys.validator, props, target, key);
	};
}
