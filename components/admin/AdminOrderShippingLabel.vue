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

        <!-- Box Sizes -->
        <div v-if="boxSizes" class="boxes-section">
          <span class="boxes-label">Boxes:</span>
          <span class="boxes-value">{{ boxSizes }}</span>
        </div>

        <!-- Barcode Section -->
        <div class="barcode-section">
          <div class="barcode" v-html="barcodeHtml"></div>
          <div class="barcode-text">{{ order.order_number }}</div>
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

// Get box sizes summary
const boxSizes = computed(() => {
  const boxes = props.order?.boxes
  if (!boxes || boxes.length === 0) {
    // Fallback to legacy box_size
    if (props.order?.box_size) {
      return props.order.box_size.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }
    return null
  }

  // Count boxes by size
  const sizeCounts = {}
  boxes.forEach(box => {
    const name = box.box_name || box.box_size
    sizeCounts[name] = (sizeCounts[name] || 0) + 1
  })

  // Format: "1x Medium Box, 1x Small Box"
  return Object.entries(sizeCounts)
    .map(([name, count]) => `${count}x ${name}`)
    .join(', ')
})

// Generate Code128 barcode as SVG
const generateBarcode = (text) => {
  // Code128B encoding table
  const code128B = {
    ' ': '11011001100', '!': '11001101100', '"': '11001100110', '#': '10010011000',
    '$': '10010001100', '%': '10001001100', '&': '10011001000', "'": '10011000100',
    '(': '10001100100', ')': '11001001000', '*': '11001000100', '+': '11000100100',
    ',': '10110011100', '-': '10011011100', '.': '10011001110', '/': '10111001100',
    '0': '10011101100', '1': '10011100110', '2': '11001110010', '3': '11001011100',
    '4': '11001001110', '5': '11011100100', '6': '11001110100', '7': '11101101110',
    '8': '11101001100', '9': '11100101100', ':': '11100100110', ';': '11101100100',
    '<': '11100110100', '=': '11100110010', '>': '11011011000', '?': '11011000110',
    '@': '11000110110', 'A': '10100011000', 'B': '10001011000', 'C': '10001000110',
    'D': '10110001000', 'E': '10001101000', 'F': '10001100010', 'G': '11010001000',
    'H': '11000101000', 'I': '11000100010', 'J': '10110111000', 'K': '10110001110',
    'L': '10001101110', 'M': '10111011000', 'N': '10111000110', 'O': '10001110110',
    'P': '11101110110', 'Q': '11010001110', 'R': '11000101110', 'S': '11011101000',
    'T': '11011100010', 'U': '11011101110', 'V': '11101011000', 'W': '11101000110',
    'X': '11100010110', 'Y': '11101101000', 'Z': '11101100010', '[': '11100011010',
    '\\': '11101111010', ']': '11001000010', '^': '11110001010', '_': '10100110000',
    '`': '10100001100', 'a': '10010110000', 'b': '10010000110', 'c': '10000101100',
    'd': '10000100110', 'e': '10110010000', 'f': '10110000100', 'g': '10011010000',
    'h': '10011000010', 'i': '10000110100', 'j': '10000110010', 'k': '11000010010',
    'l': '11001010000', 'm': '11110111010', 'n': '11000010100', 'o': '10001111010',
    'p': '10100111100', 'q': '10010111100', 'r': '10010011110', 's': '10111100100',
    't': '10011110100', 'u': '10011110010', 'v': '11110100100', 'w': '11110010100',
    'x': '11110010010', 'y': '11011011110', 'z': '11011110110', '{': '11110110110',
    '|': '10101111000', '}': '10100011110', '~': '10001011110'
  }

  const startB = '11010010000'
  const stop = '1100011101011'

  // Calculate checksum
  let checksum = 104 // Start B value
  let encoded = startB

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const pattern = code128B[char]
    if (pattern) {
      encoded += pattern
      // Get char value (space = 0, ! = 1, etc.)
      const value = char.charCodeAt(0) - 32
      checksum += value * (i + 1)
    }
  }

  // Add checksum character
  checksum = checksum % 103
  // Convert checksum to character
  const checksumChar = String.fromCharCode(checksum + 32)
  if (code128B[checksumChar]) {
    encoded += code128B[checksumChar]
  }

  encoded += stop

  // Generate SVG bars
  const barWidth = 2
  const height = 50
  let x = 0
  let bars = ''

  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === '1') {
      bars += `<rect x="${x}" y="0" width="${barWidth}" height="${height}" fill="black"/>`
    }
    x += barWidth
  }

  return `<svg width="${x}" height="${height}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`
}

