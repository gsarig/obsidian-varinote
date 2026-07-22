import { browser, expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setTextField, closeModal, modalVisible, noteContent, dismissOpenModals } from "./helpers.js";

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

	it("submits the modal with the Enter key", async function () {
		await createNoteFromTemplate("Egg.md");
		await waitForModal();

		await setTextField("Greeting", "Submitted via Enter");
		await browser.keys("Enter");
		await browser.waitUntil(async () => !(await modalVisible()), {
			timeout: 5000,
			timeoutMsg: "modal did not close on Enter",
		});

		const content = await noteContent("Egg.md");
		expect(content).toContain("Submitted via Enter");
		expect(content).not.toContain("```varinote");
	});
});
