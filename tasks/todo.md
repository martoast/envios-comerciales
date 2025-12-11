# Frontend Updates for New Consolidation Flow

## Overview

The business flow has changed. Previously, when shipping an order, we collected a 50% deposit at ship time and the remaining 50% after delivery. Now, we consolidate orders first (selecting boxes and invoicing 100%) BEFORE shipping.

### Old Flow (SHIPPING orders):
```
awaiting_packages � packages_complete � processing � shipped � delivered � awaiting_payment � paid
                    (Start Processing)  (Ship + 50%    (Mark      (Final 50%
                                        deposit)       Delivered)  Invoice)
```

### New Flow (SHIPPING orders):
```
awaiting_packages � packages_complete � awaiting_payment � processing � shipped � delivered � paid
                    (Consolidate +      (User pays via     (Ship with   (Mark
                     100% invoice)       Stripe)            gu�as/GIAs)  Delivered)
```

## Understanding the Changes

### API Changes Made (Backend):
1. **New endpoint**: `POST /admin/orders/{order}/consolidate`
   - Input: `{ boxes: [{ stripe_price_id, quantity }] }`
   - Creates OrderBox entries
   - Creates Stripe invoice for 100% box price (type: `box_payment`)
   - Updates order status to `awaiting_payment`
   - Sends `OrderConsolidatedInvoice` email

2. **Modified endpoint**: `POST /admin/orders/{order}/ship`
   - Input: `{ boxes: [{ box_id, guia_number, gia_file }], estimated_delivery_date }`
   - Now expects EXISTING box IDs (from consolidation step)
   - Just adds gu�as and GIA files to existing boxes
   - Updates status to `shipped` (or `paid` for crossing)

3. **New Order fields**:
   - `consolidation_invoice_id` - Stripe invoice ID
   - `consolidation_payment_link` - Stripe hosted invoice URL
   - `consolidation_paid_at` - When user paid

4. **Webhook handles** `type='box_payment'` invoices

---

## Todo List

### Phase 1: Create New Consolidate Modal
- [ ] Create `AdminOrderModalConsolidate.vue`
  - Similar to `AdminOrderModalReadyForPickup.vue` (100% payment)
  - Box selection: stripe_price_id + quantity (like ReadyForPickup)
  - Show total price (100%)
  - Call `POST /admin/orders/{order}/consolidate`
  - Success message and close

### Phase 2: Modify Ship Order Modal
- [ ] Update `AdminOrderModalShipOrder.vue`
  - Remove box selection dropdown (boxes already exist)
  - Fetch existing boxes from `order.boxes`
  - For each box, show: box name/size, input for gu�a number, file input for GIA
  - Keep estimated delivery date
  - Update API call: `{ boxes: [{ box_id, guia_number, gia_file }], estimated_delivery_date }`
  - Update validation: each box needs gu�a (10+ chars) and GIA file
  - Remove deposit price display

### Phase 3: Update Order Detail Page
- [ ] Update `pages/app/admin/orders/[id]/index.vue`
  - **At `packages_complete` status (SHIPPING orders)**:
    - Remove "Start Processing" button
    - Add "Consolidate Order" button � opens new consolidate modal
  - **At `awaiting_payment` status (SHIPPING orders)**:
    - Show "Awaiting Payment" indicator with payment link
    - Show "Mark Paid" button for manual override
  - **At `processing` status (SHIPPING orders)**:
    - "Ship Order" button (same, but modal now just adds gu�as)
  - **Add consolidation payment display**:
    - Show `consolidation_payment_link` if exists
    - Show `consolidation_paid_at` timestamp
  - **Import and register the new consolidate modal**

### Phase 4: Cleanup & Polish
- [ ] Update translations for new flow
  - New: `consolidateOrder`, `consolidateOrderTitle`, `consolidationInvoiceSent`
  - Change "Ship (50% Deposit)" to just "Ship Order"
- [ ] Update button labels in order detail page
- [ ] Test the complete flow

---

## Files to Modify

| File | Changes |
|------|---------|
| `components/admin/AdminOrderModalConsolidate.vue` | **NEW** - Consolidation modal |
| `components/admin/AdminOrderModalShipOrder.vue` | Remove box selection, use existing boxes |
| `pages/app/admin/orders/[id]/index.vue` | New modal import, change button at `packages_complete`, add `awaiting_payment` handling |

