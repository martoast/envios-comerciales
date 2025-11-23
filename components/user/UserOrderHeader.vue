<!-- components/user/UserOrderHeader.vue -->
<template>
    <div class="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Back & Title -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/app/orders"
              class="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">
                {{ order?.tracking_number || '...' }}
              </h1>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="flex items-center gap-2">
            <span
              v-if="order"
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                getStatusColor(order.status),
              ]"
            >
              {{ getStatusLabel(order.status) }}
            </span>
  
            <!-- Menu for Collecting Status -->
            <Menu as="div" class="relative" v-if="canManage">
              <MenuButton class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 divide-y divide-gray-100 z-50">
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <NuxtLink
                        :to="`/app/orders/${order.id}/edit`"
                        :class="[active ? 'bg-gray-50' : '', 'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors']"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        {{ t.editOrder }}
                      </NuxtLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="$emit('delete')"
                        :class="[active ? 'bg-red-50' : '', 'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-red-600 w-full']"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        {{ t.deleteOrder }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
  import { computed } from 'vue'
  
  const props = defineProps(['order', 'loading'])
  const emit = defineEmits(['delete'])
  const { t: createTranslations } = useLanguage()
  
  const translations = {
    editOrder: { es: "Editar Orden", en: "Edit Order" },
    deleteOrder: { es: "Eliminar Orden", en: "Delete Order" },
    collecting: { es: "Recolectando", en: "Collecting" },
    awaiting_packages: { es: "Esperando Paquetes", en: "Awaiting Packages" },
    packages_complete: { es: "Paquetes Completos", en: "Packages Complete" },
    processing: { es: "Procesando", en: "Processing" },
    shipped: { es: "Enviado", en: "Shipped" },
    delivered: { es: "Entregado", en: "Delivered" },
    awaiting_payment: { es: "Pago Pendiente", en: "Payment Due" },
    paid: { es: "Pagado", en: "Paid" },
    cancelled: { es: "Cancelado", en: "Cancelled" },
  }
  const t = createTranslations(translations)
  
  const canManage = computed(() => {
    return props.order?.status === 'collecting'
  })
  
  const getStatusColor = (status) => {
    const colors = {
      collecting: "bg-primary-100 text-primary-700",
      awaiting_packages: "bg-amber-100 text-amber-700",
      packages_complete: "bg-primary-100 text-primary-700",
      processing: "bg-primary-100 text-primary-700",
      shipped: "bg-indigo-100 text-indigo-700",
      delivered: "bg-green-100 text-green-700",
      awaiting_payment: "bg-orange-100 text-orange-700",
      paid: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }
  
  const getStatusLabel = (status) => {
    return t.value[status] || status
  }
  </script>