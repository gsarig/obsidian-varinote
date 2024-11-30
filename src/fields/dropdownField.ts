import {Notice, Setting} from 'obsidian';
import {getLabel} from '../utils/getLabel'

// Define the DropdownOptions type
type DropdownOptions = Record<string, string>;

export function createDropdownField(
	contentEl: HTMLElement,
	key: string,
	property: { label: string, value: string },
	formValues: Record<string, string>
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
	const options: DropdownOptions = {};

	optionsArray.forEach((option, index) => {
		const valueKey = `option_${index + 1}`;
		options[valueKey] = option;
	});

	const valueKey = optionsArray.length > 0 ? 'option_1' : '';

	new Setting(contentEl)
		.setName(property.label)
		.addDropdown(dropdown => {
			Object.entries(options).forEach(([value, displayName]) => {
				dropdown.addOption(value, displayName);
			});

			dropdown.setValue(valueKey);

			dropdown.onChange(value => {
				formValues[key] = value;
			});
		});
}
