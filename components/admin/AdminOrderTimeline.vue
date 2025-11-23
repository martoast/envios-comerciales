<!-- components/admin/AdminOrderTimeline.vue -->
<template>
    <div class="bg-white rounded-xl border border-gray-200 p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.timeline }}</h2>
      <div class="space-y-6">
        
        <!-- Created -->
        <div class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-blue-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.processing_started_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.orderCreated }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.created_at) }}</p>
          </div>
        </div>
  
        <!-- Processing -->
        <div v-if="order.processing_started_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.shipped_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.processingStarted }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.processing_started_at) }}</p>
          </div>
        </div>
  
        <!-- Shipped (Deposit) -->
        <div v-if="order.shipped_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-purple-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.deposit_paid_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.shipped }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.shipped_at) }}</p>
          </div>
        </div>
  
        <!-- Deposit Paid -->
        <div v-if="order.deposit_paid_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-green-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.delivered_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.depositPaid }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.deposit_paid_at) }}</p>
          </div>
        </div>
  
        <!-- Delivered -->
        <div v-if="order.delivered_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-teal-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.quote_sent_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.delivered }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.delivered_at) }}</p>
          </div>
        </div>
  
        <!-- Quote Sent (Final Invoice) -->
        <div v-if="order.quote_sent_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-orange-500 mt-1.5 relative z-10"></div>
            <div class="w-0.5 bg-gray-200 absolute top-4 bottom-[-24px] left-[5px]" v-if="order.paid_at"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.finalInvoiceSent }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.quote_sent_at) }}</p>
          </div>
        </div>
  
        <!-- Final Payment -->
        <div v-if="order.paid_at" class="flex gap-3 relative">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-green-600 mt-1.5 relative z-10"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ t.fullyPaid }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.paid_at) }}</p>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['order'])
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    timeline: { es: 'Línea de Tiempo', en: 'Timeline' },
    orderCreated: { es: 'Orden Creada', en: 'Order Created' },
    processingStarted: { es: 'Procesamiento Iniciado', en: 'Processing Started' },
    shipped: { es: 'Enviado (Depósito Pendiente)', en: 'Shipped (Deposit Pending)' },
    depositPaid: { es: 'Depósito Pagado', en: 'Deposit Paid' },
    delivered: { es: 'Entregado', en: 'Delivered' },
    finalInvoiceSent: { es: 'Factura Final Enviada', en: 'Final Invoice Sent' },
    fullyPaid: { es: 'Pago Final Completado', en: 'Final Payment Complete' },
  }
  const t = createTranslations(translations)
  
  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  </script>