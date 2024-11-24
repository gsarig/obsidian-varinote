import React from 'react';
import {settingStyles} from './settingStyles';
import {codeSamples} from "./codeSamples";
import CodeBlock from './CodeBlock';

let stylesInjected = false;

// Inject style tag into the <head>
const injectStyles = () => {
	if (!stylesInjected) {
		const styleEl = document.createElement('style');
		styleEl.innerHTML = settingStyles;
		document.head.appendChild(styleEl);
		stylesInjected = true;
	}
};

class VarinoteSettingsComponent extends React.Component {
	componentDidMount() {
		injectStyles();
	}

	render() {
		return (
			<div className="varinote-settings-container">
				<h1>Varinote (Variables in Notes)</h1>
				<p>Varinote allows you to define variables with optional default values inside your Templates. These
					variables can then be edited through a modal interface when you add a new note that uses this
					template.</p>
				<h2>Syntax</h2>
				<p>To define your variables, use the following syntax in a Template:</p>
				<CodeBlock code={codeSamples.syntax}/>
				<p>Then, call the variables in your template's content using the <code>{`{{$variable}}`}</code> tag.</p>
				<h2>Template example</h2>
				<p>This is a full example of a template:</p>
				<CodeBlock code={codeSamples.example}/>
				<h3>Available commands</h3>
				<p>The plugin supports commands for the following actions:</p>
				<ul>
					<li><strong>Set the values of the variables in the file</strong>. Useful if you insert a template
						into an existing note, and you want to set the values of the variables.
					</li>
				</ul>
				<p>To use, just open the <a href="https://help.obsidian.md/Plugins/Command+palette">Command
					Palette</a> and search for <code>Varinote</code>.</p>
				<h3>Documentation</h3>
				<ul>
					<li>
						<a href="https://github.com/gsarig/obsidian-varinote"> Full documentation on GitHub</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default VarinoteSettingsComponent;