## Files NOT to Modify

| File | Reason |
|------|--------|
| `AdminOrderModalReadyForPickup.vue` | Crossing orders work differently, keep as-is |
| `AdminOrderModalStartProcessing.vue` | Can keep for backwards compatibility, just won't be used |
| `useOrderStatus.js` | Already has `awaiting_payment` status |

---

## Implementation Notes

### AdminOrderModalConsolidate.vue
- Copy structure from `AdminOrderModalReadyForPickup.vue`
- Use `shippingProducts` filter (where `shipping === true`)
- Call `/admin/orders/{order}/consolidate` instead of `/ship`
- Change text/translations for consolidation context

### AdminOrderModalShipOrder.vue Changes
Key changes:
1. Remove `fetchProducts()` - no longer selecting box sizes
2. Add: Receive `order.boxes` prop, display each box
3. Change form to: `{ boxes: [{ box_id, guia_number, gia_file }], estimated_delivery_date }`
4. Remove price display section
5. Update validation

### Order Detail Page Changes
1. Import `AdminOrderModalConsolidate`
2. Add `showConsolidateModal` ref
3. Change `packages_complete` button (SHIPPING only) from StartProcessing to Consolidate
4. Add `awaiting_payment` display for SHIPPING orders (similar to crossing flow)
5. Add consolidation payment info display in financials section

---

## Review Section

### Implementation Complete - December 8, 2025

All tasks have been completed. Here's a summary of the changes made:

#### 1. Created `AdminOrderModalConsolidate.vue` (NEW FILE)
- Purple-themed modal for consolidating SHIPPING orders
- Box selection with stripe_price_id and quantity
- Shows 100% invoice amount (no deposit)
- Calls `POST /admin/orders/{order}/consolidate`
- Bilingual (ES/EN) translations

#### 2. Updated `AdminOrderModalShipOrder.vue`
- Removed box selection dropdown (boxes now come from consolidation)
- Displays existing boxes from `order.boxes`
- For each box: shows name/price, inputs for guia_number and GIA file
- Simplified API call: `{ boxes: [{ box_id, guia_number, gia_file }], estimated_delivery_date }`
- Removed price/deposit display
- Updated translations

#### 3. Updated `pages/app/admin/orders/[id]/index.vue`
- **Imports**: Added `AdminOrderModalConsolidate`
- **State**: Added `showConsolidateModal` ref
- **Quick Actions Bar**:
  - SHIPPING + `packages_complete`: Shows "Consolidate Order" button (purple)
  - CROSSING + `packages_complete`: Keeps "Start Processing" button
  - SHIPPING + `awaiting_payment`: Shows status indicator with payment link + manual "Mark Paid" button
- **Financials Section**:
  - Added consolidation payment display (purple theme) showing 100% payment status
  - Legacy deposit section only shows for old orders without consolidation_payment_link
- **Modal Registration**: Added `AdminOrderModalConsolidate` component
- **Handler**: Updated `handleModalSuccess` to close consolidate modal
- **Translations**: Added `consolidateOrder`, `awaitingConsolidationPayment`, `viewInvoice`, `consolidationPayment`
- **Button Label**: Changed "Ship (50% Deposit)" to "Ship Order"

### Backward Compatibility
- Old orders with `deposit_amount` and no `consolidation_payment_link` will still show the legacy 50% deposit flow
- `AdminOrderModalStartProcessing.vue` kept for CROSSING orders
- Crossing orders flow unchanged (still use ReadyForPickup modal with 100% payment)

### New Order Flow (SHIPPING)
```
packages_complete → [Consolidate Order] → awaiting_payment → [User Pays] → processing → [Ship Order] → shipped
```

---

### Additional Update: Edit Page (December 8, 2025)

#### 4. Updated `pages/app/admin/orders/[id]/edit.vue`
- **Form Fields**: Added `consolidation_payment_link` and `consolidation_paid_at`
- **Computed**: Added `isNewConsolidationFlow` to detect new flow orders
- **Payment Links Section**:
  - New flow (SHIPPING with consolidation): Shows purple-styled consolidation payment link
  - Legacy flow: Shows deposit + final payment links
  - Crossing: Shows full payment link
- **Important Dates Section**:
  - New flow: Shows `consolidation_paid_at` field
  - Legacy flow: Shows `deposit_paid_at` field
