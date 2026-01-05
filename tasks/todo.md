# Current Task: Add full_address Support to Order Creation and Display

## Goal
1. Allow users to create orders using either `full_address` or individual fields
2. Display the address in the orders list

## Tasks
- [x] Add full_address toggle to orders/create.vue
- [x] Update form validation for full_address mode
- [x] Update handleCreateOrder for full_address
- [x] Load full_address in fetchUserProfile
- [x] Show address in orders/index.vue list

---

## Review

### Changes Made

**1. `pages/app/orders/create.vue`**

- Added `useFullAddress` toggle state
- Added `full_address` field to the form's delivery_address object
- Added translations for the toggle and full address mode
- Added Address Mode Toggle UI with header and switch button
- Added conditional rendering:
  - Full address mode: Shows a textarea for the complete address + save checkbox
  - Individual fields mode: Shows the existing DeliveryAddressStep component
- Updated `isFormValid` to validate based on selected mode
- Updated `handleCreateOrder` to send appropriate data based on mode
- Updated `fetchUserProfile` to load `full_address` and auto-select the right mode

**2. `pages/app/orders/index.vue`**

- Added translations for address display (address, noAddress, crossingPickup)
- Added `formatAddress` helper function that:
  - Shows "Pickup in Tijuana" for crossing orders
  - Shows truncated full_address for full address mode
  - Shows municipio, estado for individual fields mode
  - Shows "No address" when empty
- Added Address column to the desktop table
- Added address display to mobile cards

### Summary
Users can now:
1. Toggle between "Full address" and "Individual fields" modes when creating an order
2. Enter a complete address as a single string or use the detailed fields
3. Save their preferred address format to their profile
4. See the delivery address in the orders list (both desktop and mobile views)

The system auto-detects which mode to use based on the user's saved address data.

---

# Current Task: Add Weight Fields to Admin Order Pages

## Goal
Display `total_box_weight` (auto-calculated) and allow editing `actual_weight` in admin order pages

## Tasks
- [x] Add `actual_weight` to form object in edit.vue
- [x] Add `calculatedBoxWeight` computed property
- [x] Update form population to load `actual_weight`
- [x] Update submit logic to send `actual_weight`
- [x] Add weight fields display to details page (index.vue)

---

## Review

### Changes Made

**1. `pages/app/admin/orders/[id]/edit.vue`**

- Added `actual_weight` to the form object
- Added `calculatedBoxWeight` computed property (sums weights from all boxes)
- Added `actual_weight` to form population from order data
- Added `actual_weight` to submit logic (sends when changed)
- Weight section now displays 3 columns:
  - Total Box Weight (auto-calculated, read-only)
  - Total Weight (manual override)
  - Actual Weight (manual override)

**2. `pages/app/admin/orders/[id]/index.vue`**

- Added 3 weight fields to the order summary section:
  - Box Weight (`total_box_weight`)
  - Total Weight (`total_weight`)
  - Actual Weight (`actual_weight`)
- Added translations for `totalBoxWeight` and `actualWeight`

### Summary
Admins can now:
1. See the auto-calculated box weight (sum of all box weights)
2. Edit the total weight as a manual override
3. See both weight values on the order details page

---

# Current Task: Update Shipping Label & Remove actual_weight

## Goal
1. Update shipping label to show box dimensions and weight
2. Remove unused `actual_weight` field from admin order pages

## Tasks
- [x] Update AdminOrderShippingLabel.vue to show box details with dimensions and weight
- [x] Remove `actual_weight` from admin order edit page (form, population, submit, UI, translations)
- [x] Remove `actual_weight` from admin order details page (UI, translations)

---

## Review

### Changes Made

**1. `components/admin/AdminOrderShippingLabel.vue`**

- Changed box display from simple count to detailed list
- Each box now shows: name, dimensions (L×W×H cm), and weight (kg)
- Added `hasBoxes` computed property and `formatBoxDetails()` function
- Updated both preview and print HTML/CSS to display box details

**2. `pages/app/admin/orders/[id]/edit.vue`**

- Removed `actual_weight` from form object
- Removed from form population
- Removed from submit logic
- Removed from UI (changed from 3-column to 2-column layout)
- Removed `actualWeightLabel` translation

**3. `pages/app/admin/orders/[id]/index.vue`**

- Removed `actual_weight` display
- Removed `actualWeight` translation

### Summary
- Shipping labels now show complete box info (name, dimensions, weight) instead of just box type
- Removed unused `actual_weight` field throughout admin order pages
- Weight section simplified to show only Box Weight (auto-calculated) and Total Weight (manual)

---

# Current Task: Simplify Purchase Request Edit Form

## Goal
The API now auto-calculates `processing_fee` as `total_amount - items_total`. Update the edit form and display page to match.

## Tasks
- [x] Edit page: Remove shipping_cost, sales_tax, processing_fee input fields
- [x] Edit page: Keep only items_total and total_amount as editable
- [x] Edit page: Show processing_fee as computed display-only value
- [x] Edit page: Update form data and submission
- [x] Index page: Simplify financials to show items_total, fee, total

## Technical Notes
- `processing_fee = total_amount - items_total` (auto-calculated by backend)
- Only send `items_total` and `total_amount` in PUT request

---

## Review

### Changes Made

**1. `pages/app/admin/purchase-requests/[id]/edit.vue`**
- Removed `shipping_cost`, `sales_tax`, `processing_fee` from form object
- Removed those input fields from the template
- Added `calculatedFee` computed property (total - items)
- Added display-only fee section showing auto-calculated value
- Added translations: `autoCalculated`, `feeHint`
- Removed unused translations: `shippingCost`, `salesTax`

**2. `pages/app/admin/purchase-requests/[id]/index.vue`**
- Simplified financials breakdown to show only: Merchandise, Fee, Total
- Removed shipping_cost, sales_tax, subtotal line items
- Removed unused translations: `shippingToWarehouse`, `salesTax`

### Summary
The edit form now only has two editable financial fields (items_total, total_amount), and the fee is shown as auto-calculated (total - items). The display page shows a cleaner breakdown with just merchandise, fee, and total.

---

## UX Improvements (Follow-up)

### Changes Made

**1. `pages/app/admin/purchase-requests/[id]/edit.vue`**
- Renamed labels for clarity:
  - "Items Total" → "Your Cost" (with hint: includes items + shipping + taxes)
  - "Total" → "Customer Pays"
  - "Fee" → "Your Margin"
- Added `+ 8%` button to quickly apply standard margin
- Added `marginPercent` computed to show percentage
- Added color-coded margin display (red <5%, yellow <8%, green ≥8%)

**2. `pages/app/admin/purchase-requests/[id]/index.vue`**
- Updated financials display with same terminology
- Added margin percentage display
- Color changed to green for profit line

### Summary
The UI now clearly communicates: "Your Cost" (what you pay) vs "Customer Pays" (what they pay) with "Your Margin" showing both $ and % profit. Quick +8% button makes applying standard markup instant.
