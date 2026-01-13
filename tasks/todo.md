# Feature: Simplified Package Arrival + Proof Image

## Overview
Simplify the package arrival flow and add arrival image proof:
1. Remove weight/dimensions from marking items as arrived (they're optional, can be added later)
2. Remove package label printing (no longer needed in this flow)
3. Add arrival image upload - this is the final step to confirm everything arrived
4. The arrival image is sent to the customer as proof their items are at the warehouse

## Current Flow
- Admin marks items arrived → enters weight/dimensions → triggers packages_complete when all arrived
- No image proof exists

## New Flow
- Admin marks items arrived (simple toggle, no weight/dimensions modal)
- When all items are marked arrived, admin uploads ONE arrival image for the whole order
- Uploading the image triggers `packages_complete` status and sends email with the image to customer

---

## Tasks

### Phase 1: Simplify Mark Arrived
- [x] 1. Simplify `AdminOrderModalMarkArrived.vue` - remove weight/dimensions fields, just confirm arrival
- [x] 2. Update order items page bulk action - just mark arrived without extra fields
- [x] 3. Remove package label printing from order items page (dropdown menu + bulk action)
- [x] 4. Remove `AdminPackageLabel` component import from order items page

### Phase 2: Add Arrival Image Upload
- [x] 5. Add arrival image upload section to admin order detail page (`/app/admin/orders/[id]`)
- [x] 6. Show upload UI when all items are arrived but no image yet
- [x] 7. Call API to upload image which triggers `packages_complete` status
- [x] 8. Display the arrival image on admin order detail page after upload

### Phase 3: Customer Experience
- [x] 9. Show arrival image on customer order detail page as proof

---

## Review

### Files Modified

**`components/admin/AdminOrderModalMarkArrived.vue`**
- Simplified to just a confirmation modal (removed weight/dimensions fields)
- Cleaner UI with green checkmark icon

**`pages/app/admin/orders/[id]/items/index.vue`**
- Removed package label printing (dropdown menu + bulk action button)
- Removed AdminPackageLabel component import
- Kept bulk mark arrived functionality

**`pages/app/admin/orders/[id]/index.vue`**
- Added arrival image upload section (shows when all items arrived, no image yet)
- Added arrival image display section (shows uploaded image)
- File input with select/upload flow
- Calls API to upload and trigger packages_complete status

**`pages/app/orders/[id]/index.vue`**
- Added arrival proof image section for customers
- Shows the arrival image with title "Your Packages Have Arrived"

### New Flow Summary

1. **Admin marks items as arrived** - Simple toggle, no weight/dimensions modal
2. **When all items arrived** - Green banner appears prompting admin to upload arrival photo
3. **Admin uploads photo** - Triggers `packages_complete` status + sends email to customer
4. **Customer sees proof** - Arrival image displayed on their order detail page

---

## UI/UX Enhancements

### Tasks
- [x] 10. Add download button for arrival image
- [x] 11. Add fullscreen modal with zoom capability
- [x] 12. Mobile-first design for arrival image section

### Changes Made

**`pages/app/admin/orders/[id]/index.vue`**
- Enhanced arrival image display section with mobile-first design
- Added download button with icon (works on mobile as tap, desktop shows label)
- Added hover overlay with "View fullscreen" indicator
- Added mobile tap indicator (zoom icon in corner)
- Added fullscreen modal with:
  - Dark overlay (95% opacity)
  - Close button (top-right)
  - Download button (top-left)
  - Tap-to-zoom functionality for mobile
  - Smooth transitions
- Added `downloadArrivalImage` function that fetches blob and triggers download
- Added `imageZoomed` state for toggling zoom in fullscreen
- Added translations: `arrivalImageUploaded`, `download`, `viewFullscreen`, `close`

---

## Move Action Button to Header

### Tasks
- [x] 13. Move "next action" button from Quick Actions Bar to header
- [x] 14. Remove Quick Actions Bar ("Etapa Actual") from order detail page

### Changes Made

**`components/admin/AdminOrderHeader.vue`**
- Added `nextAction` prop for dynamic action button
- Added `next-action` emit for button click handling
- Desktop: Action button appears between status badge and menu button
- Mobile: Full-width action button below order info
- Button styling matches the action type (color, icon)

**`pages/app/admin/orders/[id]/index.vue`**
- Added `nextAction` computed property that returns the appropriate button based on:
  - `awaiting_packages` + pending items → Mark All Arrived
  - `packages_complete` + shipping → Consolidate Order
  - `packages_complete` + crossing → Start Processing
  - `processing/paid` + shipping → Ship Order
  - `processing/paid` + crossing → Mark Ready for Pickup
  - `shipped` + shipping → Mark as Delivered
  - `shipped` + crossing + paid → Mark as Picked Up
- Added `handleNextAction` function to handle button clicks
- Added SVG icons object for action buttons
- Removed entire Quick Actions Bar ("Etapa Actual" section)

### Result
- Cleaner UI with less vertical space used
- Action button is always visible in the sticky header
- Mobile-friendly with full-width button
- Status is already shown in header badge, no need for duplicate info
