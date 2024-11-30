export function evaluateCalculation(expression: string): string {
	// Clean the expression to avoid syntax errors.
	const cleanedExpr = expression.replace(/\s+/g, ' ').trim();

	try {
		// Evaluate only if the expression seems like a calculation.
		if (/[\d+\-*/]/.test(cleanedExpr)) {
			return new Function(`return (${cleanedExpr});`)().toString();
		}
	} catch (error) {
		// Do nothing if the evaluation fails.
	}
	return expression;
}
