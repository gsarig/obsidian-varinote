import {Setting} from 'obsidian';
import {FieldString} from '../types/records';
import {Property} from '../types/properties';

export function createToggleField(
	contentEl: HTMLElement,
	key: string,
	property: Property,
	formValues: FieldString
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
