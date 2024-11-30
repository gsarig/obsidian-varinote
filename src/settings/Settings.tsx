import {App, PluginSettingTab, Setting} from 'obsidian';
import React from 'react';
import {createRoot} from 'react-dom/client';
import Varinote from '../main';
import {codeSamples} from './codeSamples';
import CodeBlock from './CodeBlock';
import {getLabel} from '../utils/getLabel';
import {injectStyles, handleHide} from './styleUtils';

export class VarinoteSettings extends PluginSettingTab {
	app: App;
	plugin: Varinote;
	styleElement: HTMLStyleElement | null = null;

	constructor(app: App, plugin: Varinote) {
		super(app, plugin);
		this.plugin = plugin;
	}

	hide(): void {
		super.hide();
		handleHide(this);
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		this.styleElement = injectStyles(this.styleElement);

		// Add a container class to make the styles work.
		containerEl.classList.add('varinote-settings-container');

		new Setting(containerEl).setName('Varinote (Variables in Notes)').setHeading();
		containerEl.createEl('p', {
			text: 'Varinote allows you to define variables with optional default values inside your Templates. These variables can then be edited through a modal interface when you add a new note that uses this template.',
		}).createEl('hr');

		// Syntax.
		new Setting(containerEl).setName('Syntax').setHeading();
		containerEl.createEl('p', {
			text: `To define your variables, use the following syntax in a Template:`,
		});
		const syntaxCodeSamples = containerEl.createDiv();
		const codeSamplesRoot = createRoot(syntaxCodeSamples);
		codeSamplesRoot.render(<CodeBlock code={codeSamples.syntax}/>);
		const variableTag = containerEl.createEl('p');
		variableTag.createEl('span', {
			text: 'Then, call the variables in your template\'s content using the ',
		});
		variableTag.createEl('code', {
			text: '{{$variable}}',
		});
		variableTag.createEl('span', {
			text: ' tag.',
		});
		containerEl.createEl('hr');

		// Template Example.
		new Setting(containerEl).setName('Template example').setHeading();
		containerEl.createEl('p', {
			text: `This is a full example of a template:`,
		});
		const exampleCode = containerEl.createDiv();
		const exampleCodeRoot = createRoot(exampleCode);
		exampleCodeRoot.render(<CodeBlock code={codeSamples.example}/>);
		containerEl.createEl('hr');

		// Available commands.
		new Setting(containerEl).setName('Available commands').setHeading();
		containerEl.createEl('p', {
			text: `The plugin supports commands for the following actions:`,
		});
		const commands = containerEl.createEl('ul').createEl('li');
		commands.createEl('strong', {
			text: getLabel('triggerModal'),
		});
		commands.createEl('span', {
			text: ': Useful if you insert a template into an existing note, and you want to set the values of the variables.',
		});
		const commandPalleteLink = containerEl.createEl('p');
		commandPalleteLink.createEl('span', {
			text: 'To use, just open the ',
		});
		commandPalleteLink.createEl('a', {
			href: 'https://help.obsidian.md/Plugins/Command+palette',
			text: 'Command Palette',
		});
		commandPalleteLink.createEl('span', {
			text: '  and search for "Varinote.',
		});
		containerEl.createEl('hr');

		// Resources.
		new Setting(containerEl).setName('Resources').setHeading();
		const resourceList = containerEl.createEl('ul').createEl('li');
		resourceList.createEl('a', {
			href: 'https://github.com/gsarig/obsidian-varinote',
			text: 'Full documentation on GitHub',
		});
	}
}
