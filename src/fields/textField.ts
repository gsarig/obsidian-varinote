import {Setting} from 'obsidian';

export function createTextField(
	contentEl: HTMLElement,
	key: string,
	property: { label: string, value: string },
	formValues: Record<string, string>
) {
	new Setting(contentEl)
		.setName(property.label)
		.addText(text => {
			text.setValue(property.value);
			text.onChange(value => {
				formValues[key] = value;
			});
		});
}
