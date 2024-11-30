import {evaluateToggle} from './evaluateToggle';
import {evaluateCalculation} from './evaluateCalculation';

export function evaluateExpression(expression: string, vars: Record<string, string | number>): string {
	const maybeToggle = evaluateToggle(expression, vars);
	if (maybeToggle !== null) {
		return maybeToggle;
	}

	// Substitute variables with their values in the expression.
	const substitutedExpr = expression.replace(/\b(\w+)\b/g, match => {
		const value = vars[match];
		return typeof value !== 'undefined' ? value.toString() : match;
	});

	// Evaluate any calculations in the substituted expression.
	return evaluateCalculation(substitutedExpr);
}
