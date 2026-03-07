# Admin Panel Quick Reference

## 🎮 Using the Admin Panel

### Accessing Pages
All pages are accessible via the sidebar navigation:

```
DASHBOARD              → dashboard.html
├─ Car Management
│  ├─ Manage Cars     → manage-cars.html
│  ├─ Add Car        → add-car.html
│  └─ Categories     → manage-categories.html
├─ Brands & More
│  └─ Brands         → brand-manager.html
├─ Website Content
│  ├─ Sections       → section-manager.html
│  └─ Breadcrumbs    → breadcrumb-manager.html
├─ Media & More
│  ├─ Media Library  → image-manager.html
│  ├─ Footer Manager → footer-manager.html
│  └─ Locations      → map-location-manager.html
└─ Manage
   ├─ SEO Manager    → seo-manager.html
   ├─ Bookings       → booking-manager.html
   └─ Settings       → settings.html
```

---

## 📝 Data Fields by Module

### Cars
- Name, Brand, Category, Price/Day
- Fuel Type, Transmission, Seats
- Description, Thumbnail, Gallery Images

### Brands
- Brand Name, Description, Logo, Breadcrumb Image

### Categories
- Category Name, Description, Image

### Footer
- Address, Phone, Email, Hours
- Social Media Links
- About Section Text & Image
- Footer Links

### SEO
- Page Meta Title (60 chars)
- Meta Description (160 chars)
- Meta Keywords
- OG Title, OG Description, OG Image

### Locations
- Name, Address, Latitude, Longitude
- Phone, Google Maps Link

### Bookings
- Customer Name, Email
- Car Name, Rental Dates
- Total Price, Status

### Settings
- Website Name, Logo, URL
- Admin Profile (Name, Email, Phone, Position)
- Security (Password, 2FA, Sessions)

---

## 🎨 Color Coding

### Status Badges
- **Green** (#48bb78) - Active, Approved, Success
- **Yellow** (#ffc107) - Pending, Warning
- **Red** (#ff6b6b) - Rejected, Danger
- **Blue** (#4dabf7) - Info, Neutral

### Button Types
- **Gold/Primary** (#d4af37) - Main actions (Save, Submit)
- **Gray/Secondary** - Cancel, Secondary actions
- **Red/Danger** - Delete, Reject actions
- **Blue** - View, Preview actions

---

## 🔄 Common Actions

### Adding Items
1. Click "Add [Item]" button
2. Fill modal form
3. Click "Save" or "Add"
4. Dismiss modal or reload page

### Editing Items
1. Click "Edit" button in row/card
2. Modal or page opens with form
3. Update fields
4. Click "Save" button

### Deleting Items
1. Click "Delete" or trash icon
2. Confirm deletion dialog
3. Item removed from list

### Uploading Images
1. Click upload area or button
2. Select file from computer
3. File preview shows
4. Click save/upload to confirm

---

## 🔍 Finding Things

### Search & Filter
- Most tables have search bars
- Booking Manager has status filter
- SEO Manager has page selector
- Media Library has search

### Sorting
- Click column headers to sort
- Toggle between ascending/descending

### Pagination
- Tables show 5-10 items per page
- Next/Previous buttons at bottom
- Jump to page number input

---

## 📱 Mobile Usage

### Desktop
- Full sidebar on left
- Wide content area
- Multi-column layouts

### Tablet
- Adjusted sidebar width
- Stacked card layouts
- Touch-friendly buttons

### Mobile
- Top horizontal navbar
- Stacked content
- Full-width forms
- Large touch targets

---

## 🎯 Most Common Tasks

### Add a New Car
1. Click "Manage Cars" → "Add Car"
2. Enter car details
3. Upload thumbnail image
4. Upload 3-4 gallery images
5. Click "Save Car"

### Edit Car Details
1. Go to "Manage Cars"
2. Find car in table
3. Click "Edit" button
4. Update any field
5. Click "Save Changes"

### Manage Brands
1. Click "Brands"
2. View all brand cards
3. Click "Edit" on card to update
4. Click trash icon to delete
5. Click "+ Add Brand" for new

### Update Footer
1. Click "Footer Manager"
2. Use three tabs:
   - **Footer Content** - Address, contact, hours
   - **About Section** - About text & image
   - **Social Links** - All social media URLs
3. Click "Save Changes"

### Set SEO
1. Click "SEO Manager"
2. Select page from buttons
3. Enter meta title, description, keywords
4. Add OG image & social preview
5. Preview shows at bottom
6. Click "Save SEO Settings"

### Manage Bookings
1. Click "Bookings"
2. View pending/approved/rejected
3. Filter by status or date range
4. Click "Approve" or "Reject" for pending
5. Click "Mark Completed" for approved

---

## 📊 Dashboard KPIs

**On Dashboard you see:**
- Total Cars - Count of all vehicles
- Total Categories - Car type categories
- Total Images - Media library size
- Total Breadcrumbs - Site pages

**Quick Actions** - Buttons to common tasks

**Recent Cars** - Last 5 added cars table

**Activity Log** - Timeline of admin actions

---

## ⚙️ Settings

### Website Settings Tab
- Site name & URL
- Contact email & phone
- Support email & phone
- Upload logo & favicon

### Admin Profile Tab
- Update your profile photo
- Change name, email, phone
- Update position & department

### Security Tab
- Change password (current + new)
- View 2FA status
- See active login sessions
- Logout other devices

---

## 💡 Pro Tips

1. **Use keyboard shortcuts** - Tab to navigate, Enter to submit
2. **Hover for tooltips** - Hover on ? icons for help text
3. **Search is fast** - Use search boxes before scrolling long tables
4. **Mobile friendly** - Admin works great on tablets and phones
5. **Modals are quick** - Fast edits without page reload
6. **Preview before save** - Car preview shows on edit page
7. **Bulk uploads** - Media library accepts multiple images
8. **Character counters** - SEO fields show character limits

---

## 🐛 Troubleshooting

### Page Not Showing
- Check sidebar link is correct
- Clear browser cache (Ctrl+Shift+Delete)
- Reload page (Ctrl+R or F5)

### Form Not Submitting
- Check all required fields are filled
- Look for error message at top
- Try again after fixing errors

### Images Not Uploading
- Check file size (max 5MB)
- Check file type (PNG/JPG only)
- Check internet connection

### Navigation Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Try different browser

---

## 📞 Need Help?

**For API Integration:**
- See `/admin/ADMIN_PANEL_README.md` for detailed API guide

**For Customization:**
- Edit CSS in `/admin/assets/css/admin-style-premium.css`
- Modify navigation in each page's `<nav>` section
- Change text/labels directly in HTML

**For Adding Features:**
- Copy existing page structure
- Modify title & content
- Link in navigation
- Connect to backend

---

**Last Updated:** March 7, 2026
**Admin Panel Version:** 1.0 (Premium Black & Gold)
**Status:** ✅ Production Ready (Frontend)
