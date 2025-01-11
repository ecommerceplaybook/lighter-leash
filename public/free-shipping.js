document.addEventListener('DOMContentLoaded', () => {
    const freeShippingThreshold = 100; // Free shipping threshold set to 100
    const freeShippingMessage = document.querySelector('.free-shipping_message');
    const freeShippingSuccess = document.querySelector('.free-shipping_success');
    const freeShippingText = document.querySelector('.free-shipping-text');
    const amountRemainingElement = document.querySelector('.amount-remaining');
    const freeShippingBarRemaining = document.querySelector('.free-shipping_bar-remaining');
    const freeShippingAmountElement = document.querySelector('#free-shipping-amount');

    // Function to update free shipping info
    const updateFreeShippingInfo = (cartTotalAmount) => {
        const amountRemaining = freeShippingThreshold - cartTotalAmount; // Calculate amount left for free shipping
        let percentage = (cartTotalAmount / freeShippingThreshold) * 100;
        if (percentage > 100) percentage = 100; // Ensure width does not exceed 100%

        if (cartTotalAmount >= freeShippingThreshold) {
            if (freeShippingMessage) freeShippingMessage.style.display = 'none';
            if (freeShippingSuccess) freeShippingSuccess.style.display = 'block';
            if (freeShippingText) freeShippingText.innerText = 'FREE';
        } else {
            if (freeShippingMessage) freeShippingMessage.style.display = 'block';
            if (freeShippingSuccess) freeShippingSuccess.style.display = 'none';
            if (freeShippingText) freeShippingText.innerText = 'Calculated in Cart';
            if (amountRemainingElement) amountRemainingElement.innerText = `$${amountRemaining.toFixed(2)}`;
        }

        if (freeShippingBarRemaining) {
            freeShippingBarRemaining.style.width = `${percentage}%`;
        }

        // Update the amount remaining for free shipping
        if (freeShippingAmountElement) {
            freeShippingAmountElement.textContent = `$${amountRemaining.toFixed(2)}`;
        }
    };

    // Event listener for smootify:cart_updated event
    document.addEventListener('smootify:cart_updated', (event) => {
        const cart = event.detail;
        const cartTotalAmount = parseFloat(cart.cost.totalAmount.amount); // Ensure the amount is a number
        updateFreeShippingInfo(cartTotalAmount);
    });

    // Mutation Observer for cart total changes
    const targetNode = document.querySelector("#total");
    const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" || mutation.type === "characterData") {
                const cartTotalAmount = parseFloat(targetNode.textContent.split("$")[1].trim());
                updateFreeShippingInfo(cartTotalAmount);
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, {
        childList: true,
        characterData: true,
        subtree: true,
    });

    // Initialize with current cart total
    if (targetNode) {
        const cartTotalAmount = parseFloat(targetNode.textContent.split("$")[1].trim());
        updateFreeShippingInfo(cartTotalAmount);
    }
});