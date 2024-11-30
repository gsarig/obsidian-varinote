import {Notice} from 'obsidian';
import {parseVarinoteProperties} from '../utils/parser';
import {triggerModal} from "../utils/triggerModal";
import labels from '../labels.json';

export function triggerModalCommand() {
	const activeFile = this.app.workspace.getActiveFile();
	if (activeFile) {
		const varinoteBlockRegex = /```varinote\n([\s\S]*?)\n```/;
		this.app.vault.read(activeFile).then((content: any) => {
			const varinoteMatch = content.match(varinoteBlockRegex);

			if (varinoteMatch) {
				const properties = parseVarinoteProperties(varinoteMatch[1]);
				triggerModal(activeFile, labels.modalTitle, labels.modalDescription, varinoteBlockRegex, properties);
			} else {
				new Notice(labels.noBlockFound);
			}
		});
	} else {
		new Notice(labels.noActiveFile);
	}
}
