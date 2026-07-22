import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
	...obsidianmd.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", { args: "none", caughtErrorsIgnorePattern: "^_" }],
			// Type-aware rules matching Obsidian's plugin scanner.
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/no-implied-eval": "error",
		},
	},
]);
