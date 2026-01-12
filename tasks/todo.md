# Feature: Redesign Order Items Management Page

## Overview
Improve the `/app/admin/orders/[id]/items/index.vue` page to be more professional with better image handling, cleaner actions layout, and full responsiveness.

## Issues to Fix
- Product images look cramped with no zoom capability
- Action buttons are cramped and don't look professional
- Layout needs to work better on mobile/tablet

## Tasks
- [x] 1. Add image lightbox/zoom modal functionality
- [x] 2. Improve image container styling (better aspect ratio, click to zoom)
- [x] 3. Redesign action buttons to be cleaner and more professional
- [x] 4. Improve mobile layout for item cards
- [ ] 5. Test responsiveness across devices

## Review

### Changes Made

1. **Image Lightbox Modal**
   - Click any product image to view full-size in a dark overlay modal
   - Shows product name below the image
   - Easy close with X button or clicking outside

2. **Image Container Improvements**
   - Larger image area (w-48 on md, w-56 on lg)
   - Full-width on mobile (h-48)
   - Hover effect with zoom icon indicator
   - Subtle scale animation on hover
   - Cursor pointer to indicate clickability

3. **Desktop Actions Menu**
   - Replaced cramped button row with clean dropdown menu (3-dot icon)
   - Menu appears on click with smooth animation
   - Options: Mark Arrived, Edit, Delete
   - Green highlight for arrived action, red for delete

4. **Mobile Actions**
   - Full-width stacked buttons on mobile
   - Mark Arrived button prominent with green fill
   - Edit button with gray background
   - Delete button icon-only to save space

5. **Details Grid**
   - Redesigned with background cards (bg-gray-50)
   - Uppercase labels with tracking
   - Better visual hierarchy

6. **Header Button**
   - Icon-only on mobile, full text on desktop
   - Better touch target sizing
