import {evaluateToggle} from './evaluateToggle';
import {evaluateCalculation} from './evaluateCalculation';
import {FieldStringOrNumber} from '../types/records';

export function evaluateExpression(expression: string, vars: FieldStringOrNumber): string {
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
