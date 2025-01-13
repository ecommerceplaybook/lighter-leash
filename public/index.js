document.addEventListener('smootify:cart_updated', (event) => {
    const cart = event.detail;
  
    if (!cart || !cart.lines || !cart.lines.nodes) {
      console.warn('Cart data is not available or has unexpected structure.');
      return;
    }
  
    // Add a slight delay to allow the DOM to render
    setTimeout(() => {
      const lines = cart.lines.nodes;
  
      lines.forEach((line) => {
        const productTitle = line.merchandise.product.title;
  
        if (productTitle.includes('Upload Your Photo')) {
          console.log('Found product with "Upload Your Photo" in title:', productTitle);
  
          // Look for the relevant DOM element
          const options = document.querySelectorAll('[cart-item="options"]');
  
          if (!options.length) {
            console.warn('No matching [cart-item="options"] elements found on the page after delay.');
            return;
          }
  
          options.forEach((option) => {
            const optionName = option.querySelector('[option="name"]');
            const optionValue = option.querySelector('[option="value"]');
  
            if (optionName && optionName.textContent === 'Photo Upload Description') {
              const cloudinaryUrl = optionValue.textContent;
  
              if (cloudinaryUrl.startsWith('http')) {
                console.log('Transforming URL:', cloudinaryUrl);
  
                // Create a clickable link
                const link = document.createElement('a');
                link.href = cloudinaryUrl;
                link.target = '_blank'; // Open link in a new tab
                link.textContent = 'View Uploaded Photo';
                optionValue.innerHTML = ''; // Clear the existing content
                optionValue.appendChild(link); // Add the clickable link
  
                console.log('Link successfully added:', link);
              } else {
                console.warn('Invalid URL detected:', cloudinaryUrl);
              }
            }
          });
        }
      });
    }, 500); // Adjust delay as needed (500ms should be enough)
  });