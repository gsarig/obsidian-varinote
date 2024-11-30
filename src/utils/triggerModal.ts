import {VNModal} from '../components/VNModal';
import {replacePlaceholders} from './stringUtils';
import {TFile, Notice} from 'obsidian';
import {getLabel} from './getLabel';

export function triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: Record<string, {
	label: string,
	value: string
}>) {
	const modal = new VNModal(this.app, message, description, async () => {
		try {
			const content = await this.app.vault.read(file);
			let updatedContent = content.replace(regex, '').trim();
			updatedContent = replacePlaceholders(updatedContent, modal.formValues);

			await this.app.vault.modify(file, updatedContent);
		} catch (error) {
			new Notice(getLabel('errorModifyFile'));
		}
	}, properties);
	modal.closeButtonLabel = getLabel('ctaBtn'); // Pass the close button label
	modal.open();
}
