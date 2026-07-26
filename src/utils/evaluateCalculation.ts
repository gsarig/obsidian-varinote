type Token = number | string;

// Tokenize a candidate arithmetic expression into numbers, operators, and
// parentheses. Returns null on any character that doesn't belong to basic
// arithmetic, which signals "not a calculation".
function tokenize(expression: string): Token[] | null {
	const tokens: Token[] = [];
	let index = 0;

	while (index < expression.length) {
		const char = expression[index];

		if (char === ' ') {
			index++;
			continue;
		}

		if ('+-*/()'.includes(char)) {
			tokens.push(char);
			index++;
			continue;
		}

		const numberMatch = /^(?:\d+\.?\d*|\.\d+)/.exec(expression.slice(index));
		if (numberMatch) {
			tokens.push(parseFloat(numberMatch[0]));
			index += numberMatch[0].length;
			continue;
		}

		return null;
	}

	return tokens;
}

// Recursive-descent parser for basic arithmetic: + - * / with standard
// precedence, parentheses, unary plus/minus, and decimals. Returns null if
// the tokens don't form a valid expression.
function parseTokens(tokens: Token[]): number | null {
	let position = 0;

	function parseAdditive(): number | null {
		let left = parseMultiplicative();
		if (left === null) {
			return null;
		}
		while (tokens[position] === '+' || tokens[position] === '-') {
			const operator = tokens[position++];
			const right = parseMultiplicative();
			if (right === null) {
				return null;
			}
			left = operator === '+' ? left + right : left - right;
		}
		return left;
	}

	function parseMultiplicative(): number | null {
		let left = parseUnary();
		if (left === null) {
			return null;
		}
		while (tokens[position] === '*' || tokens[position] === '/') {
			const operator = tokens[position++];
			const right = parseUnary();
			if (right === null) {
				return null;
			}
			left = operator === '*' ? left * right : left / right;
		}
		return left;
	}

	function parseUnary(): number | null {
		if (tokens[position] === '-') {
			position++;
			const value = parseUnary();
			return value === null ? null : -value;
		}
		if (tokens[position] === '+') {
			position++;
			return parseUnary();
		}
		return parsePrimary();
	}

	function parsePrimary(): number | null {
		const token = tokens[position];
		if (typeof token === 'number') {
			position++;
			return token;
		}
		if (token === '(') {
			position++;
			const value = parseAdditive();
			if (value === null || tokens[position] !== ')') {
				return null;
			}
			position++;
			return value;
		}
		return null;
	}

	const result = parseAdditive();
	// Reject trailing tokens (e.g. "1 2" or "3 )").
	return position === tokens.length ? result : null;
}

// Evaluate basic arithmetic without executing dynamically generated code
// (no eval / new Function). Anything that isn't a valid arithmetic
// expression is returned unchanged.
export function evaluateCalculation(expression: string): string {
	// Clean the expression to avoid syntax errors.
	const cleanedExpr = expression.replace(/\s+/g, ' ').trim();

	const tokens = tokenize(cleanedExpr);
	if (tokens === null || tokens.length === 0) {
		return expression;
	}

	const result = parseTokens(tokens);
	return result === null ? expression : result.toString();
}
