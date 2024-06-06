document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const value = dropdown.querySelector('.dropdown__value');
        const list = dropdown.querySelector('.dropdown__list');
        const items = list.querySelectorAll('.dropdown__item');

        value.addEventListener('click', function () {
            list.classList.toggle('dropdown__list_active');
        });

        items.forEach(item => {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                value.textContent = this.textContent;
                list.classList.remove('dropdown__list_active');
            });
        });
    });

    document.addEventListener('click', function (event) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('.dropdown__list').classList.remove('dropdown__list_active');
            }
        });
    });
});
