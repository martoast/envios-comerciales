# Feature: Package Label Printing + Bulk Order Label Printing

## Overview
Add print label functionality for packages and bulk order label printing. Package labels are simple (barcode + ID + name). Order labels are full shipping labels.

## Tasks
- [x] 1. Create `AdminPackageLabel.vue` component (simple: barcode + ID + name)
- [x] 2. Add "Print Label" to order items page dropdown menu
- [x] 3. Add "Print Labels" bulk action to order items page (for selected)
- [x] 4. Add "Print Label" to packages page actions
- [x] 5. Add "Print Labels" bulk action to packages page (for selected)
- [x] 6. Add bulk "Print Labels" to orders list page

## Review

### Files Created
- `components/admin/AdminPackageLabel.vue` - Package label preview and print component (2.25" x 1.25")

### Files Modified

**Order Items Page** (`pages/app/admin/orders/[id]/items/index.vue`):
- Added multi-select checkboxes on each item
- Added bulk action bar with "Print Labels" button
- Added "Print Label" option in dropdown menu
- Added AdminPackageLabel component

**Packages Page** (`pages/app/admin/packages/index.vue`):
- Added print button to individual row actions
- Added "Print Labels" button to bulk action bar
- Added AdminPackageLabel component

**Orders List Page** (`pages/app/admin/orders/index.vue`):
- Added "Print Labels" button to both mobile and desktop bulk action bars
- Added printBulkLabels function with barcode generation
- Added helper functions for address and box formatting
- Generates 4x6 inch shipping labels with page breaks

### Features
1. **Package Labels** (2.25" x 1.25" - Rollo thermal printer ready)
   - Single or bulk print from packages page
   - Single or bulk print from order items page
   - Shows: barcode, PKG-{id}, product name

2. **Order Shipping Labels** (4x6 inch)
   - Bulk print from orders list page
   - Shows: logo, order number, ship to address, contact info, boxes, barcode
   - Each label on separate page for thermal printing
