document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', (event) => {
            event.preventDefault();

            const existingTooltip = document.querySelector('.tooltip_active');
            if (existingTooltip) {
                existingTooltip.remove();
            }

            const tooltipText = tooltip.getAttribute('title');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip tooltip_active';
            tooltipElement.innerText = tooltipText;
            document.body.appendChild(tooltipElement);

            const position = tooltip.getAttribute('data-position') || 'bottom';
            const tooltipRect = tooltipElement.getBoundingClientRect();
            const targetRect = tooltip.getBoundingClientRect();

            switch (position) {
                case 'top':
                    tooltipElement.style.top = (targetRect.top - tooltipRect.height) + 'px';
                    tooltipElement.style.left = targetRect.left + 'px';
                    break;
                case 'right':
                    tooltipElement.style.top = targetRect.top + 'px';
                    tooltipElement.style.left = (targetRect.right) + 'px';
                    break;
                case 'bottom':
                    tooltipElement.style.top = (targetRect.bottom) + 'px';
                    tooltipElement.style.left = targetRect.left + 'px';
                    break;
                case 'left':
                    tooltipElement.style.top = targetRect.top + 'px';
                    tooltipElement.style.left = (targetRect.left - tooltipRect.width) + 'px';
                    break;
                default:
                    tooltipElement.style.top = (targetRect.bottom) + 'px';
                    tooltipElement.style.left = targetRect.left + 'px';
            }

            const scrollOffset = window.scrollY;
            tooltipElement.style.top = (parseFloat(tooltipElement.style.top) + scrollOffset) + 'px';
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('has-tooltip')) {
            const existingTooltip = document.querySelector('.tooltip_active');
            if (existingTooltip) {
                existingTooltip.remove();
            }
        }
    });
});
