import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../src/utils/evaluateExpression';

describe('evaluateExpression', () => {
	it('substitutes a variable with its value', () => {
		expect(evaluateExpression('greeting', { greeting: 'Bon appetit!' })).toBe('Bon appetit!');
	});

	it('substitutes a variable and evaluates the resulting calculation', () => {
		expect(evaluateExpression('number_of_people * 2', { number_of_people: 2 })).toBe('4');
	});

	it('short-circuits to the toggle result before substitution/calculation', () => {
		expect(evaluateExpression('boiling_time::12,10', { boiling_time: 'true' })).toBe('12');
	});
});
