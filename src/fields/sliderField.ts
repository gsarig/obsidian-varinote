import {Setting, Notice} from 'obsidian';
import {getLabel} from '../utils/getLabel';

export function createSliderField(
	contentEl: HTMLElement,
	key: string,
	property: { label: string, value: string },
	formValues: Record<string, number>
) {
	// Check if value is set correctly for a minimum,maximum,step,default format.
	if (!property.value || property.value.split(',').length < 4) {
		new Notice(getLabel('sliderFieldInvalid', {
			label: property.label
		}));
		return;
	}

	// Parse the minimum, maximum, step, and default values from the string.
	const [minStr, maxStr, stepStr, defaultStr] = property.value.split(',').map(str => str.trim());
	const min = parseFloat(minStr);
	const max = parseFloat(maxStr);
	const step = parseFloat(stepStr);
	const defaultValue = parseFloat(defaultStr);

	// Validate parsed numbers.
	if (isNaN(min) || isNaN(max) || isNaN(step) || isNaN(defaultValue)) {
		new Notice(getLabel('sliderFieldInadequate', {
			label: property.label
		}));
		return;
	}

	// Ensure the default value is within the min and max range.
	if (defaultValue < min || defaultValue > max) {
		new Notice(getLabel('sliderFieldOutOfRange', {
			label: property.label
		}));
	}

	new Setting(contentEl)
		.setName(property.label)
		.addSlider(slider => {
			slider.setLimits(min, max, step);
			slider.setValue(defaultValue);

			// Update formValues when the slider value changes.
			slider.onChange(value => {
				formValues[key] = value;
			});
		});
}