const barcodeHtml = computed(() => {
  return generateBarcode(props.order?.order_number || '')
})

const printLabel = () => {
  // Open a new window with just the label content
  const printWindow = window.open('', '_blank', 'width=450,height=650')

  const barcodeSvg = generateBarcode(props.order.order_number)

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
          padding-bottom: 0.12in;
          border-bottom: 2px solid #000;
          margin-bottom: 0.15in;
        }

        .logo { height: 0.5in; width: auto; }
        .order-number { font-size: 14px; font-weight: bold; }

        .ship-to-section { flex: 1; margin-bottom: 0.1in; }
        .section-title { font-size: 11px; font-weight: bold; color: #666; margin-bottom: 4px; }
        .recipient-name { font-size: 20px; font-weight: bold; margin-bottom: 8px; }
        .address-text { font-size: 13px; line-height: 1.4; }

        .contact-section {
          padding: 0.1in 0;
          border-top: 1px solid #ccc;
        }
        .contact-item { font-size: 12px; margin-bottom: 3px; }
        .contact-label { font-weight: bold; margin-right: 4px; }
        .email-text { word-break: break-all; }

        .boxes-section {
          padding: 0.1in 0;
          border-top: 1px solid #ccc;
          font-size: 12px;
        }
        .boxes-label { font-weight: bold; margin-right: 4px; }
        .boxes-value { }

        .barcode-section {
          margin-top: auto;
          padding-top: 0.15in;
          border-top: 1px solid #ccc;
          text-align: center;
        }
        .barcode { display: flex; justify-content: center; margin-bottom: 4px; }
        .barcode svg { max-width: 100%; height: 45px; }
        .barcode-text { font-size: 14px; font-weight: bold; font-family: monospace; letter-spacing: 2px; }

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

        ${boxSizes.value ? `
        <div class="boxes-section">
          <span class="boxes-label">Boxes:</span>
          <span class="boxes-value">${boxSizes.value}</span>
        </div>
        ` : ''}

        <div class="barcode-section">
          <div class="barcode">${barcodeSvg}</div>
          <div class="barcode-text">${props.order.order_number}</div>
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
  padding-bottom: 0.12in;
  border-bottom: 2px solid #000;
  margin-bottom: 0.15in;
}

.logo {
  height: 0.5in;
  width: auto;
}

.order-info {
  text-align: right;
}

.order-number {
  font-size: 14px;
  font-weight: bold;
}

.ship-to-section {
  flex: 1;
  margin-bottom: 0.1in;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: #666;
  margin-bottom: 4px;
}

.recipient-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.address-text {
  font-size: 13px;
  line-height: 1.4;
}

.contact-section {
  padding: 0.1in 0;
  border-top: 1px solid #ccc;
}

.contact-item {
  font-size: 12px;
  margin-bottom: 3px;
}

.contact-label {
  font-weight: bold;
  margin-right: 4px;
}

.email-text {
  word-break: break-all;
}

.boxes-section {
  padding: 0.1in 0;
  border-top: 1px solid #ccc;
  font-size: 12px;
}

.boxes-label {
  font-weight: bold;
  margin-right: 4px;
}

.barcode-section {
  margin-top: auto;
  padding-top: 0.15in;
  border-top: 1px solid #ccc;
  text-align: center;
}

.barcode {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.barcode :deep(svg) {
  max-width: 100%;
  height: 45px;
}

.barcode-text {
  font-size: 14px;
  font-weight: bold;
  font-family: monospace;
  letter-spacing: 2px;
}
</style>
