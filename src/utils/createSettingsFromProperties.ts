import {createTextField} from '../fields/textField';
import {createToggleField} from '../fields/toggleField';
import {createDropdownField} from '../fields/dropdownField';
import {createSliderField} from '../fields/sliderField';

export function createSettingsFromProperties(
	contentEl: HTMLElement,
	properties: Record<string, { label: string, value: string, type?: string }>,
	formValues: Record<string, string | number>
) {
	Object.keys(properties).forEach(key => {
		const property = properties[key];
		switch (property.type) {
			case 'toggle':
				createToggleField(contentEl, key, property, formValues as Record<string, string>);
				break;
			case 'dropdown':
				createDropdownField(contentEl, key, property, formValues as Record<string, string>);
				break;
			case 'slider':
				createSliderField(contentEl, key, property, formValues as Record<string, number>);
				break;
			default:
				createTextField(contentEl, key, property, formValues as Record<string, string>);
				break;
		}
	});
}
