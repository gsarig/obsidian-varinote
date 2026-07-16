import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setSliderField, closeModal, noteContent } from "./helpers.js";

describe("Slider field", function () {
	beforeEach(async function () {
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("renders the set number and its doubled calculation", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setSliderField("Number of people", 5);
		await closeModal();

		const content = await noteContent("Egg.md");
		expect(content).toContain("## How to boil an egg for 5 persons");
		expect(content).toContain("Take **10** eggs");
	});
});
