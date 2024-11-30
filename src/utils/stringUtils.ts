import {evaluateExpression} from './evaluateExpression';

export function replacePlaceholders(content: string, properties: Record<string, string | number>): string {
	// noinspection RegExpRedundantEscape
	const placeholderRegex = /\{\{\$(.+?)\}\}/g;

	return content.replace(placeholderRegex, (_, expr) => evaluateExpression(expr, properties));
}
