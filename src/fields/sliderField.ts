import {Setting, Notice} from 'obsidian';
import {getLabel} from '../utils/getLabel';
import {createTooltip, updateTooltip} from '../utils/getTooltip';
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

	const sliderContainer = document.createElement('div'); // Unique container for the slider and tooltip
	contentEl.appendChild(sliderContainer);

	new Setting(sliderContainer)
		.setName(property.label)
		.addSlider(slider => {
			slider.setLimits(min, max, step);
			slider.setValue(defaultValue);

			// Create a tooltip for each slider
			const tooltip = createTooltip(sliderContainer, defaultValue);

			slider.onChange(value => {
				formValues[key] = value;
			});

			// Use the container to query the specific range input
			const inputElement = sliderContainer.querySelector('input[type="range"]');

			if (inputElement) {
				inputElement.addEventListener('input', (event: MouseEvent) => {
					const value = parseFloat((event.target as HTMLInputElement).value);
					updateTooltip(tooltip, event, value);
				});
			}
		});
}
