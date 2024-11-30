export function parseVarinoteProperties(content: string): Record<string, {
	label: string,
	value: string,
	type?: string
}> {
	const propertyRegex = /(\w+)(?:\|(\w+))?::\s*(.+?)(?:\|(.+))?$/gm;
	const properties: Record<string, { label: string, value: string, type?: string }> = {};
	let match;

	while ((match = propertyRegex.exec(content)) !== null) {
		const propertyName = match[1];
		const type = match[2];
		const label = match[3].trim();
		const value = match[4]?.trim() || '';

		properties[propertyName] = {
			label,
			value,
			...(type && {type}), // Only add type if it's provided
		};
	}
	return properties;
}
