document.addEventListener('DOMContentLoaded', () => {
const dropdownBackground = document.querySelector('.mini-cart-component');
const body = document.body;

if (dropdownBackground) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                const display = window.getComputedStyle(dropdownBackground).display;
                if (display === 'flex') {
                    body.classList.add('no-scroll');
                } else {
                    body.classList.remove('no-scroll');
                }
            }
        });
    });

    observer.observe(dropdownBackground, { attributes: true, attributeFilter: ['style'] });
} else {
    console.error('.mini-cart_dropdown-background not found');
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
    .no-scroll {
        overflow: hidden;
    }
    </style>
`);
});