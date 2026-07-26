import { describe, it, expect } from 'vitest';
import { evaluateToggle } from '../src/utils/evaluateToggle';

describe('evaluateToggle', () => {
	it('returns the first option when the variable is true', () => {
		expect(evaluateToggle('boiling_time::12,10', { boiling_time: 'true' })).toBe('12');
	});

	it('returns the second option when the variable is false', () => {
		expect(evaluateToggle('boiling_time::12,10', { boiling_time: 'false' })).toBe('10');
	});

	it('handles string-case variants like "True"', () => {
		expect(evaluateToggle('flag::Yes,No', { flag: 'True' })).toBe('Yes');
	});

	it('returns null for a non-toggle expression', () => {
		expect(evaluateToggle('variable + 10', { variable: 1 })).toBeNull();
	});

	it('returns null when the second option is missing', () => {
		expect(evaluateToggle('flag::onlyOption', { flag: 'true' })).toBeNull();
	});
});
