export function replacePlaceholders(content: string, properties: Record<string, string>): string {
	for (const key in properties) {
		const placeholderRegex = new RegExp(`\\{\\{\\$${key}\\}\\}`, 'g');
		content = content.replace(placeholderRegex, properties[key]);
	}
	return content;
}
