import { browser, expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNote, openNote, waitForModal, closeModal, noteContent, executeObsidianCommand, dismissOpenModals } from "./helpers.js";

// Append a varinote block to an already-existing note, as if it were pasted
// or inserted via a templating plugin like Templater after note creation.
async function insertVarinoteBlock(notePath: string, block: string): Promise<void> {
	await browser.executeObsidian(
		async ({ app, obsidian }, notePath, block) => {
			const file = app.vault.getAbstractFileByPath(notePath);
			if (file instanceof obsidian.TFile) {
				const existing = await app.vault.read(file);
				await app.vault.modify(file, existing + "\n" + block);
			}
		},
		notePath,
		block,
	);
}

describe("Command flow", function () {
	beforeEach(async function () {
		await dismissOpenModals();
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("processes the active file's varinote block via the trigger-modal command", async function () {
		await createNote("Manual.md", "Some existing content.\n");
		await openNote("Manual.md");

		await insertVarinoteBlock(
			"Manual.md",
			"```varinote\nextra::Extra Label|Extra Value\n```\nPlaceholder: {{$extra}}\n",
		);

		await executeObsidianCommand("varinote:trigger-modal");
		await waitForModal();
		await closeModal();

		const content = await noteContent("Manual.md");
		expect(content).not.toContain("```varinote");
		expect(content).toContain("Placeholder: Extra Value");
	});
});
