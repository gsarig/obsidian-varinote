import {App, MarkdownView, TFile, Notice} from 'obsidian';
import {parseVarinoteProperties} from './parser';
import {getTemplateFolderPath} from './templateUtils';
import {triggerModal} from './triggerModal';
import {getLabel} from './getLabel';

export async function processActiveFile(app: App, file?: TFile) {
	const activeMarkdownView = app.workspace.getActiveViewOfType(MarkdownView);
	const fileToCheck = file || activeMarkdownView?.file;

	if (fileToCheck) {
		// Strip any trailing slash so the boundary check below stays exact.
		const templateFolder = getTemplateFolderPath(app)?.replace(/\/+$/, '');

		// Match on the folder boundary so a sibling folder with the same
		// prefix (e.g. "Templates2") is not treated as the Templates folder.
		if (templateFolder && fileToCheck.path.startsWith(templateFolder + '/')) {
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
