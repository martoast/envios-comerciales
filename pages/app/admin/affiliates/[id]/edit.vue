<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            :to="`/app/admin/affiliates/${route.params.id}`"
            class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
          <div>
            <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">{{ t.editAffiliate }}</h1>
            <p class="text-sm text-gray-500">{{ affiliate?.user?.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
        <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-500">{{ t.loading }}</p>
    </div>

    <!-- Form -->
    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Status Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.status }}</h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.affiliateStatus }}</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="active">{{ t.statusActive }}</option>
              <option value="pending">{{ t.statusPending }}</option>
              <option value="suspended">{{ t.statusSuspended }}</option>
            </select>
          </div>
        </div>

        <!-- Commission Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.commissionSettings }}</h2>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.commissionType }}</label>
              <select
                v-model="form.commission_type"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="percentage">{{ t.percentage }}</option>
                <option value="fixed">{{ t.fixed }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.commissionValue }}</label>
              <div class="relative">
                <span v-if="form.commission_type === 'fixed'" class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">$</span>
                <input
                  v-model="form.commission_value"
                  type="number"
                  step="0.01"
                  min="0"
                  :class="[
                    'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    form.commission_type === 'fixed' ? 'pl-8' : ''
                  ]"
                  :placeholder="form.commission_type === 'percentage' ? '10' : '5.00'"
                />
                <span v-if="form.commission_type === 'percentage'" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bank Details Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.bankDetails }}</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.beneficiaryName }}</label>
              <input
                v-model="form.bank_beneficiary_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :placeholder="t.beneficiaryPlaceholder"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.bankName }}</label>
              <input
                v-model="form.bank_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :placeholder="t.bankPlaceholder"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.accountNumber }}</label>
              <input
                v-model="form.bank_account_number"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :placeholder="t.accountPlaceholder"
              />
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4">
          <NuxtLink
            :to="`/app/admin/affiliates/${route.params.id}`"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-center"
          >
            {{ t.cancel }}
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="flex-1 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {{ submitting ? t.saving : t.saveChanges }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const route = useRoute()
const { $customFetch } = useNuxtApp()
const { t: createTranslations } = useLanguage()

// State
const affiliate = ref(null)
const loading = ref(true)
const submitting = ref(false)
const errorMessage = ref('')
const form = ref({
  status: 'active',
  commission_type: 'percentage',
  commission_value: 10,
  bank_beneficiary_name: '',
  bank_name: '',
  bank_account_number: ''
})

// Translations
const translations = {
  editAffiliate: { es: 'Editar Afiliado', en: 'Edit Affiliate' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  status: { es: 'Estado', en: 'Status' },
  affiliateStatus: { es: 'Estado del afiliado', en: 'Affiliate status' },
  statusActive: { es: 'Activo', en: 'Active' },
  statusPending: { es: 'Pendiente', en: 'Pending' },
  statusSuspended: { es: 'Suspendido', en: 'Suspended' },
  commissionSettings: { es: 'Configuración de Comisión', en: 'Commission Settings' },
  commissionType: { es: 'Tipo de comisión', en: 'Commission type' },
  percentage: { es: 'Porcentaje', en: 'Percentage' },
  fixed: { es: 'Monto fijo', en: 'Fixed amount' },
  commissionValue: { es: 'Valor de comisión', en: 'Commission value' },
  bankDetails: { es: 'Datos Bancarios', en: 'Bank Details' },
  beneficiaryName: { es: 'Nombre del beneficiario', en: 'Beneficiary name' },
  beneficiaryPlaceholder: { es: 'Nombre como aparece en la cuenta', en: 'Name as it appears on account' },
  bankName: { es: 'Nombre del banco', en: 'Bank name' },
  bankPlaceholder: { es: 'Ej: BBVA, Santander', en: 'E.g: Chase, Bank of America' },
  accountNumber: { es: 'Número de cuenta / CLABE', en: 'Account number' },
  accountPlaceholder: { es: 'Número de cuenta o CLABE', en: 'Account number' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  saveChanges: { es: 'Guardar Cambios', en: 'Save Changes' },
  saving: { es: 'Guardando...', en: 'Saving...' }
}

const t = createTranslations(translations)

// Methods
const fetchAffiliate = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/affiliates/${route.params.id}`)
    affiliate.value = response.data

    // Populate form - read from nested bank_details object
    form.value = {
      status: response.data.status || 'active',
      commission_type: response.data.commission_type || 'percentage',
      commission_value: response.data.commission_value || 10,
      bank_beneficiary_name: response.data.bank_details?.beneficiary_name || '',
      bank_name: response.data.bank_details?.bank_name || '',
      bank_account_number: response.data.bank_details?.account_number || ''
    }
  } catch (error) {
    console.error('Error fetching affiliate:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  submitting.value = true
  errorMessage.value = ''

  try {
    await $customFetch(`/admin/affiliates/${route.params.id}`, {
      method: 'PUT',
      body: form.value
    })

    await navigateTo(`/app/admin/affiliates/${route.params.id}`)
  } catch (error) {
    console.error('Error updating affiliate:', error)
    errorMessage.value = error.data?.message || 'An error occurred'
  } finally {
    submitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchAffiliate()
})
</script>
