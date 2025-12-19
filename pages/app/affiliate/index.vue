<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ t.affiliatePortal }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ t.welcomeMessage }}</p>
          </div>
          <NuxtLink
            to="/app/"
            class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
        <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-500">{{ t.loading }}</p>
    </div>

    <!-- Not an Affiliate -->
    <div v-else-if="!affiliate" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ t.notAffiliate }}</h2>
        <p class="text-gray-500 mb-6">{{ t.notAffiliateDescription }}</p>
        <button
          @click="showBecomeModal = true"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {{ t.becomeAffiliate }}
        </button>
      </div>
    </div>

    <!-- Affiliate Dashboard -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <!-- Affiliate Code & Link Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Affiliate Code -->
          <div class="bg-primary-50 rounded-xl p-4">
            <p class="text-sm text-primary-700 font-medium mb-2">{{ t.yourCode }}</p>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-white px-4 py-3 rounded-lg border border-primary-200 font-mono text-2xl text-primary-600 text-center font-bold">
                {{ affiliate.affiliate_code }}
              </code>
              <button
                @click="copyToClipboard(affiliate.affiliate_code)"
                class="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Referral Link -->
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-sm text-gray-700 font-medium mb-2">{{ t.yourLink }}</p>
            <div class="flex items-center gap-2">
              <input
                type="text"
                readonly
                :value="referralLink"
                class="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 truncate"
              />
              <button
                @click="copyToClipboard(referralLink)"
                class="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">{{ t.totalReferrals }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ affiliate.stats?.total_referrals || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">{{ t.totalConversions }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ affiliate.stats?.total_conversions || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">{{ t.totalEarnings }}</p>
          <p class="text-2xl font-bold text-gray-900">${{ formatMoney(affiliate.stats?.total_earnings || 0) }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">{{ t.paidOut }}</p>
          <p class="text-2xl font-bold text-gray-900">${{ formatMoney(affiliate.stats?.paid_earnings || 0) }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <p class="text-sm text-gray-500 mb-1">{{ t.pendingPayout }}</p>
          <p class="text-2xl font-bold text-green-600">${{ formatMoney(affiliate.stats?.pending_earnings || 0) }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-100">
          <nav class="flex">
            <button
              @click="activeTab = 'referrals'"
              :class="[
                'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'referrals' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.referrals }}
            </button>
            <button
              @click="activeTab = 'conversions'"
              :class="[
                'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'conversions' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.conversions }}
            </button>
            <button
              @click="activeTab = 'payouts'"
              :class="[
                'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'payouts' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.payouts }}
            </button>
            <button
              @click="activeTab = 'bank'"
              :class="[
                'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'bank' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.bankDetails }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Referrals Tab -->
          <div v-if="activeTab === 'referrals'">
            <div v-if="referralsLoading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <div v-else-if="referrals.length === 0" class="text-center py-8 text-gray-500">
              {{ t.noReferrals }}
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.name }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">{{ t.signupDate }}</th>
                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">{{ t.paidOrders }}</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{{ t.earned }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="referral in referrals" :key="referral.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                      <div class="text-sm font-medium text-gray-900">{{ referral.user?.name || referral.name }}</div>
                      <div class="text-xs text-gray-500 sm:hidden">{{ formatDate(referral.referred_at || referral.user?.signed_up_at) }}</div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{{ formatDate(referral.referred_at || referral.user?.signed_up_at) }}</td>
                    <td class="px-4 py-3 text-center">
                      <span :class="[
                        'inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full text-sm font-semibold',
                        referral.has_converted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      ]">
                        {{ referral.paid_orders || 0 }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                      <span :class="[
                        'text-sm font-semibold',
                        (referral.total_commission || 0) > 0 ? 'text-green-600' : 'text-gray-400'
                      ]">
                        ${{ formatMoney(referral.total_commission || 0) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Conversions Tab -->
          <div v-if="activeTab === 'conversions'">
            <div v-if="conversionsLoading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <div v-else-if="conversions.length === 0" class="text-center py-8 text-gray-500">
              {{ t.noConversions }}
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.order }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.date }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.orderAmount }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.commission }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.status }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="conversion in conversions" :key="conversion.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-900">#{{ conversion.order_id }}</td>
                    <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(conversion.created_at) }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">${{ formatMoney(conversion.order_amount) }}</td>
                    <td class="px-4 py-3 text-sm font-semibold text-green-600">${{ formatMoney(conversion.commission_amount) }}</td>
                    <td class="px-4 py-3">
                      <span :class="getStatusClass(conversion.status)" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                        {{ conversion.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Payouts Tab -->
          <div v-if="activeTab === 'payouts'">
            <div v-if="payoutsLoading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <div v-else-if="payouts.length === 0" class="text-center py-8 text-gray-500">
              {{ t.noPayouts }}
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.amount }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.date }}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.notes }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="payout in payouts" :key="payout.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-semibold text-green-600">${{ formatMoney(payout.amount) }}</td>
                    <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(payout.created_at) }}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">{{ payout.notes || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bank Details Tab -->
          <div v-if="activeTab === 'bank'">
            <form @submit.prevent="saveBankDetails" class="max-w-md space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.beneficiaryName }}</label>
                <input
                  v-model="bankForm.bank_beneficiary_name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.beneficiaryPlaceholder"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.bankName }}</label>
                <input
                  v-model="bankForm.bank_name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.bankPlaceholder"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.accountNumber }}</label>
                <input
                  v-model="bankForm.bank_account_number"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.accountPlaceholder"
                />
              </div>
              <button
                type="submit"
                :disabled="savingBank"
                class="w-full px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 transition-all"
              >
                {{ savingBank ? t.saving : t.saveChanges }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Become Affiliate Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showBecomeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showBecomeModal = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t.becomeAffiliate }}</h3>
            <p class="text-gray-500 text-sm mb-6">{{ t.becomeAffiliateDescription }}</p>

            <form @submit.prevent="submitBecomeAffiliate" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.beneficiaryName }} ({{ t.optional }})</label>
                <input
                  v-model="becomeForm.bank_beneficiary_name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.bankName }} ({{ t.optional }})</label>
                <input
                  v-model="becomeForm.bank_name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.accountNumber }} ({{ t.optional }})</label>
                <input
                  v-model="becomeForm.bank_account_number"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  @click="showBecomeModal = false"
                  class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  {{ t.cancel }}
                </button>
                <button
                  type="submit"
                  :disabled="becomingAffiliate"
                  class="flex-1 px-4 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 transition-all"
                >
                  {{ becomingAffiliate ? t.processing : t.submit }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { $customFetch } = useNuxtApp()
const { t: createTranslations } = useLanguage()

// State
const affiliate = ref(null)
const loading = ref(true)
const activeTab = ref('referrals')
const referrals = ref([])
const referralsLoading = ref(false)
const conversions = ref([])
const conversionsLoading = ref(false)
const payouts = ref([])
const payoutsLoading = ref(false)
const savingBank = ref(false)
const showBecomeModal = ref(false)
const becomingAffiliate = ref(false)

const bankForm = ref({
  bank_beneficiary_name: '',
  bank_name: '',
  bank_account_number: ''
})

const becomeForm = ref({
  bank_beneficiary_name: '',
  bank_name: '',
  bank_account_number: ''
})

// Translations
const translations = {
  affiliatePortal: { es: 'Portal de Afiliado', en: 'Affiliate Portal' },
  welcomeMessage: { es: 'Gestiona tus referidos y ganancias', en: 'Manage your referrals and earnings' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  notAffiliate: { es: 'Aún no eres afiliado', en: 'You\'re not an affiliate yet' },
  notAffiliateDescription: { es: 'Únete a nuestro programa de afiliados y comienza a ganar dinero refiriendo amigos.', en: 'Join our affiliate program and start earning money by referring friends.' },
  becomeAffiliate: { es: 'Convertirme en Afiliado', en: 'Become an Affiliate' },
  becomeAffiliateDescription: { es: 'Completa los datos bancarios para recibir tus pagos. Puedes agregarlos después.', en: 'Fill in your bank details to receive payments. You can add them later.' },
  yourCode: { es: 'Tu Código de Afiliado', en: 'Your Affiliate Code' },
  yourLink: { es: 'Tu Link de Referido', en: 'Your Referral Link' },
  totalReferrals: { es: 'Total Referidos', en: 'Total Referrals' },
  totalConversions: { es: 'Total Conversiones', en: 'Total Conversions' },
  totalEarnings: { es: 'Ganancias Totales', en: 'Total Earnings' },
  paidOut: { es: 'Pagado', en: 'Paid Out' },
  pendingPayout: { es: 'Pendiente de Pago', en: 'Pending Payout' },
  referrals: { es: 'Referidos', en: 'Referrals' },
  conversions: { es: 'Conversiones', en: 'Conversions' },
  payouts: { es: 'Pagos', en: 'Payouts' },
  bankDetails: { es: 'Datos Bancarios', en: 'Bank Details' },
  noReferrals: { es: 'Aún no tienes referidos', en: 'No referrals yet' },
  noConversions: { es: 'Aún no tienes conversiones', en: 'No conversions yet' },
  noPayouts: { es: 'Aún no tienes pagos', en: 'No payouts yet' },
  name: { es: 'Nombre', en: 'Name' },
  signupDate: { es: 'Fecha de Registro', en: 'Signup Date' },
  orders: { es: 'Órdenes', en: 'Orders' },
  paidOrders: { es: 'Órdenes Pagadas', en: 'Paid Orders' },
  earned: { es: 'Ganado', en: 'Earned' },
  order: { es: 'Orden', en: 'Order' },
  date: { es: 'Fecha', en: 'Date' },
  orderAmount: { es: 'Monto', en: 'Amount' },
  commission: { es: 'Comisión', en: 'Commission' },
  status: { es: 'Estado', en: 'Status' },
  amount: { es: 'Monto', en: 'Amount' },
  notes: { es: 'Notas', en: 'Notes' },
  beneficiaryName: { es: 'Nombre del beneficiario', en: 'Beneficiary name' },
  beneficiaryPlaceholder: { es: 'Nombre como aparece en tu cuenta', en: 'Name as it appears on your account' },
  bankName: { es: 'Nombre del banco', en: 'Bank name' },
  bankPlaceholder: { es: 'Ej: BBVA, Santander', en: 'E.g: Chase, Bank of America' },
  accountNumber: { es: 'Número de cuenta / CLABE', en: 'Account number' },
  accountPlaceholder: { es: 'Tu número de cuenta o CLABE', en: 'Your account number' },
  saveChanges: { es: 'Guardar Cambios', en: 'Save Changes' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  optional: { es: 'opcional', en: 'optional' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  submit: { es: 'Enviar', en: 'Submit' },
  processing: { es: 'Procesando...', en: 'Processing...' }
}

const t = createTranslations(translations)

// Computed
const referralLink = computed(() => {
  // Use the referral_link from API if available, otherwise construct it
  if (affiliate.value?.referral_link) {
    return affiliate.value.referral_link
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://boxly.com'
  return `${baseUrl}?ref=${affiliate.value?.affiliate_code || ''}`
})

// Methods
const fetchDashboard = async () => {
  loading.value = true
  try {
    const response = await $customFetch('/affiliate/dashboard')
    affiliate.value = response.data

    // Populate bank form from nested bank_details
    if (response.data?.bank_details) {
      bankForm.value = {
        bank_beneficiary_name: response.data.bank_details.beneficiary_name || '',
        bank_name: response.data.bank_details.bank_name || '',
        bank_account_number: response.data.bank_details.account_number || ''
      }
    }
  } catch (error) {
    if (error.status !== 404) {
      console.error('Error fetching dashboard:', error)
    }
    affiliate.value = null
  } finally {
    loading.value = false
  }
}

const fetchReferrals = async () => {
  referralsLoading.value = true
  try {
    const response = await $customFetch('/affiliate/referrals')
    referrals.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching referrals:', error)
  } finally {
    referralsLoading.value = false
  }
}

const fetchConversions = async () => {
  conversionsLoading.value = true
  try {
    const response = await $customFetch('/affiliate/conversions')
    conversions.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching conversions:', error)
  } finally {
    conversionsLoading.value = false
  }
}

const fetchPayouts = async () => {
  payoutsLoading.value = true
  try {
    const response = await $customFetch('/affiliate/payouts')
    payouts.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching payouts:', error)
  } finally {
    payoutsLoading.value = false
  }
}

const saveBankDetails = async () => {
  savingBank.value = true
  try {
    await $customFetch('/affiliate/profile', {
      method: 'PUT',
      body: bankForm.value
    })
    await fetchDashboard()
  } catch (error) {
    console.error('Error saving bank details:', error)
  } finally {
    savingBank.value = false
  }
}

const submitBecomeAffiliate = async () => {
  becomingAffiliate.value = true
  try {
    await $customFetch('/affiliate/become', {
      method: 'POST',
      body: becomeForm.value
    })
    showBecomeModal.value = false
    await fetchDashboard()
  } catch (error) {
    console.error('Error becoming affiliate:', error)
  } finally {
    becomingAffiliate.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const formatMoney = (amount) => {
  return Number(amount || 0).toFixed(2)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

// Watch tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'referrals' && referrals.value.length === 0 && affiliate.value) {
    fetchReferrals()
  } else if (newTab === 'conversions' && conversions.value.length === 0 && affiliate.value) {
    fetchConversions()
  } else if (newTab === 'payouts' && payouts.value.length === 0 && affiliate.value) {
    fetchPayouts()
  }
})

// Lifecycle
onMounted(async () => {
  await fetchDashboard()
  if (affiliate.value) {
    fetchReferrals()
  }
})
</script>
