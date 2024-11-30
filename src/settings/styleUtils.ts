import { settingStyles } from './settingStyles';

export function injectStyles(styleElement: HTMLStyleElement | null): HTMLStyleElement | null {
	if (styleElement) return styleElement;

	const style = document.createElement('style');
	style.textContent = settingStyles;
	document.head.appendChild(style);

	return style;
}

export function hideStyles(styleElement: HTMLStyleElement | null): void {
	if (styleElement) {
		styleElement.remove();
	}
}

export function handleHide(instance: { styleElement: HTMLStyleElement | null }): void {
	hideStyles(instance.styleElement);
	instance.styleElement = null;
}
