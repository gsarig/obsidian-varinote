import {VNModal} from '../components/VNModal';
import {replacePlaceholders} from './stringUtils';
import {TFile, Notice} from 'obsidian';
import labels from '../labels.json';

export function triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: Record<string, {
	label: string,
	defaultValue: string
}>) {
	const modal = new VNModal(this.app, message, description, async () => {
		try {
			const content = await this.app.vault.read(file);
			let updatedContent = content.replace(regex, '').trim();
			updatedContent = replacePlaceholders(updatedContent, modal.formValues);

			await this.app.vault.modify(file, updatedContent);
		} catch (error) {
			new Notice(labels.errorModifyFile);
		}
	}, properties);
	modal.closeButtonLabel = labels.ctaBtn; // Pass the close button label
	modal.open();
}
