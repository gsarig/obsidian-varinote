import {Plugin, TFile, Notice, TAbstractFile} from 'obsidian';
import {triggerModalCommand} from './commands/triggerModal';
import {processActiveFile} from './utils/processActiveFile';
import {getLabel} from './utils/getLabel';
import '../styles.css';

// noinspection JSUnusedGlobalSymbols
export default class Varinote extends Plugin {

	async onload() {

		// Register a custom command to trigger the modal.
		this.addCommand({
			id: 'trigger-modal',
			name: getLabel('triggerModal'),
			callback: (): void => {
				void triggerModalCommand(this.app);
			},
		});

		// Register vault file creation listener once layout is ready.
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(this.app.vault.on('create', (file: TAbstractFile) => {
				void this.handleFileCreate(file);
			}));
		});
	}

	private async handleFileCreate(file: TAbstractFile): Promise<void> {
		if (!(file instanceof TFile)) {
			new Notice(getLabel('errorProcessingFile'));
			return;
		}
		try {
			await processActiveFile(this.app, file);
		} catch {
			new Notice(getLabel('errorProcessingFile'));
		}
	}
}
