import { App, Modal, Setting } from 'obsidian';

export class VNModal extends Modal {
	message: string;
	description: string;
	onCloseCallback: () => void;
	properties: Record<string, { label: string, defaultValue: string }>;
	formValues: Record<string, string>;
	closeButtonLabel: string;

	constructor(app: App, message: string, description: string, onCloseCallback: () => void, properties: Record<string, { label: string, defaultValue: string }>) {
		super(app);
		this.message = message;
		this.description = description;
		this.onCloseCallback = onCloseCallback;
		this.properties = properties;
		this.formValues = {};

		// Initialize form values with default values
		Object.keys(properties).forEach(key => {
			this.formValues[key] = properties[key].defaultValue || '';
		});

		this.closeButtonLabel = "Close";  // Default value if not provided
	}

	onOpen() {
		const { contentEl } = this;

		// Add a unique class for styling
		contentEl.classList.add('varinote-modal-content');

		contentEl.empty();

		contentEl.createEl('h2', { text: this.message });

		if (this.description) {
			contentEl.createEl('p', { text: this.description });
		}

		Object.keys(this.properties).forEach(key => {
			new Setting(contentEl)
				.setName(this.properties[key].label)
				.addText(text => {
					text.setValue(this.properties[key].defaultValue);  // Pre-fill with default value
					text.onChange(value => {
						this.formValues[key] = value;
					});
				});
		});

		new Setting(contentEl)
			.addButton(btn => btn
				.setButtonText(this.closeButtonLabel)
				.setCta()
				.onClick(() => {
					this.close();
				}));
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		this.onCloseCallback();
	}
}
