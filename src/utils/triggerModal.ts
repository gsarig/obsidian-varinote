import {VNModal} from '../components/VNModal';
import {replacePlaceholders} from './stringUtils';
import {App, TFile, Notice} from 'obsidian';
import {getLabel} from './getLabel';
import {PropertyMap, FieldString} from '../types/records';

export function triggerModal(app: App, file: TFile, message: string, description: string, regex: RegExp, properties: PropertyMap) {
	if (!file) {
		return;
	}
	const modal = new VNModal(app, message, description, async () => {
		try {
			await app.vault.process(file, (fileContents: string) => {
				if (!modal?.formValues) {
					return fileContents;
				}
				return processContent(fileContents, regex, modal.formValues);
			});
		} catch {
			new Notice(getLabel('errorModifyFile'));
		}
	}, properties);

	modal.closeButtonLabel = getLabel('ctaBtn');
	modal.open();
}

function processContent(content: string, regex: RegExp, formValues: FieldString): string {
	const updatedContent = content.replace(regex, '').trim();
	return replacePlaceholders(updatedContent, formValues);
}
