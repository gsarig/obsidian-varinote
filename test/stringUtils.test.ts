import { describe, it, expect } from 'vitest';
import { replacePlaceholders } from '../src/utils/stringUtils';

describe('replacePlaceholders', () => {
	it('replaces a single placeholder', () => {
		expect(replacePlaceholders('Hello {{$name}}', { name: 'World' })).toBe('Hello World');
	});

	it('replaces multiple placeholders', () => {
		expect(replacePlaceholders('{{$a}} and {{$b}}', { a: '1', b: '2' })).toBe('1 and 2');
	});

	it('renders a placeholder for a missing variable as the bare variable name', () => {
		// evaluateExpression finds no value for "missing" in vars, so the
		// substitution pass leaves it as-is and the calculation pass has
		// nothing to compute, so the placeholder is not preserved as-is.
		expect(replacePlaceholders('{{$missing}}', {})).toBe('missing');
	});
});