- **Form Submission**: Added consolidation fields to FormData
- **Translations**: Added `consolidationPaymentLinkLabel`, `consolidationFlowNote`, `consolidationPaidAtLabel`

---

### Additional Update: Payment Method Selection (December 9, 2025)

#### 5. Updated `AdminOrderModalConsolidate.vue` - Payment Method Option
- **New Field**: `payment_method` in form (`'stripe'` or `'manual_transfer'`)
- **Payment Method Selector**: Two visual card buttons to choose between:
  - **Stripe Payment** (purple theme) - Electronic invoice via Stripe
  - **Bank Transfer** (amber theme) - Direct deposit with bank details
- **Bank Details Display**: When manual transfer selected, shows NU Bank info:
  - Beneficiary: ALEJANDRO MARTOS AYALA
  - Bank: NU Bank (NUVO)
  - Account: 638975000271400101
- **Dynamic UI**: Info banner, button colors, and confirm text change based on selected method
- **API Call**: Now sends `payment_method` parameter to `/consolidate` endpoint
- **Translations**: Added 15+ new translations for payment method UI

---

### Additional Update: Date Range Filtering for Orders (December 10, 2025)

#### Task: Add date range filtering and per_page control to orders index

**Todo:**
- [x] Add date range state variables (fromDate, toDate, datePreset)
- [x] Add per_page filter dropdown
- [x] Add date picker button with dropdown (desktop)
- [x] Add mobile filter modal with date range support
- [x] Update fetchOrders to pass from_date, to_date, per_page params
- [x] Add translations for date range UI
- [x] Add "clear filters" for date range

**Files modified:**
- `pages/app/admin/orders/index.vue` - Added date/per_page filtering

**API params used:**
- `from_date` - filters orders created on or after this date
- `to_date` - filters orders created on or before this date
- `per_page` - number of results per page (1-500)

#### Implementation Summary:

1. **State Variables Added:**
   - `perPage` (ref, default: 25)
   - `fromDate`, `toDate` (refs for date range)
   - `datePreset` (ref for quick preset selection)
   - `showDatePicker`, `showMobileFilters` (refs for UI state)

2. **Computed Properties Added:**
   - `perPageOptions` - [10, 25, 50, 100, 200]
   - `hasActiveFilters` - checks if any filter is active
   - `activeFilterCount` - counts active filters for badge
   - `datePresets` - array of preset options (today, yesterday, last 7/30 days, etc.)
   - `dateRangeLabel` - formatted label for selected date range

3. **Methods Added:**
   - `formatDateForInput()` - formats Date to YYYY-MM-DD
   - `formatDateDisplay()` - formats date for display
   - `applyDatePreset()` - applies a quick preset (desktop)
   - `applyDatePresetMobile()` - applies preset without fetching (mobile)
   - `applyCustomDateRange()` - applies custom date range
   - `clearDateRange()` - clears date filters
   - `applyMobileFilters()` - applies all mobile filters

4. **UI Components Added:**
   - **Desktop**: Date picker dropdown with quick presets and custom range inputs
   - **Desktop**: Per page selector dropdown
   - **Mobile**: Filter button with badge showing active filter count
   - **Mobile**: Bottom sheet modal with status, per page, and date range filters

5. **Updated `fetchOrders()`:**
   - Now passes `per_page`, `from_date`, `to_date` params to API

6. **Updated `clearFilters()`:**
   - Now also clears `fromDate`, `toDate`, `datePreset`

7. **Added watcher for `perPage`:**
   - Fetches orders when per page changes

8. **Translations Added (20+ new):**
   - Date range labels (dateRange, selectDateRange, from, toDate, etc.)
   - Preset labels (today, yesterday, last7Days, etc.)
   - Mobile filter labels (filters, clearAll, applyFilters)
   - Per page label

---

### Additional Update: Edit Page Status Selector (December 10, 2025)

#### 6. Updated `pages/app/admin/orders/[id]/edit.vue` - Status Selector Order

**Changes Made:**

1. **Reordered Status Selector Options** to reflect new order flow:
   - OLD order: collecting → awaiting_packages → packages_complete → processing → shipped → delivered → awaiting_payment → paid → cancelled
   - NEW order: collecting → awaiting_packages → packages_complete → **awaiting_payment** → **paid** → shipped → delivered → cancelled

