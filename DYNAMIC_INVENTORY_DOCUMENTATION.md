# Dynamic Car Inventory System - Documentation

## Overview
A complete dynamic inventory system for the Apex Performance Car Rental website that allows users to click on any car card and have the single-inventory page automatically update with that car's details.

## How It Works

### 1. **Car Cards on Listing Pages**
When you click on any car card on pages like `index.html`, `luxury-cars.html`, `sports-cars.html`, `convertible-cars.html`, or `suv-cars.html`, it automatically:
- Creates a dynamic URL with the car name and image path as parameters
- Navigates to `single-inventory.html`

### 2. **Automatic URL Parameters**
Each car card is wrapped with a link that passes data:
```
single-inventory.html?car=Car+Name&img=path/to/image.jpg
```

**Example URLs:**
- `single-inventory.html?car=Lamborghini+Performante+Green&img=assets/cars/oragne.webp`
- `single-inventory.html?car=Mercedes+G63+AMG+Black&img=assets/cars/gw01.webp`
- `single-inventory.html?car=Rolls+Royce+Ghost+White&img=assets/cars/white.webp`

### 3. **Single-Inventory Page Updates**
On `single-inventory.html`, the `dynamic-inventory.js` script automatically:
- ✅ Extracts URL parameters
- ✅ Updates the page title (browser tab)
- ✅ Updates the breadcrumb title
- ✅ Updates the main car title
- ✅ Updates the car images in the gallery
- ✅ Updates the breadcrumb background image
- ✅ Stores data in localStorage for persistence

## JavaScript Files Involved

### 1. **assets/js/car-card-linker.js**
- Runs on all car listing pages (index.html, luxury-cars.html, etc.)
- Automatically wraps each `.carousel-car-card` with an anchor link
- Extracts car name from `.car-title` element
- Extracts car image from `.car-image` src attribute
- Creates proper URL with encoded parameters
- Prevents default button click propagation for phone/WhatsApp buttons

### 2. **assets/js/dynamic-inventory.js**
- Runs on `single-inventory.html`
- Reads URL parameters using `URLSearchParams`
- Updates all relevant DOM elements:
  - `#car-hero-image` (breadcrumb background)
  - `#car-breadcrumb-title` (breadcrumb text)
  - `#car-title` (main title)
  - `#car-gallery` (car images)
  - `.breadcumb-menu` (breadcrumb menu)
  - `document.title` (page title)
- Stores car data in browser localStorage
- Dispatches custom event for other scripts to listen to
- Provides public API via `window.DynamicInventory`

## Features

### ✅ Full Coverage
- Works with all car cards across all pages
- No manual link creation needed
- Automatic extraction of car details

### ✅ URL Parameter Based
- Clean, shareable URLs
- Bookmarkable pages
- Proper URL encoding

### ✅ Data Persistence
- Stores selected car in localStorage
- Falls back to localStorage if no URL parameters
- Survives browser refresh

### ✅ Responsive Design
- Works on desktop, tablet, and mobile
- Phone and WhatsApp buttons still functional
- All images properly loaded

### ✅ Fallback Values
- Default car name: "Luxury Car"
- Default image: "assets/img/featured/single-inventory-gal-3.jpg"
- Shows defaults if no parameters provided

## Usage Examples

### Manual URL Creation (if needed)
You can manually create URLs like:
```html
<a href="single-inventory.html?car=Ferrari+F8+Tributo+Red&img=assets/cars/red.webp">
    View Car
</a>
```

### Using the Public API
You can update the inventory page programmatically:
```javascript
// Update with new car details
DynamicInventory.updateCar('BMW M5', 'assets/cars/bmw-m5.webp');

// Get current parameters
const params = DynamicInventory.getParams();
console.log(params.car); // Car name
console.log(params.img); // Car image

// Get stored car data
const stored = DynamicInventory.getStoredCar();

// Clear stored data
DynamicInventory.clearStoredCar();
```

### Listening to Events
```javascript
document.addEventListener('carInventoryUpdated', function(e) {
    console.log('Car updated:', e.detail.carName);
    console.log('Image:', e.detail.carImage);
});
```

## Files Modified

### Created:
1. `assets/js/dynamic-inventory.js` - Main dynamic update system
2. `assets/js/car-card-linker.js` - Auto-link wrapper for cards

### Updated:
1. `single-inventory.html` - Added script reference
2. `index.html` - Added script reference
3. `luxury-cars.html` - Added script reference
4. `convertible-cars.html` - Added script reference
5. `sports-cars.html` - Added script reference
6. `suv-cars.html` - Added script reference
7. `cars.html` - Added script reference

## How to Test

### Test 1: Click a Car Card
1. Open `index.html` or any listing page
2. Click on any car card in a carousel
3. You should be redirected to `single-inventory.html` with the car details updated

### Test 2: Direct URL Access
1. Open browser and visit:
   ```
   single-inventory.html?car=Lamborghini+Performante+Green&img=assets/cars/oragne.webp
   ```
2. Page should update with Lamborghini details automatically

### Test 3: Page Persistence
1. Click a car card and go to its detail page
2. Refresh the page (F5 or Ctrl+R)
3. Details should persist (stored in localStorage)

### Test 4: Custom Car
1. Open browser console
2. Type: `DynamicInventory.updateCar('My Custom Car', 'assets/cars/custom.webp')`
3. Page updates immediately

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- JavaScript enabled
- localStorage support (for persistence)
- ES6+ support (modern browsers)

## URL Parameter Encoding

The system properly handles:
- Car names with spaces (converted to `+`)
- Special characters (URL encoded)
- Special symbols in car names
- Image paths with folders

**Example:** 
- Car: `Mercedes-AMG GLE63 Red` 
- URL encodes to: `Mercedes-AMG+GLE63+Red`
- Properly decoded on single-inventory page

## Troubleshooting

### Issue: Car card links not working
**Solution:** Ensure `car-card-linker.js` is loaded. Check browser console for errors.

### Issue: Page not updating with URL parameters
**Solution:** Ensure `dynamic-inventory.js` is loaded on `single-inventory.html`. Check console logs.

### Issue: Images not showing
**Solution:** Verify image paths in car cards are correct. Images must be properly referenced.

### Issue: Phone/WhatsApp buttons not working
**Solution:** These have `event.stopPropagation()` to prevent card click. Should work independently.

## Best Practices

1. **Always use proper car names** that match display names
2. **Use consistent image paths** across your site
3. **Test URLs before sharing** to ensure parameters work
4. **Keep image files accessible** to ensure gallery updates properly
5. **Monitor localStorage** for data size (usually not an issue for single entries)

## Future Enhancements

Potential improvements:
- Add car price parameter and display dynamically
- Add multiple images parameter support
- Add car specifications to URL
- Create QR codes with dynamic car URLs
- Add analytics tracking for car views
- Integrate with car database/API

## Support

For issues or questions about the Dynamic Inventory System:
1. Check console for error messages
2. Verify all JavaScript files are loading
3. Ensure proper image paths in car cards
4. Test with different browsers

---

**System Status:** ✅ Active and Functional

**Last Updated:** March 7, 2026

**Version:** 1.0
