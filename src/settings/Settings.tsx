import { App, PluginSettingTab } from 'obsidian';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Varinote from '../main';
import InfoPanel from './InfoPanel';

export class VarinoteSettings extends PluginSettingTab {
	app: App;
	plugin: Varinote;

	constructor(app: App, plugin: Varinote) {
		super(app, plugin);
		this.app = app;
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const root = createRoot(containerEl);
		root.render(<InfoPanel />);
	}
}
