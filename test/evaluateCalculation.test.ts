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
});
