import {Notice, Setting} from 'obsidian';
import {getLabel} from '../utils/getLabel'
import {FieldString} from '../types/records';
import {Property} from '../types/properties';

export function createDropdownField(
	contentEl: HTMLElement,
	key: string,
	property: Property,
	formValues: FieldString
) {
	// Check if value is empty or doesn't include a comma.
	if (!property.value || !property.value.includes(',')) {
		new Notice(getLabel('dropdownInvalidOptions', {
			label: property.label
		}));
		return;
	}

	// Parse the value to create options.
	const optionsArray = property.value.split(',').map(option => option.trim());
	const options: FieldString = {};

	optionsArray.forEach(option => {
		// Use the option as both the value and the display name
		options[option] = option;
	});

	const firstOption = optionsArray.length > 0 ? optionsArray[0] : '';

	// Ensure the default selection is stored
	formValues[key] = firstOption;

	new Setting(contentEl)
		.setName(property.label)
		.addDropdown(dropdown => {
			Object.entries(options).forEach(([value, displayName]) => {
				dropdown.addOption(value, displayName);
			});

			dropdown.setValue(firstOption);

			dropdown.onChange(value => {
				formValues[key] = value;
			});
		});
}
