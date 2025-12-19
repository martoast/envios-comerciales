# Current Task: Make Admin Affiliate Details Page Responsive

## Goal
Update the affiliate details page (`pages/app/admin/affiliates/[id]/index.vue`) to follow the same responsive, mobile-first design patterns used in the orders page (`pages/app/admin/orders/[id]/index.vue`).

## Issues Identified
1. **Header buttons don't wrap** - Edit and Record Payout buttons overflow on mobile
2. **Header layout issues** - Title and buttons clash on small screens
3. **Tab navigation** - Needs horizontal scroll on mobile with smaller text
4. **Tables not mobile-friendly** - Need card view on mobile, table on desktop

## Plan

- [x] Fix header to stack vertically on mobile, inline on desktop
- [x] Add `flex-wrap` to action buttons and make them full-width on mobile
- [x] Make tab navigation horizontally scrollable with smaller touch targets on mobile
- [x] Convert tables to mobile-friendly card layout (hidden table, show cards on mobile)
- [x] Add responsive text sizes (`text-base sm:text-lg`, `text-xs sm:text-sm`)
- [x] Ensure all padding uses responsive values (`p-4 sm:p-6`)

---

## Review

### Changes Made

**Header Section:**
- Changed layout from `flex items-center justify-between` to `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`
- Header now stacks vertically on mobile, inline on desktop
- Added `flex-wrap` to action buttons container
- Made buttons use `flex-1 sm:flex-none` to grow on mobile, natural width on desktop
- Added shorter "Payout" text for mobile with `hidden xs:inline` pattern
- Added `min-w-0` and `truncate` to prevent text overflow

**Affiliate Info Card:**
- Updated grid to `grid-cols-1 md:grid-cols-2` for proper mobile stacking
- Made avatar smaller on mobile: `w-12 h-12 sm:w-16 sm:h-16`
- Added responsive text sizes: `text-lg sm:text-xl`, `text-xs sm:text-sm`
- Made code/link input boxes responsive with `text-xs sm:text-sm`
- Added `min-w-0` to prevent referral link overflow

**Stats Cards:**
- Changed grid to `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- Updated pending payout card to span correctly: `col-span-2 sm:col-span-3 lg:col-span-1`
- Made padding responsive: `p-3 sm:p-4`
- Made text responsive: `text-xs sm:text-sm` for labels, `text-xl sm:text-2xl` for values

**Tab Navigation:**
- Added `overflow-x-auto` for horizontal scroll on mobile
- Added `min-w-max` to prevent wrapping
- Made padding responsive: `px-4 sm:px-6 py-3 sm:py-4`
- Made text responsive: `text-xs sm:text-sm`
- Added `whitespace-nowrap` to prevent text wrapping

**Tab Content (Tables):**
- Added responsive padding: `p-4 sm:p-6`
- Added mobile card view for Conversions (`sm:hidden`)
- Added mobile card view for Payouts (`sm:hidden`)
- Desktop tables hidden on mobile with `hidden sm:block`
- Cards show order/conversion info in a clean, touch-friendly format

**Translations:**
- Added `payout: { es: 'Pago', en: 'Payout' }` for short button text on mobile

### Summary
The affiliate details page now follows the same responsive patterns as the orders page:
- Mobile-first approach with proper stacking and spacing
- Card-based layouts for tables on mobile
- Horizontally scrollable tabs
- Responsive text and padding throughout
- All content remains usable and readable on small screens
