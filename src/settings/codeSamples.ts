export const codeSamples = {
	syntax: `
\`\`\`varinote

variable:: Label|Default

\`\`\``,
	example: `
\`\`\`varinote

var_1:: Label 1|Default value
var_2:: Label 2

\`\`\`

## My text with variables:

* This is the value of my first variable: {{$var_1}}
* This is the value of the second: {{$var_2}}.
`,
};
