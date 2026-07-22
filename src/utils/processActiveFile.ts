import {App, MarkdownView, TFile, Notice} from 'obsidian';
import {parseVarinoteProperties} from './parser';
import {getTemplateFolderPath} from './templateUtils';
import {triggerModal} from './triggerModal';
import {getLabel} from './getLabel';

export async function processActiveFile(app: App, file?: TFile) {
	const activeMarkdownView = app.workspace.getActiveViewOfType(MarkdownView);
	const fileToCheck = file || activeMarkdownView?.file;

	if (fileToCheck) {
		const templateFolder = getTemplateFolderPath(app);

		if (templateFolder && fileToCheck.path.startsWith(templateFolder)) {
			// Skipping template file.
			return;
		}

		try {
			const content: string = await app.vault.read(fileToCheck);

			const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
			const varinoteMatch = content.match(varinoteBlockRegex);

			if (varinoteMatch) {
				const properties = parseVarinoteProperties(varinoteMatch[1]);
				triggerModal(app, fileToCheck, getLabel('modalTitle'), getLabel('modalDescription'), varinoteBlockRegex, properties);
			}
		} catch {
			new Notice(getLabel('errorReadingFile'));
		}
	}
}
