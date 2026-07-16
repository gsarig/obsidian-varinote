import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setToggleField, closeModal, noteContent } from "./helpers.js";

describe("Toggle field", function () {
	beforeEach(async function () {
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("renders the first option when the toggle is on", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setToggleField("Are the eggs large?", true);
		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).toContain("Boil them for **12 minutes**");
	});

	it("renders the second option when the toggle is off", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setToggleField("Are the eggs large?", false);
		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).toContain("Boil them for **10 minutes**");
	});
});
