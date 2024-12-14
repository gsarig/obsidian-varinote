export function createTooltip(container: HTMLElement, initialValue: number): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = initialValue.toString(); // Set the initial value
    container.appendChild(tooltip);
    return tooltip;
}

export function updateTooltip(tooltip: HTMLElement, event: MouseEvent, value: number) {
    tooltip.textContent = value.toString();
}
