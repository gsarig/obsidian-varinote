export function parseVarinoteProperties(content: string): Record<string, { label: string, defaultValue: string }> {
	const propertyRegex = /(\w+)::\s*(.*)/g;
	const properties: Record<string, { label: string, defaultValue: string }> = {};
	let match;

	while ((match = propertyRegex.exec(content)) !== null) {
		const [label, defaultValue] = match[2].split('|').map(part => part.trim());
		properties[match[1]] = {
			label,
			defaultValue: defaultValue || ''
		};
	}

	return properties;
}
