import {App, Notice} from 'obsidian';
import {parseVarinoteProperties} from '../utils/parser';
import {triggerModal} from '../utils/triggerModal';
import {getLabel} from '../utils/getLabel';

export async function triggerModalCommand(app: App): Promise<void> {
	const activeFile = app.workspace.getActiveFile();
	if (activeFile) {
		const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
		try {
			const content: string = await app.vault.read(activeFile);
			const varinoteMatch = content.match(varinoteBlockRegex);

			if (varinoteMatch) {
				const properties = parseVarinoteProperties(varinoteMatch[1]);
				triggerModal(app, activeFile, getLabel('modalTitle'), getLabel('modalDescription'), varinoteBlockRegex, properties);
			} else {
				new Notice(getLabel('noBlockFound'));
			}
		} catch {
			new Notice(getLabel('errorReadingFile'));
		}
	} else {
		new Notice(getLabel('noActiveFile'));
	}
}
