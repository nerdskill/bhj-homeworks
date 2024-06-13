document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const items = document.getElementById('items');
    const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

    const createCurrencyItem = (charCode, value) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="item__code">${charCode}</div>
            <div class="item__value">${value}</div>
            <div class="item__currency">руб.</div>
        `;
        return item;
    };

    const renderCurrencies = (currencies) => {
        items.innerHTML = '';
        for (let key in currencies) {
            const { CharCode, Value } = currencies[key];
            const item = createCurrencyItem(CharCode, Value);
            items.appendChild(item);
        }
    };

    const fetchCurrencyData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const currencies = data.response.Valute;
            renderCurrencies(currencies);
            localStorage.setItem('currencyData', JSON.stringify(currencies));
            loader.classList.remove('loader_active');
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    };

    const cachedData = localStorage.getItem('currencyData');
    if (cachedData) {
        renderCurrencies(JSON.parse(cachedData));
        loader.classList.remove('loader_active');
    } else {
        fetchCurrencyData();
    }

    fetchCurrencyData();
});
