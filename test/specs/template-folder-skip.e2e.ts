import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNote, assertNoModalAppears, noteContent } from "./helpers.js";

describe("Template-folder skip", function () {
	beforeEach(async function () {
		await obsidianPage.resetVault("test/vaults/simple");
	});

	// Varinote only listens for the vault's `create` event (see src/main.ts);
	// there is no `modify` listener, so editing an existing file never opens
	// the modal regardless of folder. This only exercises the create path,
	// which is where getTemplateFolderPath's skip check actually applies.
	it("opens no modal for a new file created inside the Templates folder", async function () {
		const content = "```varinote\nvar::Label\n```\n{{$var}}\n";
		await createNote("Templates/New.md", content);

		await assertNoModalAppears();

		expect(await noteContent("Templates/New.md")).toBe(content);
	});
});
