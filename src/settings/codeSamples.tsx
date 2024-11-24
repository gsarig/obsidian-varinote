export const codeSamples = {
	syntax: `
\`\`\`varinote

variable:: Label|Default

\`\`\``,
	example: `
\`\`\`varinote

my_first_variable:: Label of the first variable|Default value for first variable
my_second_variable:: Label of the second variable

\`\`\`

## My text with variables:

* This is the value of my first variable: {{$my_first_variable}}
* This is the value of the second: {{$my_second_variable}}.
`,
};
