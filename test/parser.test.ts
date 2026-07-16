import { describe, it, expect } from 'vitest';
import { parseVarinoteProperties } from '../src/utils/parser';

describe('parseVarinoteProperties', () => {
	it('parses a plain name::Label property', () => {
		expect(parseVarinoteProperties('greeting::Greeting')).toEqual({
			greeting: { label: 'Greeting', value: '' },
		});
	});

	it('parses a property with a default value', () => {
		expect(parseVarinoteProperties('greeting::Greeting|Bon appetit!')).toEqual({
			greeting: { label: 'Greeting', value: 'Bon appetit!' },
		});
	});

	it('parses a property with a type', () => {
		expect(
			parseVarinoteProperties('difficulty|dropdown::Difficulty level|Easy,Medium,Hard,Expert'),
		).toEqual({
			difficulty: { label: 'Difficulty level', value: 'Easy,Medium,Hard,Expert', type: 'dropdown' },
		});
	});

	it('tolerates whitespace after the :: separator', () => {
		expect(parseVarinoteProperties('var_1:: Label 1|Value 1')).toEqual({
			var_1: { label: 'Label 1', value: 'Value 1' },
		});
	});

	it('parses multiple properties in one block', () => {
		const content = 'var_1::Label 1|Value 1\nvar_2::Label 2';
		expect(parseVarinoteProperties(content)).toEqual({
			var_1: { label: 'Label 1', value: 'Value 1' },
			var_2: { label: 'Label 2', value: '' },
		});
	});

	it('ignores lines that do not match the property syntax', () => {
		const content = 'not a property line\nvar_1::Label 1\nalso not one';
		expect(parseVarinoteProperties(content)).toEqual({
			var_1: { label: 'Label 1', value: '' },
		});
	});
});
