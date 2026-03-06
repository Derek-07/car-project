/**
 * Dynamic Car Inventory System
 * Handles URL parameters and dynamically updates car details on single-inventory.html
 * 
 * Usage:
 * single-inventory.html?car=Car+Name&img=path/to/image.jpg
 * 
 * Elements that get updated:
 * - Page title
 * - Breadcrumb title (#car-breadcrumb-title)
 * - Main car title (#car-title)
 * - Car images (#car-gallery img)
 * - Breadcrumb background image (#car-hero-image)
 */

(function() {
    'use strict';

    // ==========================================
    // DEFAULT VALUES (Fallback)
    // ==========================================
    const DEFAULT_CAR = {
        name: 'Luxury Car',
        image: 'assets/img/featured/single-inventory-gal-3.jpg',
        breadcrumbText: 'Luxury Car Details'
    };

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    /**
     * Get URL parameters from query string
     */
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            car: params.get('car') || DEFAULT_CAR.name,
            img: params.get('img') || DEFAULT_CAR.image
        };
    }

    /**
     * Decode URL-encoded values
     */
    function decodeValue(value) {
        if (!value) return '';
        try {
            return decodeURIComponent(value);
        } catch (e) {
            return value;
        }
    }

    /**
     * Update page title (browser tab)
     */
    function updatePageTitle(carName) {
        const decodedName = decodeValue(carName);
        const pageTitle = `${decodedName} | Apex Performance Car Rental`;
        document.title = pageTitle;
    }

    /**
     * Update breadcrumb title
     */
    function updateBreadcrumbTitle(carName) {
        const breadcrumbTitle = document.getElementById('car-breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = decodeValue(carName);
        }
    }

    /**
     * Update main car title
     */
    function updateCarTitle(carName) {
        const carTitle = document.getElementById('car-title');
        if (carTitle) {
            carTitle.textContent = decodeValue(carName);
        }
    }

    /**
     * Update car gallery images
     */
    function updateCarImages(imagePath) {
        if (!imagePath) return;
        
        const decodedPath = decodeValue(imagePath);
        
        // Update main hero/gallery images
        const carGallery = document.getElementById('car-gallery');
        if (carGallery) {
            const galleryImages = carGallery.querySelectorAll('.single-inventory-item');
            if (galleryImages.length > 0) {
                // Update first visible image
                galleryImages[0].style.backgroundImage = `url('${decodedPath}')`;
                galleryImages[0].setAttribute('data-bg-src', decodedPath);
                
                // Update all gallery items to show same image for consistency
                galleryImages.forEach((item, index) => {
                    item.style.backgroundImage = `url('${decodedPath}')`;
                    item.setAttribute('data-bg-src', decodedPath);
                    
                    // Keep the first one as active
                    if (index === 0) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        }
    }

    /**
     * Update breadcrumb background image
     */
    function updateBreadcrumbImage(imagePath) {
        if (!imagePath) return;
        
        const decodedPath = decodeValue(imagePath);
        const heroImage = document.getElementById('car-hero-image');
        
        if (heroImage) {
            // Set as data attribute (for style.js background loading)
            heroImage.setAttribute('data-bg-src', decodedPath);
            
            // Set background image directly
            heroImage.style.backgroundImage = `
                linear-gradient(
                    rgba(0,0,0,0.6),
                    rgba(0,0,0,0.8)
                ),
                url('${decodedPath}')
            `;
            heroImage.style.backgroundSize = 'cover';
            heroImage.style.backgroundPosition = 'center';
            heroImage.style.backgroundAttachment = 'initial';
        }
    }

    /**
     * Update breadcrumb menu text
     */
    function updateBreadcrumbMenu(carName) {
        const breadcrumbMenu = document.querySelector('.breadcumb-menu');
        if (breadcrumbMenu) {
            const decodedName = decodeValue(carName);
            // Get all menu items
            const menuItems = breadcrumbMenu.querySelectorAll('li');
            
            // Update the last menu item (usually the current page name)
            if (menuItems.length > 0) {
                const lastItem = menuItems[menuItems.length - 1];
                // Only update if it's text, not a link
                if (!lastItem.querySelector('a')) {
                    lastItem.textContent = decodedName;
                }
            }
        }
    }

    /**
     * Store car data in localStorage for persistence
     */
    function storeCarInLocalStorage(carName, imagePath) {
        try {
            localStorage.setItem('selectedCar', JSON.stringify({
                name: decodeValue(carName),
                image: decodeValue(imagePath),
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }

    /**
     * Get previous car data from localStorage
     */
    function getStoredCar() {
        try {
            const stored = localStorage.getItem('selectedCar');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Error reading from localStorage:', e);
        }
        return null;
    }

    /**
     * Clear localStorage for this car
     */
    function clearStoredCar() {
        try {
            localStorage.removeItem('selectedCar');
        } catch (e) {
            console.warn('Error clearing localStorage:', e);
        }
    }

    // ==========================================
    // MAIN INITIALIZATION FUNCTION
    // ==========================================

    function initializeDynamicInventory() {
        // Get URL parameters
        const params = getURLParams();
        const carName = params.car;
        const imagePath = params.img;

        // Validate input
        if (!carName || carName === DEFAULT_CAR.name) {
            // Try to get from localStorage as fallback
            const stored = getStoredCar();
            if (stored && stored.name) {
                updateAllElements(stored.name, stored.image);
                return;
            }
            
            // Use defaults if nothing found
            console.info('Using default car values. Pass ?car=CarName&img=path/to/image.jpg to customize');
            updateAllElements(DEFAULT_CAR.name, DEFAULT_CAR.image);
            return;
        }

        // Update all elements with provided values
        updateAllElements(carName, imagePath);
    }

    /**
     * Update all DOM elements with car data
     */
    function updateAllElements(carName, imagePath) {
        const decodedName = decodeValue(carName);
        const decodedImage = decodeValue(imagePath);

        // Update all elements
        updatePageTitle(carName);
        updateBreadcrumbTitle(carName);
        updateCarTitle(carName);
        updateBreadcrumbMenu(carName);
        updateCarImages(imagePath);
        updateBreadcrumbImage(imagePath);

        // Store in localStorage for persistence
        storeCarInLocalStorage(carName, imagePath);

        // Dispatch custom event for other scripts to listen to
        const event = new CustomEvent('carInventoryUpdated', {
            detail: {
                carName: decodedName,
                carImage: decodedImage
            }
        });
        document.dispatchEvent(event);

        console.log('✓ Dynamic Inventory Updated:', decodedName);
    }

    // ==========================================
    // INITIALIZATION ON PAGE LOAD
    // ==========================================

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDynamicInventory);
    } else {
        // DOM is already loaded
        initializeDynamicInventory();
    }

    // ==========================================
    // EXPOSE PUBLIC API
    // ==========================================

    // Make functions available globally for manual updates if needed
    window.DynamicInventory = {
        updateCar: function(carName, imagePath) {
            updateAllElements(carName, imagePath);
        },
        getParams: getURLParams,
        clearStoredCar: clearStoredCar,
        getStoredCar: getStoredCar
    };

})();
