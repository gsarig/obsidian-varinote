export function createTooltip(container: HTMLElement, initialValue: number): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = initialValue.toString(); // Set the initial value
    container.appendChild(tooltip);
    return tooltip;
}

export function updateTooltip(tooltip: HTMLElement, event: MouseEvent, value: number) {
    tooltip.textContent = value.toString();
    const rect = tooltip.parentElement?.getBoundingClientRect();
    if (rect) {
        tooltip.style.left = `${event.clientX - rect.left}px`;
        tooltip.style.top = `${event.clientY - rect.top - 30}px`;
    }
}

export function showTooltip(tooltip: HTMLElement) {
    tooltip.style.display = 'block';
}

export function hideTooltip(tooltip: HTMLElement) {
    tooltip.style.display = 'none';
}
