import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, closeModal, noteContent, dismissOpenModals } from "./helpers.js";

describe("Core flow", function () {
	beforeEach(async function () {
		await dismissOpenModals();
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("creates a note from the template, shows the modal, and substitutes defaults on close", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).not.toContain("```varinote");
		expect(content).toContain("## How to boil an egg for 2 persons");
		expect(content).toContain("**Difficulty level: Easy**");
		expect(content).toContain("Take **4** eggs");
		expect(content).toContain("Boil them for **10 minutes**");
		expect(content).toContain("Bon appetit!");
	});
});
