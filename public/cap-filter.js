document.addEventListener('smootify:product_loaded', (event) => {
    const { product } = event.detail;

    // Find all smootify-product elements
    const smootifyProducts = document.querySelectorAll('smootify-product');

    smootifyProducts.forEach((smootifyProduct) => {
        // Check if the data-id matches the product id
        if (smootifyProduct.getAttribute('data-id') === product.id) {
            // Find the .product-tag element within this smootifyProduct
            const productTagElement = smootifyProduct.querySelector('.product-tag');

            if (productTagElement) {
                // Replace the content of the .product-tag element with the product tags
                productTagElement.textContent = product.tags.join(', ');
            }
        }
    });

    // Trigger filtering after products are loaded
    filterProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('#email-form-3 input[type="checkbox"]'); // All checkboxes
    const productItems = document.querySelectorAll('.product-item'); // All product items
    const viewAllCapsCheckbox = Array.from(checkboxes).find(
        (checkbox) => checkbox.nextElementSibling.textContent.trim() === 'View All Caps'
    ); // The "View All Caps" checkbox

    // Function to filter products based on selected checkboxes
    const filterProducts = () => {
        const selectedTags = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked && checkbox !== viewAllCapsCheckbox) // Get checked checkboxes except "View All Caps"
            .map((checkbox) => checkbox.nextElementSibling.textContent.trim()); // Extract tag names

        productItems.forEach((item) => {
            const productTagElement = item.querySelector('.product-tag');
            if (!productTagElement) return; // Skip if .product-tag not found

            const productTags = productTagElement.textContent.split(',').map((tag) => tag.trim()); // Extract product tags

            if (
                viewAllCapsCheckbox.checked || // Show all products if "View All Caps" is selected
                selectedTags.some((tag) => productTags.includes(tag))
            ) {
                item.style.display = 'block'; // Show product
            } else {
                item.style.display = 'none'; // Hide product
            }
        });
    };

    // Function to update the active state of checkboxes
    const updateActiveState = () => {
        checkboxes.forEach((checkbox) => {
            const parentLabel = checkbox.closest('label'); // Get parent label
            if (checkbox.checked) {
                parentLabel.classList.add('is-active'); // Add .is-active
            } else {
                parentLabel.classList.remove('is-active'); // Remove .is-active
            }
        });
    };

    // Ensure "View All Caps" is selected if no other checkboxes are selected
    const ensureViewAllCapsDefault = () => {
        const anySelected = Array.from(checkboxes).some(
            (checkbox) => checkbox.checked && checkbox !== viewAllCapsCheckbox
        ); // Check if any checkbox except "View All Caps" is selected

        if (!anySelected) {
            viewAllCapsCheckbox.checked = true;
            viewAllCapsCheckbox.closest('label').classList.add('is-active'); // Set "View All Caps" active
            filterProducts(); // Trigger filtering to show all products
        }
    };

    // Handle behavior for "View All Caps"
    const handleViewAllCaps = () => {
        if (viewAllCapsCheckbox.checked) {
            checkboxes.forEach((checkbox) => {
                if (checkbox !== viewAllCapsCheckbox) {
                    checkbox.checked = false; // Uncheck all other checkboxes
                    checkbox.closest('label').classList.remove('is-active'); // Remove .is-active from others
                }
            });
        }
    };

    // Event listener for all checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (checkbox !== viewAllCapsCheckbox) {
                viewAllCapsCheckbox.checked = false; // Deselect "View All Caps" if another checkbox is selected
                viewAllCapsCheckbox.closest('label').classList.remove('is-active'); // Remove .is-active from "View All Caps"
            } else {
                handleViewAllCaps(); // Handle "View All Caps" behavior
            }

            filterProducts();
            updateActiveState();
            ensureViewAllCapsDefault(); // Ensure "View All Caps" is re-selected if nothing else is selected
        });
    });

    // Set default active state for "View All Caps" and apply initial filtering
    if (viewAllCapsCheckbox) {
        viewAllCapsCheckbox.checked = true;
        viewAllCapsCheckbox.closest('label').classList.add('is-active');
    }

    filterProducts();
    updateActiveState();
});