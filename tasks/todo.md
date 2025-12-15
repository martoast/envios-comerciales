# Task: Persist Filters as URL Query Params

## Problem
When users filter orders in the admin orders list, then click into an order detail, and click back - the filters are lost.

## Solution
Store filter values as URL query params so that:
1. Filters persist in the URL (e.g., `/app/admin/orders?status=paid&search=john`)
2. When user navigates back, the URL still has the params
3. On page load, read filters from URL query params

## Changes Required

### File: `pages/app/admin/orders/index.vue`

- [x] Read filters from URL query params on mount (`useRoute().query`)
- [x] Update URL query params when filters change (using `router.replace()`)
- [x] Handle: `status`, `search`, `from_date`, `to_date`, `per_page`, `page`

### File: `components/admin/AdminOrderHeader.vue`

- [x] Change back button from hardcoded `/app/admin/orders` to use `router.back()` with fallback

---

## Review

### Changes Made

**File 1:** `pages/app/admin/orders/index.vue`

1. Added `route = useRoute()` to read query params
2. Added `updateQueryParams()` function that syncs current filters to URL
3. Added `initFiltersFromQuery()` function that reads filters from URL on mount
4. Updated `onMounted()` to initialize filters from URL before fetching
5. Updated all filter watchers and functions to call `updateQueryParams()`:
   - `statusFilter` watcher
   - `perPage` watcher
   - `searchQuery` watcher (debounced)
   - `changePage()`
   - `clearFilters()`
   - `applyDatePreset()`
   - `applyCustomDateRange()`
   - `clearDateRange()`
   - `applyMobileFilters()`

**File 2:** `components/admin/AdminOrderHeader.vue`

1. Added `router = useRouter()` and `goBack()` function
2. Changed mobile back button from `<NuxtLink to="/app/admin/orders">` to `<button @click="goBack">`
3. Changed desktop back button from `<NuxtLink to="/app/admin/orders">` to `<button @click="goBack">`

### How It Works Now

1. User filters orders (e.g., status=paid) → URL updates to `/app/admin/orders?status=paid`
2. User clicks an order → navigates to `/app/admin/orders/123`
3. User clicks back button → `router.back()` returns to `/app/admin/orders?status=paid`
4. Filters are restored from URL query params
