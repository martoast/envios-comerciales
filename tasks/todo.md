# Add Filter Preservation & Back Navigation to Admin Pages

## Problem
When admins search/filter on list pages and click into a detail page, clicking back loses their filters. We need consistent UX across all main admin pages.

## Solution
1. Make the return URL composable generic (accept a key parameter)
2. Add URL query param persistence to index pages (so filters are in URL)
3. Store the current URL when on index pages
4. Use stored URL for back navigation in detail pages

## Pages Updated
- [x] Orders
- [x] Customers
- [x] Packages

## Tasks
- [x] 1. Update `useOrdersReturnUrl` composable to be generic `useListReturnUrl(key)`
- [x] 2. Update orders page to use new composable pattern
- [x] 3. Add URL param persistence to customers index page
- [x] 4. Update customers detail page back button to use composable
- [x] 5. Add URL param persistence to packages index page
- [x] 6. Update packages detail page back button to use composable
- [x] 7. Commit and push changes

## Files Modified
1. `composables/useListReturnUrl.ts` (new, replaces useOrdersReturnUrl.ts)
   - Generic composable that accepts a key ('orders', 'customers', 'packages')
   - Uses sessionStorage with key-specific storage keys
2. `composables/useOrdersReturnUrl.ts` (deleted)
3. `components/admin/AdminOrderHeader.vue`
   - Updated to use `useListReturnUrl('orders')`
4. `pages/app/admin/orders/index.vue`
   - Updated to use `useListReturnUrl('orders')`
5. `pages/app/admin/customers/index.vue`
   - Added router, route, and composable imports
   - Added `updateQueryParams()` and `initFiltersFromQuery()` functions
   - Updated watchers to persist filters to URL
   - Added route watcher to store return URL
6. `pages/app/admin/customers/[id]/index.vue`
   - Added composable and `goBack()` function
   - Changed NuxtLink to button with @click="goBack"
7. `pages/app/admin/packages/index.vue`
   - Added router, route, and composable imports
   - Added `updateQueryParams()` and `initFiltersFromQuery()` functions
   - Updated watchers to persist filters to URL
   - Added route watcher to store return URL
8. `pages/app/admin/packages/[id]/index.vue`
   - Added composable and `goBack()` function
   - Changed NuxtLink to button with @click="goBack"

## Review
All changes follow the same pattern:
- Index pages: Store filters in URL query params + store full URL in sessionStorage
- Detail pages: Use stored URL for back button navigation
- Consistent UX across orders, customers, and packages admin sections
