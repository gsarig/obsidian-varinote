import {createTextField} from '../fields/textField';
import {createToggleField} from '../fields/toggleField';
import {createDropdownField} from '../fields/dropdownField';
import {createSliderField} from '../fields/sliderField';
import {ExtendedPropertyMap, FieldString, FieldNumber, FieldStringOrNumber} from '../types/records';

export function createSettingsFromProperties(
	contentEl: HTMLElement,
	properties: ExtendedPropertyMap,
	formValues: FieldStringOrNumber
) {
	Object.keys(properties).forEach(key => {
		const property = properties[key];
		switch (property.type) {
			case 'toggle':
				createToggleField(contentEl, key, property, formValues as FieldString);
				break;
			case 'dropdown':
				createDropdownField(contentEl, key, property, formValues as FieldString);
				break;
			case 'slider':
				createSliderField(contentEl, key, property, formValues as FieldNumber);
				break;
			default:
				createTextField(contentEl, key, property, formValues as FieldString);
				break;
		}
	});
}
