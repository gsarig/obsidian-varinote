import { Plugin, MarkdownView, TFile, Notice } from 'obsidian';
import { VNModal } from './components/VNModal';
import labels from './labels.json';
import './styles.css';

interface VarinoteSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: VarinoteSettings = {
	mySetting: 'default'
}

export default class Varinote extends Plugin {
	settings: VarinoteSettings;

	async onload() {
		await this.loadSettings();

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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
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
				console.log("Skipping template file:", fileToCheck.path);
				return;
			}

			this.app.vault.read(fileToCheck).then(content => {
				const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
				const varinoteMatch = content.match(varinoteBlockRegex);

				if (varinoteMatch) {
					const properties = this.parseVarinoteProperties(varinoteMatch[1]);
					const description = labels.modalDescription; // Using the description from JSON
					const message = labels.modalTitle.replace("{{fileName}}", fileToCheck.name); // Dynamic title based on file name
					this.triggerModal(fileToCheck, message, description, varinoteBlockRegex, properties);
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

	triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: Record<string, { label: string, defaultValue: string }>) {
		const modal = new VNModal(this.app, message, description, () => {
			this.app.vault.read(file).then(content => {
				let updatedContent = content.replace(regex, '').trim();
				updatedContent = this.replacePlaceholders(updatedContent, modal.formValues);
				this.app.vault.modify(file, updatedContent);
			});
		}, properties);
		modal.closeButtonLabel = labels.closeButtonText; // Pass the close button label
		modal.open();
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
