<template>
  <div v-if="show" class="package-label-overlay" @click.self="$emit('close')">
    <div class="package-label-container">
      <div class="package-label-actions">
        <button @click="printLabels" class="print-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          {{ packages.length > 1 ? `Print ${packages.length} Labels` : 'Print Label' }}
        </button>
        <button @click="$emit('close')" class="close-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Preview (show first label or count) -->
      <div class="preview-info" v-if="packages.length > 1">
        <span class="preview-count">{{ packages.length }} labels ready to print</span>
      </div>

      <!-- Single Label Preview -->
      <div v-if="packages.length === 1" class="package-label">
        <div class="label-content">
          <div class="barcode" v-html="generateBarcode(String(packages[0].id))"></div>
          <div class="package-id">PKG-{{ packages[0].id }}</div>
          <div class="product-name">{{ packages[0].product_name || 'Unnamed Package' }}</div>
        </div>
      </div>

      <!-- Multi Label Preview (grid) -->
      <div v-else class="labels-grid">
        <div v-for="pkg in packages.slice(0, 6)" :key="pkg.id" class="package-label-mini">
          <div class="mini-barcode" v-html="generateBarcode(String(pkg.id), true)"></div>
          <div class="mini-id">PKG-{{ pkg.id }}</div>
          <div class="mini-name">{{ truncate(pkg.product_name, 20) }}</div>
        </div>
        <div v-if="packages.length > 6" class="more-labels">
          +{{ packages.length - 6 }} more
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  packages: {
    type: Array,
    required: true
  }
})

defineEmits(['close'])

const truncate = (str, len) => {
  if (!str) return 'Unnamed'
  return str.length > len ? str.substring(0, len) + '...' : str
}

// Generate Code128 barcode as SVG
const generateBarcode = (text, mini = false) => {
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

  let checksum = 104
  let encoded = startB

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const pattern = code128B[char]
    if (pattern) {
      encoded += pattern
      const value = char.charCodeAt(0) - 32
      checksum += value * (i + 1)
    }
  }

  checksum = checksum % 103
  const checksumChar = String.fromCharCode(checksum + 32)
  if (code128B[checksumChar]) {
    encoded += code128B[checksumChar]
  }

  encoded += stop

  const barWidth = mini ? 1 : 2
  const height = mini ? 25 : 40
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

const printLabels = () => {
  const printWindow = window.open('', '_blank', 'width=400,height=600')

  // Generate labels HTML for all packages
  const labelsHtml = props.packages.map(pkg => {
    const barcodeSvg = generateBarcode(String(pkg.id))
    return `
      <div class="package-label">
        <div class="label-content">
          <div class="barcode">${barcodeSvg}</div>
          <div class="package-id">PKG-${pkg.id}</div>
          <div class="product-name">${pkg.product_name || 'Unnamed Package'}</div>
        </div>
      </div>
    `
  }).join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Package Labels</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, Helvetica, sans-serif; }

        .package-label {
          width: 2.25in;
          height: 1.25in;
          padding: 0.1in;
          border: 1px solid #000;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          page-break-inside: avoid;
          margin-bottom: 0.1in;
        }

        .label-content {
          text-align: center;
          width: 100%;
        }

        .barcode {
          display: flex;
          justify-content: center;
          margin-bottom: 4px;
        }

        .barcode svg {
          max-width: 100%;
          height: 40px;
        }

        .package-id {
          font-size: 12px;
          font-weight: bold;
          font-family: monospace;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }

        .product-name {
          font-size: 10px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 2in;
          margin: 0 auto;
        }

        @media print {
          @page {
            size: 2.25in 1.25in;
            margin: 0;
          }
          body { margin: 0; }
          .package-label {
            border: 1px solid #000;
            margin: 0;
            page-break-after: always;
          }
          .package-label:last-child {
            page-break-after: auto;
          }
        }
      </style>
    </head>
    <body>
      ${labelsHtml}
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

  printWindow.document.write(html)
  printWindow.document.close()
}
</script>

<style scoped>
.package-label-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.package-label-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 90vw;
}

.package-label-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.print-btn:hover {
  background: #4338CA;
}

.close-btn {
  padding: 10px;
  background: #F3F4F6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #E5E7EB;
}

.preview-info {
  text-align: center;
  margin-bottom: 16px;
}

.preview-count {
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
}

.package-label {
  width: 2.25in;
  height: 1.25in;
  padding: 0.1in;
  border: 2px solid #000;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.label-content {
  text-align: center;
  width: 100%;
}

.barcode {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.barcode :deep(svg) {
  max-width: 100%;
  height: 40px;
}

.package-id {
  font-size: 12px;
  font-weight: bold;
  font-family: monospace;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.product-name {
  font-size: 10px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-label preview grid */
.labels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 500px;
}

.package-label-mini {
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: #F9FAFB;
  text-align: center;
}

.mini-barcode {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.mini-barcode :deep(svg) {
  height: 25px;
}

.mini-id {
  font-size: 9px;
  font-weight: bold;
  font-family: monospace;
  color: #374151;
}

.mini-name {
  font-size: 8px;
  color: #6B7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more-labels {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px dashed #D1D5DB;
  border-radius: 6px;
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
</style>
