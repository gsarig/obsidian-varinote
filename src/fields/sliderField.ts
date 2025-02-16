import {Setting, Notice} from 'obsidian';
import {getLabel} from '../utils/getLabel';
import {FieldNumber} from '../types/records';
import {Property} from '../types/properties';

export function createSliderField(
	contentEl: HTMLElement,
	key: string,
	property: Property,
	formValues: FieldNumber
) {
	// Validate slider values
	if (!property.value || property.value.split(',').length < 4) {
		new Notice(getLabel('sliderFieldInvalid', {label: property.label}));
		return;
	}

	const [minStr, maxStr, stepStr, defaultStr] = property.value.split(',').map(str => str.trim());
	const min = parseFloat(minStr);
	const max = parseFloat(maxStr);
	const step = parseFloat(stepStr);
	const defaultValue = parseFloat(defaultStr);

	if (isNaN(min) || isNaN(max) || isNaN(step) || isNaN(defaultValue)) {
		new Notice(getLabel('sliderFieldInadequate', {label: property.label}));
		return;
	}

	if (defaultValue < min || defaultValue > max) {
		new Notice(getLabel('sliderFieldOutOfRange', {label: property.label}));
	}

	const sliderContainer = document.createElement('div');
	contentEl.appendChild(sliderContainer);

	const setting = new Setting(sliderContainer)
		.setName(property.label)
		.setDesc(defaultValue.toString())
		.setClass('setting-item-slider')
		.addSlider(slider => {
			return slider
				.setLimits(min, max, step)
				.setValue(defaultValue)
				.onChange((value: number) => {
					formValues[key] = value;
					setting.setDesc(value.toString());
				});
		});
}
