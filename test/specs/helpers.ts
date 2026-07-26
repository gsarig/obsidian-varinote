import * as fs from "node:fs";
import * as path from "node:path";
import { $, $$, browser } from "@wdio/globals";
import labels from "../../src/labels.json";

const MODAL_SELECTOR = ".varinote-modal-content";

// Match a setting-item's exact class token, not a substring (e.g. avoid
// "setting-item-name" matching a "setting-item" lookup).
function hasClass(cls: string): string {
	return `contains(concat(' ', normalize-space(@class), ' '), ' ${cls} ')`;
}

// Within the rendered modal, find the input/select control belonging to the
// setting-item whose visible name matches (same XPath technique as Sentinel's
// settings-ui.e2e.ts).
async function settingControl(label: string): Promise<WebdriverIO.Element> {
	return $(
		`//div[${hasClass(MODAL_SELECTOR.slice(1))}]//div[${hasClass("setting-item")}][.//div[${hasClass("setting-item-name")}][normalize-space()="${label}"]]//*[self::input or self::select]`,
	);
}

// Create (or overwrite) a note seeded with a template fixture's raw content.
// This mirrors what a user does when creating a note from an Obsidian
// template: the resulting `create` vault event is what triggers the modal.
export async function createNoteFromTemplate(notePath: string, templatePath = "Templates/Recipe.md"): Promise<void> {
	const content = fs.readFileSync(path.resolve("test/vaults/simple", templatePath), "utf-8");
	await browser.executeObsidian(
		async ({ app }, notePath, content) => {
			const existing = app.vault.getAbstractFileByPath(notePath);
			if (existing) {
				await app.vault.delete(existing, true);
			}
			await app.vault.create(notePath, content);
		},
		notePath,
		content,
	);
}

// Create (or overwrite) a plain note with the given content, no template involved.
export async function createNote(notePath: string, content = ""): Promise<void> {
	await browser.executeObsidian(
		async ({ app }, notePath, content) => {
			const existing = app.vault.getAbstractFileByPath(notePath);
			if (existing) {
				await app.vault.delete(existing, true);
			}
			await app.vault.create(notePath, content);
		},
		notePath,
		content,
	);
}

// Open a note in the active leaf (needed for the trigger-modal command, which
// operates on the active file).
export async function openNote(notePath: string): Promise<void> {
	await browser.executeObsidian(
		async ({ app, obsidian }, notePath) => {
			const file = app.vault.getAbstractFileByPath(notePath);
			if (file instanceof obsidian.TFile) {
				await app.workspace.getLeaf(false).openFile(file);
			}
		},
		notePath,
	);
}

// Whether the Varinote modal is currently in the DOM.
export async function modalVisible(): Promise<boolean> {
	return await $(MODAL_SELECTOR).isExisting();
}

// Wait for the modal to appear and settle (fails the test if it never does).
// The settle step waits for the modal's position to stop changing: on older
// Obsidian/Electron versions (v1.7.7 ships Chrome 114) clicking during the
// open animation fails with "element click intercepted".
export async function waitForModal(timeout = 5000): Promise<void> {
	const modal = $(MODAL_SELECTOR);
	await modal.waitForExist({ timeout });
	await browser.waitUntil(
		async () => {
			const before = await modal.getLocation();
			await browser.pause(100);
			const after = await modal.getLocation();
			return before.x === after.x && before.y === after.y;
		},
		{ timeout, timeoutMsg: "modal never stopped moving" },
	);
}

// Click that tolerates old-Electron clickability quirks. wdio's automatic
// scroll-into-view uses a CDP command Chrome 114 (Obsidian 1.7.7) lacks, so
// scroll via the DOM first, then try a real click, falling back to a DOM
// click only when Chrome reports the click intercepted.
async function safeClick(el: WebdriverIO.Element): Promise<void> {
	await browser.execute((node) => (node as unknown as HTMLElement).scrollIntoView({ block: "center" }), el);
	try {
		await el.click();
	} catch (error) {
		if (String(error).includes("click intercepted")) {
			await browser.execute((node) => (node as unknown as HTMLElement).click(), el);
		} else {
			throw error;
		}
	}
}

// Force-close any modal left open by a previous (failed or retried) test, so
// stacked modals cannot contaminate the next run. Call BEFORE resetVault so
// any onClose side-effect writes get wiped by the reset.
export async function dismissOpenModals(): Promise<void> {
	await browser.executeObsidian(() => {
		document
			.querySelectorAll<HTMLElement>(".modal-container .modal-close-button")
			.forEach((btn) => btn.click());
	});
	await browser.pause(100);
}

// Give any async modal-open path a chance to run, then assert it did not.
export async function assertNoModalAppears(settleMs = 500): Promise<void> {
	await browser.pause(settleMs);
	if (await modalVisible()) {
		throw new Error("expected no modal to appear, but the Varinote modal is visible");
	}
}

export async function setTextField(label: string, value: string): Promise<void> {
	const input = await settingControl(label);
	await input.setValue(value);
}

export async function setDropdownField(label: string, value: string): Promise<void> {
	const select = await settingControl(label);
	await select.selectByAttribute("value", value);
}

export async function setToggleField(label: string, on: boolean): Promise<void> {
	const input = await settingControl(label);
	const isOn = await input.isSelected();
	if (isOn !== on) {
		await safeClick(input);
	}
}

export async function setSliderField(label: string, value: number): Promise<void> {
	const input = await settingControl(label);
	await browser.execute(
		(el, val) => {
			const rangeInput = el as HTMLInputElement;
			rangeInput.value = String(val);
			rangeInput.dispatchEvent(new Event("input", { bubbles: true }));
			rangeInput.dispatchEvent(new Event("change", { bubbles: true }));
		},
		input,
		value,
	);
}

// Click the topmost modal's CTA button and wait for all modals to close.
// Targeting the LAST match matters: if a retried test stacked a second
// modal, the newest one is the one this test opened.
export async function closeModal(): Promise<void> {
	const modals = await $$(MODAL_SELECTOR);
	const topmost = modals[modals.length - 1];
	await safeClick(await topmost.$(`button=${labels.ctaBtn}`));
	await $(MODAL_SELECTOR).waitForExist({ reverse: true, timeout: 5000 });
}

export async function noteContent(notePath: string): Promise<string | null> {
	return await browser.executeObsidian(async ({ app, obsidian }, notePath) => {
		const file = app.vault.getAbstractFileByPath(notePath);
		if (file instanceof obsidian.TFile) {
			return await app.vault.read(file);
		}
		return null;
	}, notePath);
}

export async function executeObsidianCommand(commandId: string): Promise<void> {
	await browser.executeObsidian(({ app }, commandId) => {
		(app as unknown as { commands: { executeCommandById: (id: string) => void } }).commands.executeCommandById(
			commandId,
		);
	}, commandId);
}
