import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setTextField, closeModal, noteContent, dismissOpenModals } from "./helpers.js";

describe("Text field", function () {
	beforeEach(async function () {
		await dismissOpenModals();
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("substitutes the typed value over the default", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setTextField("Greeting", "Enjoy your meal!");
		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).toContain("Enjoy your meal!");
		expect(content).not.toContain("Bon appetit!");
	});
});
