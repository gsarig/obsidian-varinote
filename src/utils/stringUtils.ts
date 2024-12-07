import {evaluateExpression} from './evaluateExpression';
import {FieldStringOrNumber} from '../types/records';

export function replacePlaceholders(content: string, properties: FieldStringOrNumber): string {
	// noinspection RegExpRedundantEscape
	const placeholderRegex = /\{\{\$(.+?)\}\}/g;

	return content.replace(placeholderRegex, (_, expr) => evaluateExpression(expr, properties));
}
