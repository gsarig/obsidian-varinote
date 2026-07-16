import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNote, assertNoModalAppears, noteContent } from "./helpers.js";

describe("No varinote block", function () {
	beforeEach(async function () {
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("opens no modal and leaves the note untouched", async function () {
		const content = "# Plain\n\nNo variables here.\n";
		await createNote("Plain.md", content);

		await assertNoModalAppears();

		expect(await noteContent("Plain.md")).toBe(content);
	});
});
