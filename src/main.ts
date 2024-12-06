import {Plugin, TFile} from 'obsidian';
import {VarinoteSettings} from './settings/Settings';
import {triggerModalCommand} from './commands/triggerModal';
import {processActiveFile} from './utils/processActiveFile';
import {getLabel} from './utils/getLabel';
import '../styles.css';

// noinspection JSUnusedGlobalSymbols
export default class Varinote extends Plugin {

	async onload() {

		// Register the settings tab
		this.addSettingTab(new VarinoteSettings(this.app, this));

		// Register a custom command to trigger the modal
		this.addCommand({
			id: 'trigger-modal',
			name: getLabel('triggerModal'),
			callback: () => triggerModalCommand(),
		});

		// Check if layout is already ready
		if (this.app.workspace.layoutReady) {
			await this.onLayoutReady();
		}

		// Listen for file opening events
		this.registerEvent(this.app.workspace.on('file-open', this.onFileOpen));
	}

	onLayoutReady = async () => {
		try {
			await processActiveFile();
		} catch (error) {
			console.error("Error processing active file on layout ready:", error);
		}
	}

	onFileOpen = async (file: TFile | null) => {
		if (file) {
			try {
				await processActiveFile(file);
			} catch (error) {
				console.error("Error processing active file:", error);
			}
		}
	}
}
