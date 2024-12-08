import {Plugin, TFile, Notice, TAbstractFile} from 'obsidian';
import {VarinoteSettings} from './settings/Settings';
import {triggerModalCommand} from './commands/triggerModal';
import {processActiveFile} from './utils/processActiveFile';
import {getLabel} from './utils/getLabel';
import '../styles.css';

// noinspection JSUnusedGlobalSymbols
export default class Varinote extends Plugin {
	private pluginLoadTime: number;

	async onload() {

		// Register the settings tab
		this.addSettingTab(new VarinoteSettings(this.app, this));

		// Register a custom command to trigger the modal.
		this.addCommand({
			id: 'trigger-modal',
			name: getLabel('triggerModal'),
			callback: () => triggerModalCommand(),
		});

		// Capture the current session time.
		this.pluginLoadTime = Date.now();

		this.registerEvent(this.app.vault.on('create', (file: TAbstractFile) => {
			this.handleFileCreate(file);
		}));
	}

	private async handleFileCreate(file: TAbstractFile) {
		if (file instanceof TFile) {
			const fileStats = await this.app.vault.adapter.stat(file.path);
			// Only process files created after the plugin load time.
			if (fileStats && fileStats.ctime > this.pluginLoadTime) {
				await this.runProcessActiveFile(file);
			}
		}
	}

	private async runProcessActiveFile(file: TFile): Promise<void> {
		try {
			await processActiveFile(file);
		} catch (error) {
			new Notice(getLabel('errorProcessingFile'));
		}
	}
}
