import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Varinote's currently unit-tested logic is pure and does not import the
// `obsidian` module; the alias to a light mock is kept for template parity
// with Sentinel and for any future test that touches obsidian-importing code.
export default defineConfig({
	resolve: {
		alias: {
			obsidian: fileURLToPath(new URL('./test/mocks/obsidian.ts', import.meta.url)),
		},
	},
	test: {
		include: ['test/**/*.test.ts'],
	},
});
