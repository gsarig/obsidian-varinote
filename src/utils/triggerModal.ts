import {VNModal} from '../components/VNModal';
import {replacePlaceholders} from './stringUtils';
import {TFile, Notice} from 'obsidian';
import {getLabel} from './getLabel';
import {PropertyMap, FieldString} from '../types/records';

export function triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: PropertyMap) {
	if (!file) {
		return;
	}
	const modal = new VNModal(this.app, message, description, async () => {
		try {
			await this.app.vault.process(file, (fileContents: string) => {
				if (!modal?.formValues) {
					return fileContents;
				}
				const updatedContent = processContent(fileContents, regex, modal.formValues);
				if (!updatedContent) {
					return fileContents;
				}
				return fileContents.replace(fileContents, updatedContent);
			});
		} catch (error) {
			new Notice(getLabel('errorModifyFile'));
		}
	}, properties);

	modal.closeButtonLabel = getLabel('ctaBtn');
	modal.open();
}

function processContent(content: string, regex: RegExp, formValues: FieldString): string {
	let updatedContent = content.replace(regex, '').trim();
	return replacePlaceholders(updatedContent, formValues);
}
