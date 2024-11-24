import {Plugin, MarkdownView, TFile, Notice} from 'obsidian';
import {VNModal} from './components/VNModal';
import labels from './labels.json';
import {VarinoteSettings} from './settings/Settings';
import './styles.css';

// noinspection JSUnusedGlobalSymbols
export default class Varinote extends Plugin {

	async onload() {

		// Register the settings tab
		this.addSettingTab(new VarinoteSettings(this.app, this));

		// Register a custom command to trigger the modal
		this.addCommand({
			id: 'trigger-modal',
			name: labels.triggerModal,
			callback: () => this.triggerModalCommand(),
		});

		// Check if layout is already ready
		if (this.app.workspace.layoutReady) {
			this.onLayoutReady();
		}

		// Listen for file opening events
		this.app.workspace.on('file-open', this.onFileOpen);
	}

	onunload() {
		// Detach listeners when the plugin is unloaded
		this.app.workspace.off('layout-ready', this.onLayoutReady);
		this.app.workspace.off('file-open', this.onFileOpen);
	}

	onLayoutReady = () => {
		this.checkTemplateInActiveFile();
	}

	onFileOpen = (file: TFile | null) => {
		if (file) {
			this.checkTemplateInActiveFile(file);
		}
	}

	checkTemplateInActiveFile(file?: TFile) {
		const activeMarkdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		const fileToCheck = file || activeMarkdownView?.file;

		if (fileToCheck) {
			const templateFolder = this.getTemplateFolderPath();

			if (templateFolder && fileToCheck.path.startsWith(templateFolder)) {
				// Skipping template file.
				return;
			}

			this.app.vault.read(fileToCheck).then(content => {
				const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
				const varinoteMatch = content.match(varinoteBlockRegex);

				if (varinoteMatch) {
					const properties = this.parseVarinoteProperties(varinoteMatch[1]);
					this.triggerModal(fileToCheck, labels.modalTitle, labels.modalDescription, varinoteBlockRegex, properties);
				}
			});
		}
	}

	parseVarinoteProperties(content: string): Record<string, { label: string, defaultValue: string }> {
		const propertyRegex = /(\w+)::\s*(.*)/g;
		const properties: Record<string, { label: string, defaultValue: string }> = {};
		let match;

		while ((match = propertyRegex.exec(content)) !== null) {
			const [label, defaultValue] = match[2].split('|').map(part => part.trim());
			properties[match[1]] = {
				label,
				defaultValue: defaultValue || ''
			};
		}

		return properties;
	}

	triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: Record<string, {
		label: string,
		defaultValue: string
	}>) {
		const modal = new VNModal(this.app, message, description, async () => {
			try {
				const content = await this.app.vault.read(file);
				let updatedContent = content.replace(regex, '').trim();
				updatedContent = this.replacePlaceholders(updatedContent, modal.formValues);

				await this.app.vault.modify(file, updatedContent);
			} catch (error) {
				new Notice(labels.errorModifyFile);
			}
		}, properties);
		modal.closeButtonLabel = labels.ctaBtn; // Pass the close button label
		modal.open();
	}

	triggerModalCommand() {
		const activeFile = this.app.workspace.getActiveFile();
		if (activeFile) {
			const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
			this.app.vault.read(activeFile).then(content => {
				const varinoteMatch = content.match(varinoteBlockRegex);

				if (varinoteMatch) {
					const properties = this.parseVarinoteProperties(varinoteMatch[1]);
					this.triggerModal(activeFile, labels.modalTitle, labels.modalDescription, varinoteBlockRegex, properties);
				} else {
					new Notice(labels.noBlockFound);
				}
			});
		} else {
			new Notice(labels.noActiveFile);
		}
	}

	getTemplateFolderPath(): string | null {
		const settingPlugin = (this.app as any).internalPlugins.plugins['templates'];
		if (settingPlugin && settingPlugin.enabled) {
			return settingPlugin.instance.options.folder;
		}
		return null;
	}

	replacePlaceholders(content: string, properties: Record<string, string>): string {
		for (const key in properties) {
			const placeholderRegex = new RegExp(`\\{\\{\\$${key}\\}\\}`, 'g');
			content = content.replace(placeholderRegex, properties[key]);
		}
		return content;
	}
}
