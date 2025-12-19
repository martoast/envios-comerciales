<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/app/admin/affiliates"
            class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
          <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">{{ t.createAffiliate }}</h1>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- User Selection Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t.selectUser }}</h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.searchUser }}</label>
            <div class="relative">
              <input
                v-model="userSearch"
                type="text"
                @input="searchUsers"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                :placeholder="t.searchPlaceholder"
              />
              <div v-if="searchLoading" class="absolute right-3 top-1/2 -translate-y-1/2">
                <svg class="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <!-- User Search Results -->
            <div v-if="users.length > 0 && !selectedUser" class="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              <button
                v-for="user in users"
                :key="user.id"
                type="button"
                @click="selectUser(user)"
                class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <p class="font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </button>
            </div>

            <!-- Selected User -->
            <div v-if="selectedUser" class="mt-3 bg-primary-50 border border-primary-200 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-700 font-medium">{{ selectedUser.name.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ selectedUser.name }}</p>
                    <p class="text-sm text-gray-500">{{ selectedUser.email }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="clearSelectedUser"
                  class="p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
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

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.status }}</label>
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

        <!-- Bank Details Section (Optional) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ t.bankDetails }}</h2>
          <p class="text-sm text-gray-500 mb-4">{{ t.bankDetailsOptional }}</p>

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
            to="/app/admin/affiliates"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-center"
          >
            {{ t.cancel }}
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting || !selectedUser"
            class="flex-1 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {{ submitting ? t.creating : t.createAffiliate }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch } = useNuxtApp()
const { t: createTranslations } = useLanguage()

// State
const userSearch = ref('')
const users = ref([])
const selectedUser = ref(null)
const searchLoading = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const searchDebounce = ref(null)
const form = ref({
  commission_type: 'percentage',
  commission_value: 10,
  status: 'active',
  bank_beneficiary_name: '',
  bank_name: '',
  bank_account_number: ''
})

// Translations
const translations = {
  createAffiliate: { es: 'Crear Afiliado', en: 'Create Affiliate' },
  selectUser: { es: 'Seleccionar Usuario', en: 'Select User' },
  searchUser: { es: 'Buscar usuario', en: 'Search user' },
  searchPlaceholder: { es: 'Buscar por nombre o correo...', en: 'Search by name or email...' },
  commissionSettings: { es: 'Configuración de Comisión', en: 'Commission Settings' },
  commissionType: { es: 'Tipo de comisión', en: 'Commission type' },
  percentage: { es: 'Porcentaje', en: 'Percentage' },
  fixed: { es: 'Monto fijo', en: 'Fixed amount' },
  commissionValue: { es: 'Valor de comisión', en: 'Commission value' },
  status: { es: 'Estado', en: 'Status' },
  statusActive: { es: 'Activo', en: 'Active' },
  statusPending: { es: 'Pendiente', en: 'Pending' },
  statusSuspended: { es: 'Suspendido', en: 'Suspended' },
  bankDetails: { es: 'Datos Bancarios', en: 'Bank Details' },
  bankDetailsOptional: { es: 'Opcional - el afiliado puede agregarlos después', en: 'Optional - affiliate can add these later' },
  beneficiaryName: { es: 'Nombre del beneficiario', en: 'Beneficiary name' },
  beneficiaryPlaceholder: { es: 'Nombre como aparece en la cuenta', en: 'Name as it appears on account' },
  bankName: { es: 'Nombre del banco', en: 'Bank name' },
  bankPlaceholder: { es: 'Ej: BBVA, Santander', en: 'E.g: Chase, Bank of America' },
  accountNumber: { es: 'Número de cuenta / CLABE', en: 'Account number' },
  accountPlaceholder: { es: 'Número de cuenta o CLABE', en: 'Account number' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  creating: { es: 'Creando...', en: 'Creating...' }
}

const t = createTranslations(translations)

// Methods
const searchUsers = () => {
  clearTimeout(searchDebounce.value)
  searchDebounce.value = setTimeout(async () => {
    if (userSearch.value.length < 2) {
      users.value = []
      return
    }

    searchLoading.value = true
    try {
      const response = await $customFetch('/admin/customers', {
        params: {
          search: userSearch.value,
          per_page: 10,
          not_affiliate: true
        }
      })
      users.value = response.data?.data || response.data || []
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      searchLoading.value = false
    }
  }, 300)
}

const selectUser = (user) => {
  selectedUser.value = user
  userSearch.value = ''
  users.value = []
}

const clearSelectedUser = () => {
  selectedUser.value = null
}

const handleSubmit = async () => {
  if (!selectedUser.value) return

  submitting.value = true
  errorMessage.value = ''

  try {
    const response = await $customFetch('/admin/affiliates', {
      method: 'POST',
      body: {
        user_id: selectedUser.value.id,
        ...form.value
      }
    })

    await navigateTo(`/app/admin/affiliates/${response.data.id}`)
  } catch (error) {
    console.error('Error creating affiliate:', error)
    errorMessage.value = error.data?.message || 'An error occurred'
  } finally {
    submitting.value = false
  }
}
</script>
