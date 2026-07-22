import { expect } from "@wdio/globals";
import { describe, it, beforeEach } from "mocha";
import { obsidianPage } from "wdio-obsidian-service";
import { createNoteFromTemplate, waitForModal, setTextField, closeModal, noteContent, dismissOpenModals } from "./helpers.js";

describe("Calculations with a text field", function () {
	beforeEach(async function () {
		await dismissOpenModals();
		await obsidianPage.resetVault("test/vaults/simple");
	});

	it("evaluates the arithmetic for numeric input, per the README", async function () {
		await createNoteFromTemplate("Calc.md", "Templates/Calc.md");
		await waitForModal();

		await setTextField("Number", "10");
		await closeModal();

		const content = await noteContent("Calc.md");
		expect(content).toContain("Result: 20");
	});

	it("leaves the substituted-but-uncalculated expression for non-numeric input", async function () {
		await createNoteFromTemplate("Calc.md", "Templates/Calc.md");
		await waitForModal();

		await setTextField("Number", "abc");
		await closeModal();

		// evaluateCalculation's arithmetic parser rejects "abc + 10" (abc is
		// not a number), so it falls back to the substituted-but-not-
		// calculated string rather than the original "{{$number + 10}}" syntax.
		const content = await noteContent("Calc.md");
		expect(content).toContain("Result: abc + 10");
	});
});
