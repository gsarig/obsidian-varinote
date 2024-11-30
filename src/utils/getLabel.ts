import {Labels} from '../types/labels';
import labelsData from '../labels.json';

const labels: Labels = labelsData;

export function getLabel(labelKey: keyof Labels, replacements?: Record<string, string>): string {
	const template = labels[labelKey];

	if (!template) {
		throw new Error(`Label key "${labelKey}" not found in labels.json`);
	}

	if (!replacements) {
		return template;
	}

	return template.replace(/{(\w+)}/g, (match, key) => {
		return replacements[key] || match;
	});
}
