<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-3 sm:gap-4 min-w-0">
            <NuxtLink
              to="/app/admin/affiliates"
              class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex-shrink-0"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div class="min-w-0">
              <h1 class="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 truncate">{{ affiliate?.user?.name || t.affiliateDetails }}</h1>
              <p class="text-xs sm:text-sm text-gray-500 truncate">{{ affiliate?.user?.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <NuxtLink
              :to="`/app/admin/affiliates/${route.params.id}/edit`"
              class="inline-flex items-center justify-center flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ t.edit }}
            </NuxtLink>
            <button
              @click="showPayoutModal = true"
              :disabled="!affiliate?.pending_earnings || affiliate?.pending_earnings <= 0"
              class="inline-flex items-center justify-center flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <svg class="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="hidden xs:inline">{{ t.recordPayout }}</span>
              <span class="xs:hidden">{{ t.payout }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
        <svg class="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-500">{{ t.loading }}</p>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <!-- Affiliate Info Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 sm:p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <!-- Left: Basic Info -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xl sm:text-2xl font-bold text-primary-700">{{ affiliate?.user?.name?.charAt(0).toUpperCase() || 'A' }}</span>
                </div>
                <div class="min-w-0">
                  <h2 class="text-lg sm:text-xl font-bold text-gray-900 truncate">{{ affiliate?.user?.name }}</h2>
                  <span :class="getStatusBadgeClass(affiliate?.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1">
                    {{ getStatusLabel(affiliate?.status) }}
                  </span>
                </div>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ affiliate?.user?.email }}
                </div>
                <div v-if="affiliate?.user?.phone" class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ affiliate?.user?.phone }}
                </div>
              </div>

              <!-- Commission Info -->
              <div class="pt-4 border-t border-gray-100">
                <p class="text-sm text-gray-500 mb-1">{{ t.commission }}</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ affiliate?.commission_type === 'percentage' ? `${affiliate?.commission_value}%` : `$${affiliate?.commission_value} ${t.fixed}` }}
                </p>
              </div>
            </div>

            <!-- Right: Code & Link -->
            <div class="space-y-3 sm:space-y-4">
              <!-- Affiliate Code -->
              <div class="bg-gray-50 rounded-xl p-3 sm:p-4">
                <p class="text-xs sm:text-sm text-gray-500 mb-2">{{ t.affiliateCode }}</p>
                <div class="flex items-center gap-2">
                  <code class="flex-1 bg-white px-3 sm:px-4 py-2 rounded-lg border border-gray-200 font-mono text-base sm:text-lg text-primary-600 truncate">
                    {{ affiliate?.affiliate_code }}
                  </code>
                  <button
                    @click="copyToClipboard(affiliate?.affiliate_code)"
                    class="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex-shrink-0"
                  >
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Referral Link -->
              <div class="bg-gray-50 rounded-xl p-3 sm:p-4">
                <p class="text-xs sm:text-sm text-gray-500 mb-2">{{ t.referralLink }}</p>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    readonly
                    :value="referralLink"
                    class="flex-1 min-w-0 bg-white px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-600 truncate"
                  />
                  <button
                    @click="copyToClipboard(referralLink)"
                    class="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex-shrink-0"
                  >
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Bank Details -->
              <div v-if="affiliate?.bank_details?.beneficiary_name || affiliate?.bank_details?.bank_name" class="bg-gray-50 rounded-xl p-3 sm:p-4">
                <p class="text-xs sm:text-sm text-gray-500 mb-2">{{ t.bankDetails }}</p>
                <div class="space-y-1 text-xs sm:text-sm">
                  <p v-if="affiliate?.bank_details?.beneficiary_name"><span class="text-gray-500">{{ t.beneficiary }}:</span> {{ affiliate?.bank_details?.beneficiary_name }}</p>
                  <p v-if="affiliate?.bank_details?.bank_name"><span class="text-gray-500">{{ t.bank }}:</span> {{ affiliate?.bank_details?.bank_name }}</p>
                  <p v-if="affiliate?.bank_details?.account_number"><span class="text-gray-500">{{ t.account }}:</span> {{ affiliate?.bank_details?.account_number }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.totalReferrals }}</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ affiliate?.stats?.referral_count || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.totalConversions }}</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ affiliate?.stats?.conversion_count || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.totalEarnings }}</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">${{ formatMoney(affiliate?.total_earnings || 0) }}</p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.paidOut }}</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">${{ formatMoney(affiliate?.paid_earnings || 0) }}</p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 col-span-2 sm:col-span-3 lg:col-span-1">
          <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ t.pendingPayout }}</p>
          <p class="text-xl sm:text-2xl font-bold text-green-600">${{ formatMoney(affiliate?.pending_earnings || 0) }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-100 overflow-x-auto">
          <nav class="flex min-w-max">
            <button
              @click="activeTab = 'conversions'"
              :class="[
                'px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === 'conversions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.conversions }}
            </button>
            <button
              @click="activeTab = 'payouts'"
              :class="[
                'px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === 'payouts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ t.payouts }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-4 sm:p-6">
          <!-- Conversions Tab -->
          <div v-if="activeTab === 'conversions'">
            <div v-if="conversionsLoading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else-if="conversions.length === 0" class="text-center py-8 text-gray-500">
              {{ t.noConversions }}
            </div>
            <div v-else>
              <!-- Mobile Card View -->
              <div class="sm:hidden space-y-3">
                <div v-for="conversion in conversions" :key="conversion.id" class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <NuxtLink :to="`/app/admin/orders/${conversion.order?.id || conversion.order_id}`" class="text-sm font-semibold text-primary-600 hover:underline">
                        #{{ conversion.order?.order_number || conversion.order_id }}
                      </NuxtLink>
                      <p class="text-xs text-gray-500 mt-0.5">{{ conversion.referred_user?.name }}</p>
                    </div>
                    <span :class="getConversionStatusClass(conversion.status)" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                      {{ conversion.status }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p class="text-xs text-gray-500">{{ t.orderAmount }}</p>
                      <p class="font-medium text-gray-900">${{ formatMoney(conversion.order_amount) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">{{ t.commissionAmount }}</p>
                      <p class="font-semibold text-green-600">${{ formatMoney(conversion.commission_amount) }}</p>
                    </div>
                  </div>
                  <p class="text-xs text-gray-400 mt-3">{{ formatDate(conversion.created_at) }}</p>
                </div>
              </div>
              <!-- Desktop Table View -->
              <div class="hidden sm:block overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.order }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.customer }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.orderAmount }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.commissionAmount }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.status }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.date }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="conversion in conversions" :key="conversion.id" class="hover:bg-gray-50">
                      <td class="px-4 py-3 text-sm">
                        <NuxtLink :to="`/app/admin/orders/${conversion.order?.id || conversion.order_id}`" class="text-primary-600 hover:underline">
                          #{{ conversion.order?.order_number || conversion.order_id }}
                        </NuxtLink>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-900">{{ conversion.referred_user?.name }}</td>
                      <td class="px-4 py-3 text-sm text-gray-900">${{ formatMoney(conversion.order_amount) }}</td>
                      <td class="px-4 py-3 text-sm font-semibold text-gray-900">${{ formatMoney(conversion.commission_amount) }}</td>
                      <td class="px-4 py-3">
                        <span :class="getConversionStatusClass(conversion.status)" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                          {{ conversion.status }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(conversion.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Payouts Tab -->
          <div v-if="activeTab === 'payouts'">
            <div v-if="payoutsLoading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else-if="payouts.length === 0" class="text-center py-8 text-gray-500">
              {{ t.noPayouts }}
            </div>
            <div v-else>
              <!-- Mobile Card View -->
              <div class="sm:hidden space-y-3">
                <div v-for="payout in payouts" :key="payout.id" class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div class="flex items-start justify-between mb-2">
                    <p class="text-lg font-bold text-green-600">${{ formatMoney(payout.amount) }}</p>
                    <p class="text-xs text-gray-400">{{ formatDate(payout.paid_at || payout.created_at) }}</p>
                  </div>
                  <div class="space-y-1 text-sm">
                    <p v-if="payout.notes" class="text-gray-600">{{ payout.notes }}</p>
                    <p v-if="payout.paid_by?.name" class="text-xs text-gray-500">{{ t.paidBy }}: {{ payout.paid_by?.name }}</p>
                  </div>
                </div>
              </div>
              <!-- Desktop Table View -->
              <div class="hidden sm:block overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.amount }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.notes }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.paidBy }}</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ t.date }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="payout in payouts" :key="payout.id" class="hover:bg-gray-50">
                      <td class="px-4 py-3 text-sm font-semibold text-green-600">${{ formatMoney(payout.amount) }}</td>
                      <td class="px-4 py-3 text-sm text-gray-600">{{ payout.notes || '-' }}</td>
                      <td class="px-4 py-3 text-sm text-gray-900">{{ payout.paid_by?.name || '-' }}</td>
                      <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(payout.paid_at || payout.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Button -->
      <div class="flex justify-end">
        <button
          @click="showDeleteModal = true"
          class="inline-flex items-center px-4 py-2 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-300"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {{ t.deleteAffiliate }}
        </button>
      </div>
    </div>

    <!-- Record Payout Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showPayoutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showPayoutModal = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ t.recordPayout }}</h3>

            <div class="space-y-4">
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-sm text-gray-500">{{ t.currentPending }}</p>
                <p class="text-2xl font-bold text-green-600">${{ formatMoney(affiliate?.pending_earnings || 0) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.payoutAmount }}</label>
                <input
                  v-model="payoutForm.amount"
                  type="number"
                  step="0.01"
                  :max="affiliate?.pending_earnings"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.enterAmount"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">{{ t.notes }} ({{ t.optional }})</label>
                <textarea
                  v-model="payoutForm.notes"
                  rows="2"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  :placeholder="t.notesPlaceholder"
                ></textarea>
              </div>
            </div>

            <div class="flex gap-3 mt-6">
              <button
                @click="showPayoutModal = false"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
              >
                {{ t.cancel }}
              </button>
              <button
                @click="submitPayout"
                :disabled="payoutSubmitting || !payoutForm.amount || payoutForm.amount <= 0"
                class="flex-1 px-4 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {{ payoutSubmitting ? t.processing : t.confirmPayout }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showDeleteModal = false">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ t.confirmDelete }}</h3>
            <p class="text-gray-500 mb-6">{{ t.deleteWarning }}</p>

            <div class="flex gap-3">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
              >
                {{ t.cancel }}
              </button>
              <button
                @click="deleteAffiliate"
                :disabled="deleting"
                class="flex-1 px-4 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 disabled:opacity-50 transition-all"
              >
                {{ deleting ? t.deleting : t.delete }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

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
const activeTab = ref('conversions')
const conversions = ref([])
const conversionsLoading = ref(false)
const payouts = ref([])
const payoutsLoading = ref(false)
const showPayoutModal = ref(false)
const showDeleteModal = ref(false)
const payoutSubmitting = ref(false)
const deleting = ref(false)
const payoutForm = ref({
  amount: '',
  notes: ''
})

// Translations
const translations = {
  affiliateDetails: { es: 'Detalles del Afiliado', en: 'Affiliate Details' },
  edit: { es: 'Editar', en: 'Edit' },
  recordPayout: { es: 'Registrar Pago', en: 'Record Payout' },
  loading: { es: 'Cargando...', en: 'Loading...' },
  commission: { es: 'Comisión', en: 'Commission' },
  fixed: { es: 'fijo', en: 'fixed' },
  affiliateCode: { es: 'Código de Afiliado', en: 'Affiliate Code' },
  referralLink: { es: 'Link de Referido', en: 'Referral Link' },
  bankDetails: { es: 'Datos Bancarios', en: 'Bank Details' },
  beneficiary: { es: 'Beneficiario', en: 'Beneficiary' },
  bank: { es: 'Banco', en: 'Bank' },
  account: { es: 'Cuenta', en: 'Account' },
  totalReferrals: { es: 'Total Referidos', en: 'Total Referrals' },
  totalConversions: { es: 'Total Conversiones', en: 'Total Conversions' },
  totalEarnings: { es: 'Ganancias Totales', en: 'Total Earnings' },
  paidOut: { es: 'Pagado', en: 'Paid Out' },
  pendingPayout: { es: 'Pendiente de Pago', en: 'Pending Payout' },
  conversions: { es: 'Conversiones', en: 'Conversions' },
  payouts: { es: 'Pagos', en: 'Payouts' },
  noConversions: { es: 'No hay conversiones aún', en: 'No conversions yet' },
  noPayouts: { es: 'No hay pagos registrados', en: 'No payouts recorded' },
  order: { es: 'Orden', en: 'Order' },
  customer: { es: 'Cliente', en: 'Customer' },
  orderAmount: { es: 'Monto Orden', en: 'Order Amount' },
  commissionAmount: { es: 'Comisión', en: 'Commission' },
  status: { es: 'Estado', en: 'Status' },
  date: { es: 'Fecha', en: 'Date' },
  amount: { es: 'Monto', en: 'Amount' },
  notes: { es: 'Notas', en: 'Notes' },
  paidBy: { es: 'Pagado por', en: 'Paid by' },
  deleteAffiliate: { es: 'Eliminar Afiliado', en: 'Delete Affiliate' },
  confirmDelete: { es: '¿Eliminar afiliado?', en: 'Delete affiliate?' },
  deleteWarning: { es: 'Esta acción no se puede deshacer. Se eliminarán todos los datos del afiliado.', en: 'This action cannot be undone. All affiliate data will be deleted.' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  delete: { es: 'Eliminar', en: 'Delete' },
  deleting: { es: 'Eliminando...', en: 'Deleting...' },
  currentPending: { es: 'Pendiente actual', en: 'Current pending' },
  payoutAmount: { es: 'Monto a pagar', en: 'Payout amount' },
  enterAmount: { es: 'Ingresa el monto', en: 'Enter amount' },
  optional: { es: 'opcional', en: 'optional' },
  notesPlaceholder: { es: 'Referencia de transferencia, etc.', en: 'Transfer reference, etc.' },
  confirmPayout: { es: 'Confirmar Pago', en: 'Confirm Payout' },
  processing: { es: 'Procesando...', en: 'Processing...' },
  statusActive: { es: 'Activo', en: 'Active' },
  statusPending: { es: 'Pendiente', en: 'Pending' },
  statusSuspended: { es: 'Suspendido', en: 'Suspended' },
  payout: { es: 'Pago', en: 'Payout' }
}

const t = createTranslations(translations)

// Computed
const referralLink = computed(() => {
  // Use API-provided referral_link if available, otherwise generate one
  if (affiliate.value?.referral_link) {
    return affiliate.value.referral_link
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://boxly.com'
  return `${baseUrl}?ref=${affiliate.value?.affiliate_code || ''}`
})

// Methods
const fetchAffiliate = async () => {
  loading.value = true
  try {
    const response = await $customFetch(`/admin/affiliates/${route.params.id}`)
    affiliate.value = response.data
  } catch (error) {
    console.error('Error fetching affiliate:', error)
  } finally {
    loading.value = false
  }
}

const fetchConversions = async () => {
  conversionsLoading.value = true
  try {
    const response = await $customFetch(`/admin/affiliates/${route.params.id}/conversions`)
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
    const response = await $customFetch(`/admin/affiliates/${route.params.id}/payouts`)
    payouts.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching payouts:', error)
  } finally {
    payoutsLoading.value = false
  }
}

const submitPayout = async () => {
  if (!payoutForm.value.amount || payoutForm.value.amount <= 0) return

  payoutSubmitting.value = true
  try {
    await $customFetch(`/admin/affiliates/${route.params.id}/record-payout`, {
      method: 'POST',
      body: {
        amount: payoutForm.value.amount,
        notes: payoutForm.value.notes || undefined
      }
    })

    showPayoutModal.value = false
    payoutForm.value = { amount: '', notes: '' }

    // Refresh data
    await fetchAffiliate()
    await fetchPayouts()
  } catch (error) {
    console.error('Error recording payout:', error)
  } finally {
    payoutSubmitting.value = false
  }
}

const deleteAffiliate = async () => {
  deleting.value = true
  try {
    await $customFetch(`/admin/affiliates/${route.params.id}`, {
      method: 'DELETE'
    })
    await navigateTo('/app/admin/affiliates')
  } catch (error) {
    console.error('Error deleting affiliate:', error)
  } finally {
    deleting.value = false
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
  if (!date) return '-'
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return '-'
  return parsed.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const maskAccountNumber = (account) => {
  if (!account) return ''
  return '****' + account.slice(-4)
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  const labels = {
    active: t.value.statusActive,
    pending: t.value.statusPending,
    suspended: t.value.statusSuspended
  }
  return labels[status] || status
}

const getConversionStatusClass = (status) => {
  const classes = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

// Watch tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'conversions' && conversions.value.length === 0) {
    fetchConversions()
  } else if (newTab === 'payouts' && payouts.value.length === 0) {
    fetchPayouts()
  }
})

// Lifecycle
onMounted(() => {
  fetchAffiliate()
  fetchConversions()
})
</script>
