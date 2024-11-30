import {MarkdownView, TFile} from 'obsidian';
import {parseVarinoteProperties} from './parser';
import {getTemplateFolderPath} from './templateUtils';
import {triggerModal} from './triggerModal';
import {getLabel} from './getLabel';

export function processActiveFile(file?: TFile) {
	const activeMarkdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
	const fileToCheck = file || activeMarkdownView?.file;

	if (fileToCheck) {
		const templateFolder = getTemplateFolderPath();

		if (templateFolder && fileToCheck.path.startsWith(templateFolder)) {
			// Skipping template file.
			return;
		}

		this.app.vault.read(fileToCheck).then((content: string) => {
			const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
			const varinoteMatch = content.match(varinoteBlockRegex);

			if (varinoteMatch) {
				const properties = parseVarinoteProperties(varinoteMatch[1]);
				triggerModal(fileToCheck, getLabel('modalTitle'), getLabel('modalDescription'), varinoteBlockRegex, properties);
			}
		});
	}
}
