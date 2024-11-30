export function evaluateToggle(expression: string, vars: Record<string, string | number>): string | null {
	const toggleMatch = expression.match(/^(.+?)::([^,]+),([^,]+)$/);
	if (toggleMatch) {
		const [, varName, option1, option2] = toggleMatch;

		// Check if both options are provided.
		if (option1 == null || option2 == null) {
			// Return the original expression if options are missing.
			return null;
		}

		const value = vars[varName];

		// Convert string "true"/"false" to boolean.
		const isTrue = String(value).toLowerCase() === 'true';

		// Determine which option to choose based on the boolean value.
		return isTrue ? option1.trim() : option2.trim();
	}
	return null;
}
