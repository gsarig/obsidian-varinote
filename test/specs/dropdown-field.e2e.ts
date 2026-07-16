import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setDropdownField, closeModal, noteContent } from "./helpers.js";

describe("Dropdown field", function () {
	beforeEach(async function () {
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("substitutes a non-default selected option", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setDropdownField("Difficulty level", "Expert");
		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).toContain("**Difficulty level: Expert**");
		expect(content).not.toContain("**Difficulty level: Easy**");
	});
});
