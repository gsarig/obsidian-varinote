import {Setting} from 'obsidian';
import {FieldString} from '../types/records';
import {Property} from '../types/properties';

export function createTextField(
	contentEl: HTMLElement,
	key: string,
	property: Property,
	formValues: FieldString
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
