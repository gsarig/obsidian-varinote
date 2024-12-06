import {VNModal} from '../components/VNModal';
import {replacePlaceholders} from './stringUtils';
import {TFile, Notice} from 'obsidian';
import {getLabel} from './getLabel';
import {PropertyMap} from "../types/properties";

export function triggerModal(file: TFile, message: string, description: string, regex: RegExp, properties: PropertyMap) {
	const modal = new VNModal(this.app, message, description, async () => {
		try {
			const content = await readContent(file);
			const updatedContent = processContent(content, regex, modal.formValues);

			await updateFileContent(file, updatedContent);
		} catch (error) {
			console.error("Error during file modification:", error);
			new Notice(getLabel('errorModifyFile'));
		}
	}, properties);

	modal.closeButtonLabel = getLabel('ctaBtn');
	modal.open();
}

async function readContent(file: TFile): Promise<string> {
	return await this.app.vault.read(file);
}

function processContent(content: string, regex: RegExp, formValues: Record<string, string>): string {
	let updatedContent = content.replace(regex, '').trim();
	return replacePlaceholders(updatedContent, formValues);
}

async function updateFileContent(file: TFile, updatedContent: string) {
	await this.app.vault.process(file, () => updatedContent);
}
