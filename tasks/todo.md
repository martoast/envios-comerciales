# Task: Add "No Orders" Filter + CSV Export to Admin Customers Page

## Goal
1. Add a checkbox filter to show only customers who have **zero orders** (never placed any order)
2. Add CSV export functionality with current filters applied

## Plan

### Backend Changes
- [x] Add `no_orders` filter parameter to `AdminCustomerController.php` index method
- [x] Add `/admin/customers/export` endpoint for CSV export

### Frontend Changes
- [x] Add `noOrders` state variable in `index.vue`
- [x] Add checkbox UI element for the "no orders" filter
- [x] Pass `no_orders` parameter in API call
- [x] Update `clearFilters()` to reset `noOrders`
- [x] Add watcher for `noOrders` to trigger fetch
- [x] Add export button (mobile + desktop)
- [x] Add `exportCustomers()` function
- [x] Add translations for new features (Spanish/English)

## Files Modified
1. `/Users/alex/Documents/erick/boxly/boxly-api/app/Http/Controllers/AdminCustomerController.php`
   - Added `no_orders` filter using `doesntHave('orders')`
   - Added `export()` method for CSV download
2. `/Users/alex/Documents/erick/boxly/boxly-api/routes/api.php`
   - Added route for `/admin/customers/export`
3. `/Users/alex/Documents/erick/boxly/app/pages/app/admin/customers/index.vue`
   - Added `noOrders` state + checkbox filter
   - Added export button in header (mobile + desktop)
   - Added `exportCustomers()` function
   - Added translations: `showNoOrders`, `exportCsv`

## Review
All changes are minimal and focused:
- Backend: ~25 lines added for filter + export endpoint
- Frontend: ~50 lines added for checkbox, button, function, translations
- Export uses same filters as the list view (search, active_only, no_orders)
- CSV includes: Name, Email, Phone, Orders count, Active Orders count, Join date
