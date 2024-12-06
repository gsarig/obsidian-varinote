import { App, Modal, Setting } from 'obsidian';
import {createSettingsFromProperties} from '../utils/createSettingsFromProperties'
import {PropertyMap} from "../types/properties";

export class VNModal extends Modal {
	message: string;
	description: string;
	onCloseCallback: () => void;
	properties: PropertyMap;
	formValues: Record<string, string>;
	closeButtonLabel: string;

	constructor(app: App, message: string, description: string, onCloseCallback: () => void, properties: PropertyMap) {
		super(app);
		this.message = message;
		this.description = description;
		this.onCloseCallback = onCloseCallback;
		this.properties = properties;
		this.formValues = {};

		// Initialize form values with default values
		Object.keys(properties).forEach(key => {
			this.formValues[key] = properties[key].value || '';
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

		createSettingsFromProperties(contentEl, this.properties, this.formValues);

		new Setting(contentEl)
			.addButton(btn => btn
				.setButtonText(this.closeButtonLabel)
				.setCta()
				.onClick(() => {
					this.close();
				}));

		// Add event listener for Enter key to trigger the button
		contentEl.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();  // Prevent default form submission behavior
				this.close();
			}
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		this.onCloseCallback();
	}
}
