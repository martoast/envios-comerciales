# Fix Admin Orders Back Button Navigation

## Problem
When clicking the back button in order details page, it goes back to the edit page instead of the orders index with filters preserved. This happens because `router.back()` follows browser history.

## Solution
Replace `router.back()` with explicit navigation to `/app/admin/orders` while preserving the filter state. We use sessionStorage to store the orders index URL (including query params) when on the orders list page, then use that URL for the back button.

## Tasks
- [x] 1. Create a composable `useOrdersReturnUrl` to manage storing/retrieving the return URL
- [x] 2. Update `AdminOrderHeader.vue` to use the stored URL instead of `router.back()`
- [x] 3. Update orders index page to store the current URL when filters change

## Files Modified
1. `composables/useOrdersReturnUrl.ts` (new)
   - Simple composable using sessionStorage to store/retrieve return URL
2. `components/admin/AdminOrderHeader.vue`
   - Changed `goBack()` from `router.back()` to `router.push(getReturnUrl())`
3. `pages/app/admin/orders/index.vue`
   - Added watcher on route.fullPath to store URL whenever filters change

## Review
All changes are minimal and focused:
- New composable: ~25 lines
- AdminOrderHeader: 2 lines changed
- Orders index: 5 lines added
- Uses sessionStorage so URL persists only for current session
- Watcher with `immediate: true` ensures URL is stored on page load and whenever filters change
