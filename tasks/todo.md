# Feature: Order Consolidation

## Overview
Allow admins to consolidate multiple orders from the same user into a single order. This fixes the issue where users create multiple orders instead of adding all items to one order.

## Requirements
- Orders must belong to the same user (user_id) to be consolidated
- All items from selected orders get merged into the target order
- Source orders are deleted after consolidation
- The order with the furthest status becomes the target (e.g., delivered > shipped > paid > awaiting_packages)

## Status Priority (furthest wins)
1. `delivered` (highest)
2. `shipped`
3. `paid`
4. `processing`
5. `awaiting_payment`
6. `packages_complete`
7. `awaiting_packages` (lowest)

---

## API Tasks

- [ ] 1. Create `POST /admin/orders/consolidate` endpoint in AdminOrderController
  - Accepts: `order_ids[]` (array of order IDs to consolidate)
  - Validates all orders belong to same user
  - Auto-selects target order based on furthest status
  - Moves all items from source orders to target order
  - Deletes source orders
  - Returns updated target order with items

- [ ] 2. Add route in api.php

---

## Frontend Tasks

- [ ] 3. Add checkbox selection to admin orders list
  - Add checkbox column to orders table
  - Track selected order IDs in state
  - Show selection count in header

- [ ] 4. Add "Consolidate Orders" button in header
  - Only visible when 2+ orders selected
  - Validate orders are from same user before enabling

- [ ] 5. Create `AdminOrderModalConsolidate.vue` component
  - Show selected orders summary (order number, items count, user)
  - Let admin choose which order to keep as target (radio buttons)
  - Show warning about what will happen
  - Confirm/Cancel buttons
  - Call API on confirm

- [ ] 6. Handle consolidation response
  - Show success toast
  - Refresh orders list
  - Clear selection

---

## Review

### Files Modified

**`pages/app/admin/orders/index.vue`**
- Added merge orders state: `showMergeModal`, `mergingOrders`
- Added computed properties: `canMergeOrders` (validates same user), `selectedOrdersData`
- Added translations for merge feature (mergeOrders, merging, confirmMerge, etc.)
- Added "Merge Orders" button to both mobile and desktop bulk actions bars
- Added merge confirmation modal showing selected orders with status badges
- Added `mergeOrders()` function that calls the API endpoint

### How It Works
1. Admin selects 2+ orders using checkboxes
2. If all selected orders belong to the same user, "Merge Orders" button appears
3. Clicking the button shows a modal with the selected orders
4. On confirm, API merges all items into the order with the furthest status
5. Source orders are deleted, list is refreshed
