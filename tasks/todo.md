# Current Task: Add Jesus Message Generator for Orders

## Goal
Add a feature to automatically generate a message in Spanish for Jesus with order details (box size, dimensions, weight, directions, shipping type). The message should be accessible from the same dropdown menu as "Print Label" and open in a modal with easy copy-to-clipboard functionality.

## Example Message Format
```
Nombre: Antonio Bautista
    •    Destino: Zapopan, Jalisco
    •    Dirección: Bosque Zapopan 170, Las Cañadas, Zapopan, Jalisco, 45133, Interior 28
    •    Dimensiones: 50 × 40 × 20 cm
    •    Peso: 2.6 kg
    •    Contenido: articulos de baseball
    •    Envío: Avión Estafeta
```

## Requirements (from user clarification)
- Contenido: Admin manually inputs the box contents
- Shipping: Default to "Avión Estafeta", toggleable to "Terrestre Estafeta"
- Text must be FULLY EDITABLE in the modal so admin can change anything
- Copy to clipboard functionality

## Tasks
- [x] Create new component `AdminOrderJesusMessage.vue`
- [x] Add "View Message" option in AdminOrderHeader.vue dropdown menu
- [x] Add state and event handlers in order detail page
- [x] Connect the component with order data

---

## Review

### Changes Made

**1. `components/admin/AdminOrderJesusMessage.vue` (NEW FILE)**
- Created modal component with:
  - Header showing "Mensaje para Jesus" and order number
  - Controls section with:
    - Air/Ground toggle (defaults to Avión)
    - Contents input field
    - Regenerate button to reset the message
  - Fully editable textarea with pre-filled message
  - Copy to clipboard button
  - Close button
- Auto-generates message from order data:
  - Name from `order.user.name`
  - Destination from `delivery_address.municipio, estado`
  - Full address formatted
  - Box dimensions (L × W × H cm) - handles single or multiple boxes
  - Box weight (kg) - shows total for multiple boxes
  - Contenido (admin inputs)
  - Envío type (Avión/Terrestre Estafeta)

**2. `components/admin/AdminOrderHeader.vue`**
- Added "View Message" button in dropdown menu (appears for shipping orders with delivery address)
- Added translation: `viewMessage: { es: 'Ver Mensaje', en: 'View Message' }`
- Added emit for `view-message` event
- Added `handleViewMessage()` handler function

**3. `pages/app/admin/orders/[id]/index.vue`**
- Added import for `AdminOrderJesusMessage` component
- Added `showJesusMessageModal` ref state
- Added `@view-message` event handler on AdminOrderHeader
- Added `AdminOrderJesusMessage` component to template

### Summary
Admins can now:
1. Click the actions menu (three dots) on any shipping order
2. Select "View Message" (Ver Mensaje)
3. See a pre-filled message in Spanish with all order details
4. Toggle between Air/Ground shipping
5. Enter the box contents
6. Edit any part of the message directly in the textarea
7. Click "Regenerate" to reset to original message
8. Copy the final message to clipboard with one click

The message can then be easily pasted into WhatsApp to send to Jesus.

---
