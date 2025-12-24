<template>
  <div v-if="show" class="shipping-label-overlay" @click.self="$emit('close')">
    <div class="shipping-label-container">
      <div class="shipping-label-actions no-print">
        <button @click="printLabel" class="print-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          Print Label
        </button>
        <button @click="$emit('close')" class="close-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div ref="labelRef" class="shipping-label">
        <!-- Header with Logo -->
        <div class="label-header">
          <img src="/box.svg" alt="Boxly" class="logo" />
          <div class="order-info">
            <span class="order-number">Order #{{ order.order_number }}</span>
          </div>
        </div>

        <!-- Ship To Section -->
        <div class="ship-to-section">
          <div class="section-title">SHIP TO:</div>
          <div class="recipient-name">{{ order.user?.name }}</div>
          <div class="address-text">{{ fullAddress }}</div>
        </div>

        <!-- Contact Info -->
        <div class="contact-section">
          <div v-if="order.user?.phone" class="contact-item">
            <span class="contact-label">Tel:</span>
            <span>{{ order.user.phone }}</span>
          </div>
          <div v-if="order.user?.email" class="contact-item">
            <span class="contact-label">Email:</span>
            <span class="email-text">{{ order.user.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const labelRef = ref(null)

// Get full address - handles both full_address string and individual fields
const fullAddress = computed(() => {
  const addr = props.order?.delivery_address
  if (!addr) return ''

  // If we have a full_address string, use it
  if (addr.full_address) {
    return addr.full_address
  }

  // Otherwise build from individual fields
  const parts = []
  if (addr.street) {
    let line = addr.street
    if (addr.exterior_number) line += ` #${addr.exterior_number}`
    if (addr.interior_number) line += `, Int. ${addr.interior_number}`
    parts.push(line)
  }
  if (addr.colonia) parts.push(addr.colonia)
  if (addr.municipio) parts.push(addr.municipio)
  if (addr.estado) parts.push(addr.estado)
  if (addr.postal_code) parts.push(`C.P. ${addr.postal_code}`)

  return parts.join(', ')
})

const printLabel = () => {
  // Open a new window with just the label content
  const printWindow = window.open('', '_blank', 'width=450,height=650')

  const labelHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shipping Label - ${props.order.order_number}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, Helvetica, sans-serif; }

        .shipping-label {
          width: 4in;
          height: 6in;
          padding: 0.25in;
          border: 2px solid #000;
          background: white;
          display: flex;
          flex-direction: column;
        }

        .label-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.15in;
          border-bottom: 2px solid #000;
          margin-bottom: 0.2in;
        }

        .logo { height: 0.6in; width: auto; }
        .order-number { font-size: 16px; font-weight: bold; }

        .ship-to-section { flex: 1; margin-bottom: 0.15in; }
        .section-title { font-size: 12px; font-weight: bold; color: #666; margin-bottom: 6px; }
        .recipient-name { font-size: 22px; font-weight: bold; margin-bottom: 10px; }
        .address-text { font-size: 14px; line-height: 1.5; }

        .contact-section {
          padding: 0.15in 0;
          border-top: 1px solid #ccc;
        }
        .contact-item { font-size: 13px; margin-bottom: 4px; }
        .contact-label { font-weight: bold; margin-right: 6px; }
        .email-text { word-break: break-all; }

        @media print {
          @page { size: 4in 6in; margin: 0; }
          body { margin: 0; }
          .shipping-label { border: 2px solid #000; }
        }
      </style>
    </head>
    <body>
      <div class="shipping-label">
        <div class="label-header">
          <img src="/box.svg" alt="Boxly" class="logo" />
          <div class="order-info">
            <span class="order-number">Order #${props.order.order_number}</span>
          </div>
        </div>

        <div class="ship-to-section">
          <div class="section-title">SHIP TO:</div>
          <div class="recipient-name">${props.order.user?.name || ''}</div>
          <div class="address-text">${fullAddress.value}</div>
        </div>

        <div class="contact-section">
          ${props.order.user?.phone ? `<div class="contact-item"><span class="contact-label">Tel:</span><span>${props.order.user.phone}</span></div>` : ''}
          ${props.order.user?.email ? `<div class="contact-item"><span class="contact-label">Email:</span><span class="email-text">${props.order.user.email}</span></div>` : ''}
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 250);
        }
      <\/script>
    </body>
    </html>
  `

  printWindow.document.write(labelHtml)
  printWindow.document.close()
}
</script>

<style scoped>
.shipping-label-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.shipping-label-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shipping-label-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.print-btn:hover {
  background: #4338CA;
}

.close-btn {
  padding: 8px;
  background: #F3F4F6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close-btn:hover {
  background: #E5E7EB;
}

/* 4x6 inch label - 96dpi = 384x576px */
.shipping-label {
  width: 4in;
  height: 6in;
  padding: 0.25in;
  border: 2px solid #000;
  background: white;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.label-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.15in;
  border-bottom: 2px solid #000;
  margin-bottom: 0.15in;
}

.logo {
  height: 0.6in;
  width: auto;
}

.order-info {
  text-align: right;
}

.order-number {
  font-size: 16px;
  font-weight: bold;
}

.ship-to-section {
  flex: 1;
  margin-bottom: 0.15in;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  color: #666;
  margin-bottom: 6px;
}

.recipient-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.address-text {
  font-size: 14px;
  line-height: 1.5;
}

.contact-section {
  padding: 0.15in 0;
  border-top: 1px solid #ccc;
}

.contact-item {
  font-size: 13px;
  margin-bottom: 4px;
}

.contact-label {
  font-weight: bold;
  margin-right: 6px;
}

.email-text {
  word-break: break-all;
}
</style>
