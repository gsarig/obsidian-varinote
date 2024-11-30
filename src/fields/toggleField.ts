import {Setting} from 'obsidian';

export function createToggleField(
	contentEl: HTMLElement,
	key: string,
	property: { label: string, value: string },
	formValues: Record<string, string>
) {
	new Setting(contentEl)
		.setName(property.label)
		.addToggle(toggle => {
			toggle.setValue(property.value === 'true');
			toggle.onChange(value => {
				formValues[key] = value ? 'true' : 'false';
			});
		});
}
