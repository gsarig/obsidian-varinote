import { describe, it, expect } from 'vitest';
import { evaluateCalculation } from '../src/utils/evaluateCalculation';

describe('evaluateCalculation', () => {
	it('evaluates addition', () => {
		expect(evaluateCalculation('10 + 10')).toBe('20');
	});

	it('evaluates multiplication', () => {
		expect(evaluateCalculation('3 * 2')).toBe('6');
	});

	it('passes non-numeric input through unchanged', () => {
		expect(evaluateCalculation('Bon appetit!')).toBe('Bon appetit!');
	});

	it('falls back to the original input for a malformed expression', () => {
		expect(evaluateCalculation('10 + ')).toBe('10 + ');
	});

	it('evaluates subtraction and division', () => {
		expect(evaluateCalculation('10 - 4')).toBe('6');
		expect(evaluateCalculation('10 / 4')).toBe('2.5');
	});

	it('applies standard operator precedence', () => {
		expect(evaluateCalculation('2 + 3 * 4')).toBe('14');
		expect(evaluateCalculation('10 - 6 / 2')).toBe('7');
	});

	it('respects parentheses', () => {
		expect(evaluateCalculation('(2 + 3) * 4')).toBe('20');
	});

	it('handles decimals and unary minus', () => {
		expect(evaluateCalculation('1.5 + 0.5')).toBe('2');
		expect(evaluateCalculation('-5 + 10')).toBe('5');
		expect(evaluateCalculation('2 * -3')).toBe('-6');
	});

	it('passes a lone number through as itself', () => {
		expect(evaluateCalculation('42')).toBe('42');
	});

	it('does not execute anything beyond basic arithmetic', () => {
		expect(evaluateCalculation('alert(1)')).toBe('alert(1)');
		expect(evaluateCalculation('1; 2')).toBe('1; 2');
		expect(evaluateCalculation('1 2')).toBe('1 2');
	});
});
