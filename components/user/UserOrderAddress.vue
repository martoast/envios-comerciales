<!-- components/user/UserOrderAddress.vue -->
<template>
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">{{ t.address }}</h2>
        <NuxtLink v-if="canEdit" :to="`/app/orders/${order.id}/edit`" class="text-sm text-primary-600 hover:underline">
          {{ t.edit }}
        </NuxtLink>
      </div>
      <div class="p-4 sm:p-6 text-sm text-gray-700">
        <p class="font-medium text-gray-900">{{ address.street }} {{ address.exterior_number }} <span v-if="address.interior_number">Int. {{ address.interior_number }}</span></p>
        <p>{{ address.colonia }}</p>
        <p>{{ address.municipio }}, {{ address.estado }}</p>
        <p>C.P. {{ address.postal_code }}</p>
        <p v-if="address.referencias" class="mt-2 text-gray-500 italic">"{{ address.referencias }}"</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps(['order'])
  const address = computed(() => props.order?.delivery_address || {})
  const { t: createTranslations } = useLanguage()
  
  const canEdit = computed(() => ['collecting', 'awaiting_packages'].includes(props.order?.status))
  
  const translations = {
    address: { es: "Dirección de Entrega", en: "Delivery Address" },
    edit: { es: "Editar", en: "Edit" }
  }
  const t = createTranslations(translations)
  </script>