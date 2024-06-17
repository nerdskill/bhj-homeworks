document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip');

    tooltips.forEach((tooltip) => {
        tooltip.addEventListener('click', function(event) {
            event.preventDefault();

            const existingTooltip = document.querySelector('.tooltip');
            if (existingTooltip) {
                if (existingTooltip.previousElementSibling === this) {
                    existingTooltip.remove();
                    return;
                } else {
                    existingTooltip.remove();
                }
            }

            const tooltipText = this.getAttribute('title');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip tooltip_active';
            tooltipElement.innerText = tooltipText;

            const position = this.getAttribute('data-position') || 'bottom';
            const tooltipRect = this.getBoundingClientRect();
            document.body.appendChild(tooltipElement);

            let top = 0;
            let left = 0;

            switch (position) {
                case 'top':
                    top = tooltipRect.top - tooltipElement.offsetHeight - 5;
                    left = tooltipRect.left + (tooltipRect.width / 2) - (tooltipElement.offsetWidth / 2);
                    break;
                case 'bottom':
                    top = tooltipRect.bottom + 5;
                    left = tooltipRect.left + (tooltipRect.width / 2) - (tooltipElement.offsetWidth / 2);
                    break;
                case 'left':
                    top = tooltipRect.top + (tooltipRect.height / 2) - (tooltipElement.offsetHeight / 2);
                    left = tooltipRect.left - tooltipElement.offsetWidth - 5;
                    break;
                case 'right':
                    top = tooltipRect.top + (tooltipRect.height / 2) - (tooltipElement.offsetHeight / 2);
                    left = tooltipRect.right + 5;
                    break;
            }

            tooltipElement.style.top = `${top}px`;
            tooltipElement.style.left = `${left}px`;

            this.parentNode.insertBefore(tooltipElement, this.nextSibling);

            document.addEventListener('click', function hideTooltip(event) {
                if (!tooltip.contains(event.target) && !tooltipElement.contains(event.target)) {
                    tooltipElement.remove();
                    document.removeEventListener('click', hideTooltip);
                }
            });
        });
    });
});
