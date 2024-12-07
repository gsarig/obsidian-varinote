import {App, PluginSettingTab, Setting} from 'obsidian';
import Varinote from '../main';

export class VarinoteSettings extends PluginSettingTab {
	app: App;
	plugin: Varinote;

	constructor(app: App, plugin: Varinote) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('p', {
			text: 'Varinote (Variables in Notes) allows you to define variables with optional default values inside your Templates. These variables can then be edited through a modal interface when you add a new note that uses this template.',
		}).createEl('hr');

		// Resources.
		new Setting(containerEl).setName('Resources').setHeading();
		containerEl.createEl('p', {
			text: 'For detailed examples and full documentation, please refer to the following resources:',
		})
		const resourceList = containerEl.createEl('ul').createEl('li');
		resourceList.createEl('a', {
			href: 'https://github.com/gsarig/obsidian-varinote',
			text: 'The project on GitHub',
		});
	}
}
