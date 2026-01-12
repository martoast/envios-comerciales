# Feature: Admin Order Items Management Page

## Overview
Create a dedicated page for admins to manage packages/items within an order. Currently, items are displayed in the order detail page but there's no way to add, edit, or delete items from within the order context.

## Current State
- Order detail page shows items via `AdminOrderItemsList.vue` (read-only display)
- Standalone packages page exists at `/app/admin/packages/[id]`
- API endpoints already exist:
  - `POST /admin/management/orders/{order}/items` - Add item
  - `PUT /admin/management/orders/{order}/items/{item}` - Update item
  - `DELETE /admin/management/orders/{order}/items/{item}` - Delete item

## Goal
Create `/app/admin/orders/[id]/items` page with full CRUD for order items (packages)

## Tasks
- [x] 1. Create `pages/app/admin/orders/[id]/items/index.vue` - Main items list page
- [x] 2. Create add item functionality (modal)
- [x] 3. Create edit item functionality (modal)
- [x] 4. Add delete functionality with confirmation modal
- [x] 5. Add navigation from order detail page
- [x] 6. Test and polish
- [x] 7. Commit and push

## Files Created/Modified
1. `pages/app/admin/orders/[id]/items/index.vue` (new)
   - Full items management page with header, list, and summary stats
   - Add item modal with fields: product_name, product_url, quantity, declared_value, tracking_number, carrier, estimated_delivery_date
   - Edit item modal with all fields including weight, dimensions, arrived status
   - Delete confirmation modal
   - Bilingual support (Spanish/English)

2. `components/admin/AdminOrderItemsList.vue` (modified)
   - Added `header-actions` slot to allow custom actions in header

3. `pages/app/admin/orders/[id]/index.vue` (modified)
   - Added "Manage" button in items section header using the new slot
   - Links to `/app/admin/orders/{id}/items`

## API Endpoints Used
- `GET /admin/orders/{id}` - Fetch order with items
- `POST /admin/management/orders/{order}/items` - Create item
- `PUT /admin/management/orders/{order}/items/{item}` - Update item
- `DELETE /admin/management/orders/{order}/items/{item}` - Delete item

## Review
- Simple, focused implementation using existing API endpoints
- All CRUD operations in one page with modals for better UX
- Consistent styling with existing admin pages
- Bilingual translations included
- Summary stats show total items, arrived/pending counts, total value
