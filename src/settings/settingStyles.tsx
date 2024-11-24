export const settingStyles: string = `
.varinote-settings-container {
	position: relative;
}
.varinote-settings-container .varinote-codeblock {
	position: relative;
	background-color: #444;
	color: #fff;
	border-radius: 5px;
	padding: 0.5rem 1rem;
}
.varinote-settings-container .copy-button {
	position: absolute;
	right: 0.5em;
	top: 0.5em;
	cursor: pointer;
	background-color: #fff;
	border: none;
	border-radius: 5px;
	padding: .2em 1em;
	opacity: 0;
}
.varinote-settings-container .varinote-codeblock:hover .copy-button {
	opacity: 1;
}
.varinote-settings-container .notice {
	position: absolute;
	display: inline-block;
	top: 0.5em;
	left: 1em;
	background-color: rgba(255,255,255,0.1);
	color: white;
	padding: 0.5em 1em;
	border-radius: 5px;
	z-index: 1000;
	transition: opacity 0.5s;
	opacity: 0;
	width: fit-content;
}
.varinote-settings-container .notice.show {
	opacity: 1;
}
.varinote-settings-container p code {
	background: #444;
	color: #fff;
	padding: 0.1em 0.3em;
	border-radius: 4px;
`;
