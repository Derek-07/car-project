/**
 * Wraps all car cards with dynamic links to single-inventory.html
 * Extracts car name and image from each card and creates proper URL parameters
 */

(function() {
    'use strict';

    function initializeCarCardLinks() {
        // Get all carousel car cards
        const carCards = document.querySelectorAll('.carousel-car-card');
        
        if (carCards.length === 0) {
            console.log('No car cards found');
            return;
        }

        carCards.forEach(card => {
            // Skip if already wrapped in a link
            if (card.parentElement.tagName === 'A') {
                return;
            }

            // Extract car information from the card
            const carTitleElement = card.querySelector('.car-title');
            const carImageElement = card.querySelector('.car-image');
            
            if (!carTitleElement || !carImageElement) {
                return;
            }

            const carName = carTitleElement.textContent.trim();
            const carImage = carImageElement.src || carImageElement.getAttribute('src');

            if (!carName || !carImage) {
                return;
            }

            // Create anchor tag
            const link = document.createElement('a');
            link.href = `single-inventory.html?car=${encodeURIComponent(carName)}&img=${encodeURIComponent(carImage)}`;
            link.className = 'car-card-link';
            link.style.textDecoration = 'none';
            link.style.cursor = 'pointer';
            link.setAttribute('title', carName);

            // Wrap the card with the link
            card.parentElement.insertBefore(link, card);
            link.appendChild(card);

            // Add event listener to action buttons to stop propagation
            const actionButtons = card.querySelectorAll('.car-action-buttons a');
            actionButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            });
        });

        console.log('✓ Car card links initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCarCardLinks);
    } else {
        initializeCarCardLinks();
    }
})();