2. **Removed `processing` status** from selector (legacy status no longer used in new flow)

3. **Updated Shipping Type Description**:
   - Changed from "50% deposit" to "100% full payment"
   - Both shipping and crossing now show "100%" since all orders use full payment at consolidation

**New Order Flow (as implemented):**
```
COLLECTING → AWAITING_PACKAGES → PACKAGES_COMPLETE → AWAITING_PAYMENT → PAID → SHIPPED → DELIVERED
```

**Note:** The `processing` status was removed from the dropdown since it's a legacy status from the old 50% deposit flow. Existing orders with `processing` status will continue to work but new orders follow the new flow.

---

### Additional Update: Consolidation Fields Cleanup (December 10, 2025)

#### 7. Updated `pages/app/admin/orders/[id]/index.vue` - Use Standard Fields

**Problem:** The code was using consolidation-specific fields that were deprecated:
- `consolidation_invoice_id` → should use `stripe_invoice_id`
- `consolidation_payment_link` → should use `payment_link`
- `consolidation_paid_at` → should use `paid_at`

**Changes Made:**

1. **Awaiting Payment Status Section** (line 86-87):
   - Changed `order.consolidation_payment_link` to `order.payment_link`

2. **Financials Section** (lines 784-822):
   - Changed condition from `order.consolidation_payment_link` to `order.payment_link`
   - Updated comment from "Consolidation Payment" to "Full Payment"
   - Updated invoice link to use `order.payment_link`
   - Updated legacy deposit condition to check `!order.payment_link` instead of `!order.consolidation_payment_link`

**Backward Compatibility:**
- Legacy orders with `deposit_amount` (old 50% deposit flow) are still supported
- The legacy deposit section only shows when there's no `payment_link` (new flow)

---

### Additional Update: Fixed Financials Section Logic (December 10, 2025)

#### 8. Updated `pages/app/admin/orders/[id]/index.vue` - Correct Payment Detection

**Problem:** The financials section was checking `order.payment_link` to determine if it was a new flow order, but `payment_link` can be null even for new flow orders. The correct indicator is `paid_at` for payment status and absence of `deposit_amount` for detecting new vs legacy flow.

**Changes Made:**
1. Main condition: Changed from `order.payment_link` to `order.box_price`
2. NEW FLOW condition: `!isCrossing && !order.deposit_amount && order.box_price`
3. Invoice link: Added `v-if="order.payment_link"` to only show when link exists
4. Legacy condition: Simplified to `order.deposit_amount && !isCrossing`

---

### Additional Update: Status Order in Composable (December 10, 2025)

#### 9. Updated `composables/useOrderStatus.js` - Correct Status Order

**Problem:** The `getAllStatuses()` function returned statuses in the old order based on object key order.

**Changes Made:**
1. Added explicit `statusOrder` array defining the NEW correct order
2. Updated `getAllStatuses()` to use `statusOrder` array instead of `Object.keys()`
3. Reordered translations object to match new flow
4. Exported `statusOrder` for reuse elsewhere

**NEW Status Order:**
```
collecting → awaiting_packages → packages_complete → awaiting_payment → paid → processing (legacy) → shipped → delivered → cancelled
```

**Files Automatically Fixed:**
- `pages/app/admin/orders/index.vue` - Uses `getAllStatuses()` from composable
- `pages/app/admin/boxes/index.vue` - Uses `getAllStatuses()` from composable

**Note:** packages/index.vue and purchase-requests/index.vue have their own statuses (different entities) and don't use this composable.

---

### Additional Update: Per Page Filtering for Boxes (December 11, 2025)

#### 10. Updated `pages/app/admin/boxes/index.vue` - Per Page Selector

**Changes Made:**

1. **State Variables Added:**
   - `perPage` ref (default: 25)
   - `perPageOptions` array [10, 25, 50, 100, 200]

2. **Updated `fetchBoxes()`:**
   - Changed `per_page: 5` (hardcoded) to `per_page: perPage.value`

3. **Added Watcher:**
   - `watch(perPage, ...)` to refetch boxes when per page changes

4. **Added UI Elements:**
   - **Desktop**: Per page dropdown in filters row (after date picker)
   - **Mobile**: Per page select in mobile filter modal

5. **Added Translation:**
   - `perPage: { es: 'Por página', en: 'Per page' }`

