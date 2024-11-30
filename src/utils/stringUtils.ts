export function replacePlaceholders(content: string, properties: Record<string, string | number>): string {
	function evaluateExpression(expression: string, vars: Record<string, string | number>): string {

		// Substitute variables with their values in the expression.
		const substitutedExpr = expression.replace(/\b(\w+)\b/g, match => {
			const value = vars[match];
			return typeof value !== 'undefined' ? value.toString() : match;
		});

		// Clean the expression to avoid syntax errors.
		const cleanedExpr = substitutedExpr.replace(/\s+/g, ' ').trim();

		try {
			// Evaluate only if the expression seems like a calculation.
			if (/[\d+\-*/]/.test(cleanedExpr)) {
				return new Function(`return (${cleanedExpr});`)().toString();
			}
		} catch (error) {
			// Do nothing if the evaluation fails.
		}
		// Return the substituted expression if not evaluable.
		return substitutedExpr;
	}

	// noinspection RegExpRedundantEscape
	const placeholderRegex = /\{\{\$(.+?)\}\}/g;

	return content.replace(placeholderRegex, (_, expr) => evaluateExpression(expr, properties));
}
