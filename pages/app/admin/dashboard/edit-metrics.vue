<!-- pages/app/admin/dashboard/edit-metrics.vue -->
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center gap-3 sm:gap-4">
          <NuxtLink 
            to="/app/admin/dashboard" 
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </NuxtLink>
          <div>
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{{ t.editMetrics }}</h1>
            <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{{ t.editMetricsSubtitle }} - {{ monthName }} {{ year }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Error Alert -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="errorMessage" class="mb-4 sm:mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 shadow-sm">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <p class="ml-3 text-sm font-medium text-red-800 flex-1">{{ errorMessage }}</p>
            <button @click="errorMessage = ''" class="ml-3 flex-shrink-0">
              <svg class="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Success Alert -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="successMessage" class="mb-4 sm:mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-3 sm:p-4 shadow-sm">
          <div class="flex">
            <svg class="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <p class="ml-3 text-sm font-medium text-green-800 flex-1">{{ successMessage }}</p>
            <button @click="successMessage = ''" class="ml-3 flex-shrink-0">
              <svg class="w-5 h-5 text-green-400 hover:text-green-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        
        <!-- 🔥 GRANULAR CONTROL INFO CARD 🔥 -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl shadow-sm border border-blue-200 p-4 sm:p-6">
          <div class="flex items-start gap-3">
            <div class="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-blue-900 mb-1">{{ t.granularControlTitle }}</h2>
              <p class="text-sm text-blue-700 leading-relaxed">
                {{ t.granularControlDescription }}
              </p>
            </div>
          </div>
        </div>

        <!-- 💰 FINANCIAL METRICS CARD 💰 -->
        <div 
          :class="[
            'bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8 transition-all duration-300',
            form.is_financial_manual ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-gray-100'
          ]"
        >
          <!-- Card Header with Toggle -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <div class="flex items-center gap-3">
              <div :class="['p-2 rounded-lg', form.is_financial_manual ? 'bg-emerald-100' : 'bg-gray-100']">
                <svg class="w-5 h-5" :class="form.is_financial_manual ? 'text-emerald-600' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t.financialMetrics }}</h2>
            </div>
            
            <!-- Toggle -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium" :class="form.is_financial_manual ? 'text-emerald-700' : 'text-gray-500'">
                {{ form.is_financial_manual ? t.manualMode : t.autoMode }}
              </span>
              <button
                type="button"
                @click="toggleFinancialManual"
                :class="[
                  'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                  form.is_financial_manual ? 'bg-emerald-500 focus:ring-emerald-500' : 'bg-gray-300 focus:ring-gray-400'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    form.is_financial_manual ? 'translate-x-7' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Calculated Values Display (always show for reference) -->
          <div v-if="calculatedValues.financial" class="mb-4 p-3 rounded-lg" :class="form.is_financial_manual ? 'bg-gray-50 border border-gray-200' : 'bg-emerald-50 border border-emerald-200'">
            <p class="text-xs font-semibold uppercase tracking-wider mb-2" :class="form.is_financial_manual ? 'text-gray-500' : 'text-emerald-700'">
              {{ form.is_financial_manual ? t.calculatedForComparison : t.currentCalculatedValues }}
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500">{{ t.totalRevenue }}</p>
                <p class="text-lg font-bold" :class="form.is_financial_manual ? 'text-gray-700' : 'text-emerald-700'">${{ formatMoney(calculatedValues.financial.revenue) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">{{ t.totalExpenses }}</p>
                <p class="text-lg font-bold" :class="form.is_financial_manual ? 'text-gray-700' : 'text-red-600'">${{ formatMoney(calculatedValues.financial.expenses) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Manual Input Fields -->
          <div v-if="form.is_financial_manual" class="space-y-4">
            <!-- Revenue -->
            <div>
              <label for="total_revenue" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ t.totalRevenue }} <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  v-model.number="form.total_revenue"
                  type="number"
                  id="total_revenue"
                  step="0.01"
                  min="0"
                  :placeholder="t.revenuePlaceholder"
                  required
                  class="w-full pl-8 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-emerald-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
              </div>
            </div>

            <!-- Expenses -->
            <div>
              <label for="total_expenses" class="block text-sm font-medium text-gray-700 mb-1.5">
                {{ t.totalExpenses }} <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  v-model.number="form.total_expenses"
                  type="number"
                  id="total_expenses"
                  step="0.01"
                  min="0"
                  :placeholder="t.expensesPlaceholder"
                  required
                  class="w-full pl-8 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-emerald-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
              </div>
            </div>

            <!-- Profit (Calculated) -->
            <div class="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <label class="block text-sm font-medium text-emerald-900 mb-1">{{ t.netProfit }}</label>
              <p :class="['text-2xl font-bold', calculatedProfit >= 0 ? 'text-green-600' : 'text-red-600']">
                {{ calculatedProfit >= 0 ? '' : '-' }}${{ formatMoney(Math.abs(calculatedProfit)) }}
              </p>
              <p class="text-xs text-emerald-700 mt-1">{{ t.autoCalculated }}</p>
            </div>
          </div>

          <!-- Auto mode message -->
          <div v-else class="text-center py-4">
            <p class="text-sm text-gray-500">{{ t.financialAutoDescription }}</p>
          </div>
        </div>

        <!-- 📦 ORDER METRICS CARD 📦 -->
        <div 
          :class="[
            'bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8 transition-all duration-300',
            form.is_orders_manual ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'
          ]"
        >
          <!-- Card Header with Toggle -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <div class="flex items-center gap-3">
              <div :class="['p-2 rounded-lg', form.is_orders_manual ? 'bg-blue-100' : 'bg-gray-100']">
                <svg class="w-5 h-5" :class="form.is_orders_manual ? 'text-blue-600' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t.orderMetrics }}</h2>
            </div>
            
            <!-- Toggle -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium" :class="form.is_orders_manual ? 'text-blue-700' : 'text-gray-500'">
                {{ form.is_orders_manual ? t.manualMode : t.autoMode }}
              </span>
              <button
                type="button"
                @click="toggleOrdersManual"
                :class="[
                  'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                  form.is_orders_manual ? 'bg-blue-500 focus:ring-blue-500' : 'bg-gray-300 focus:ring-gray-400'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    form.is_orders_manual ? 'translate-x-7' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Calculated Values Display -->
          <div v-if="calculatedValues.orders !== null" class="mb-4 p-3 rounded-lg" :class="form.is_orders_manual ? 'bg-gray-50 border border-gray-200' : 'bg-blue-50 border border-blue-200'">
            <p class="text-xs font-semibold uppercase tracking-wider mb-2" :class="form.is_orders_manual ? 'text-gray-500' : 'text-blue-700'">
              {{ form.is_orders_manual ? t.calculatedForComparison : t.currentCalculatedValues }}
            </p>
            <p class="text-2xl font-bold" :class="form.is_orders_manual ? 'text-gray-700' : 'text-blue-700'">{{ calculatedValues.orders }}</p>
          </div>
          
          <!-- Manual Input -->
          <div v-if="form.is_orders_manual">
            <label for="total_orders" class="block text-sm font-medium text-gray-700 mb-1.5">
              {{ t.totalOrders }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.total_orders"
              type="number"
              id="total_orders"
              min="0"
              :placeholder="t.ordersPlaceholder"
              required
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-blue-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
          </div>

          <!-- Auto mode message -->
          <div v-else class="text-center py-4">
            <p class="text-sm text-gray-500">{{ t.ordersAutoDescription }}</p>
          </div>
        </div>

        <!-- 📦 BOX DISTRIBUTION CARD 📦 -->
        <div 
          :class="[
            'bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8 transition-all duration-300',
            form.is_boxes_manual ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-100'
          ]"
        >
          <!-- Card Header with Toggle -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <div class="flex items-center gap-3">
              <div :class="['p-2 rounded-lg', form.is_boxes_manual ? 'bg-amber-100' : 'bg-gray-100']">
                <svg class="w-5 h-5" :class="form.is_boxes_manual ? 'text-amber-600' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t.boxDistribution }}</h2>
            </div>
            
            <!-- Toggle -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium" :class="form.is_boxes_manual ? 'text-amber-700' : 'text-gray-500'">
                {{ form.is_boxes_manual ? t.manualMode : t.autoMode }}
              </span>
              <button
                type="button"
                @click="toggleBoxesManual"
                :class="[
                  'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
                  form.is_boxes_manual ? 'bg-amber-500 focus:ring-amber-500' : 'bg-gray-300 focus:ring-gray-400'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    form.is_boxes_manual ? 'translate-x-7' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>
          </div>

          <!-- Calculated Values Display -->
          <div v-if="calculatedValues.boxes" class="mb-4 p-3 rounded-lg" :class="form.is_boxes_manual ? 'bg-gray-50 border border-gray-200' : 'bg-amber-50 border border-amber-200'">
            <p class="text-xs font-semibold uppercase tracking-wider mb-2" :class="form.is_boxes_manual ? 'text-gray-500' : 'text-amber-700'">
              {{ form.is_boxes_manual ? t.calculatedForComparison : t.currentCalculatedValues }}
            </p>
            <div class="grid grid-cols-5 gap-2 text-center">
              <div>
                <p class="text-xs text-gray-500">XS</p>
                <p class="text-lg font-bold" :class="form.is_boxes_manual ? 'text-gray-700' : 'text-amber-700'">{{ calculatedValues.boxes['extra-small'] || 0 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">S</p>
                <p class="text-lg font-bold" :class="form.is_boxes_manual ? 'text-gray-700' : 'text-amber-700'">{{ calculatedValues.boxes['small'] || 0 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">M</p>
                <p class="text-lg font-bold" :class="form.is_boxes_manual ? 'text-gray-700' : 'text-amber-700'">{{ calculatedValues.boxes['medium'] || 0 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">L</p>
                <p class="text-lg font-bold" :class="form.is_boxes_manual ? 'text-gray-700' : 'text-amber-700'">{{ calculatedValues.boxes['large'] || 0 }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">XL</p>
                <p class="text-lg font-bold" :class="form.is_boxes_manual ? 'text-gray-700' : 'text-amber-700'">{{ calculatedValues.boxes['extra-large'] || 0 }}</p>
              </div>
            </div>
            <p class="text-center text-sm font-semibold mt-2" :class="form.is_boxes_manual ? 'text-gray-600' : 'text-amber-700'">
              {{ t.total }}: {{ calculatedValues.boxes.total || 0 }}
            </p>
          </div>
          
          <!-- Manual Input Fields -->
          <div v-if="form.is_boxes_manual">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <!-- Extra Small -->
              <div>
                <label for="boxes_extra_small" class="block text-sm font-medium text-gray-700 mb-1.5">
                  XS <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_extra_small"
                  type="number"
                  id="boxes_extra_small"
                  min="0"
                  placeholder="0"
                  required
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-amber-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Small -->
              <div>
                <label for="boxes_small" class="block text-sm font-medium text-gray-700 mb-1.5">
                  S <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_small"
                  type="number"
                  id="boxes_small"
                  min="0"
                  placeholder="0"
                  required
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-amber-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Medium -->
              <div>
                <label for="boxes_medium" class="block text-sm font-medium text-gray-700 mb-1.5">
                  M <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_medium"
                  type="number"
                  id="boxes_medium"
                  min="0"
                  placeholder="0"
                  required
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-amber-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Large -->
              <div>
                <label for="boxes_large" class="block text-sm font-medium text-gray-700 mb-1.5">
                  L <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_large"
                  type="number"
                  id="boxes_large"
                  min="0"
                  placeholder="0"
                  required
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-amber-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Extra Large -->
              <div>
                <label for="boxes_extra_large" class="block text-sm font-medium text-gray-700 mb-1.5">
                  XL <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.boxes_extra_large"
                  type="number"
                  id="boxes_extra_large"
                  min="0"
                  placeholder="0"
                  required
                  class="w-full px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-amber-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                >
              </div>
            </div>

            <!-- Total Boxes Display -->
            <div class="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p class="text-sm text-amber-900">
                {{ t.totalBoxes }}: <span class="font-bold text-lg">{{ totalBoxes }}</span>
              </p>
            </div>
          </div>

          <!-- Auto mode message -->
          <div v-else class="text-center py-4">
            <p class="text-sm text-gray-500">{{ t.boxesAutoDescription }}</p>
          </div>
        </div>

        <!-- 📊 MARKETING METRICS CARD (ALWAYS MANUAL) 📊 -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-purple-200 ring-2 ring-purple-100 p-4 sm:p-6 lg:p-8">
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t.marketingMetrics }}</h2>
              <p class="text-xs text-purple-600 font-medium">{{ t.alwaysManual }}</p>
            </div>
          </div>
          
          <div>
            <label for="total_conversations" class="block text-sm font-medium text-gray-700 mb-1.5">
              {{ t.totalConversations }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.total_conversations"
              type="number"
              id="total_conversations"
              min="0"
              :placeholder="t.conversationsPlaceholder"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-purple-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            >
            <p class="text-xs text-gray-500 mt-1">{{ t.conversationsHelp }}</p>
          </div>
        </div>

        <!-- 📝 NOTES CARD 📝 -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{{ t.notes }}</h2>
          
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1.5">
              {{ t.notesLabel }}
            </label>
            <textarea
              v-model="form.notes"
              id="notes"
              rows="4"
              :placeholder="t.notesPlaceholder"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ t.notesHelp }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
          <NuxtLink
            to="/app/admin/dashboard"
            class="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 font-medium rounded-lg sm:rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-center text-sm sm:text-base"
          >
            {{ t.cancel }}
          </NuxtLink>
          
          <button
            type="submit"
            :disabled="saving"
            class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!saving">{{ t.saveMetrics }}</span>
            <span v-else>{{ t.saving }}</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

const { $customFetch, $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { t: createTranslations } = useLanguage()

// Get year and month from query params
const year = ref(parseInt(route.query.year) || new Date().getFullYear())
const month = ref(parseInt(route.query.month) || new Date().getMonth() + 1)

// State
const loading = ref(true)
const saving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Calculated values from API (for comparison) - these are ALWAYS the DB calculated values
const calculatedValues = ref({
  financial: null,
  orders: null,
  boxes: null
})

const form = ref({
  // Granular manual flags
  is_financial_manual: false,
  is_orders_manual: false,
  is_boxes_manual: false,
  // Financial
  total_revenue: 0,
  total_expenses: 0,
  // Orders
  total_orders: 0,
  // Boxes
  boxes_extra_small: 0,
  boxes_small: 0,
  boxes_medium: 0,
  boxes_large: 0,
  boxes_extra_large: 0,
  // Marketing (always manual)
  total_conversations: 0,
  // Notes
  notes: ''
})

// Computed
const calculatedProfit = computed(() => {
  return form.value.total_revenue - form.value.total_expenses
})

const totalBoxes = computed(() => {
  return form.value.boxes_extra_small +
         form.value.boxes_small +
         form.value.boxes_medium +
         form.value.boxes_large +
         form.value.boxes_extra_large
})

const monthName = computed(() => {
  const date = new Date(year.value, month.value - 1)
  return date.toLocaleDateString('es-MX', { month: 'long' })
})

// Translations
const translations = {
  editMetrics: { es: 'Editar Métricas', en: 'Edit Metrics' },
  editMetricsSubtitle: { es: 'Editar métricas del mes', en: 'Edit metrics for the month' },
  granularControlTitle: { es: 'Control Granular', en: 'Granular Control' },
  granularControlDescription: { 
    es: 'Cada sección puede ser manual o automática de forma independiente. Activa el modo manual solo para las secciones que necesitas controlar manualmente.', 
    en: 'Each section can be manual or automatic independently. Enable manual mode only for sections you need to control manually.' 
  },
  manualMode: { es: 'Manual', en: 'Manual' },
  autoMode: { es: 'Auto', en: 'Auto' },
  calculatedForComparison: { es: 'Valores calculados (referencia)', en: 'Calculated values (reference)' },
  currentCalculatedValues: { es: 'Valores actuales (calculados desde DB)', en: 'Current values (calculated from DB)' },
  financialMetrics: { es: 'Métricas Financieras', en: 'Financial Metrics' },
  financialAutoDescription: { es: 'Los ingresos y gastos se calcularán automáticamente desde las órdenes pagadas y la tabla de gastos.', en: 'Revenue and expenses will be calculated automatically from paid orders and expenses table.' },
  totalRevenue: { es: 'Ingresos Totales', en: 'Total Revenue' },
  revenuePlaceholder: { es: '45000.00', en: '45000.00' },
  totalExpenses: { es: 'Gastos Totales', en: 'Total Expenses' },
  expensesPlaceholder: { es: '12000.00', en: '12000.00' },
  netProfit: { es: 'Ganancia Neta', en: 'Net Profit' },
  autoCalculated: { es: 'Calculado automáticamente', en: 'Automatically calculated' },
  orderMetrics: { es: 'Métricas de Órdenes', en: 'Order Metrics' },
  ordersAutoDescription: { es: 'El total de órdenes se calculará automáticamente desde la base de datos.', en: 'Total orders will be calculated automatically from the database.' },
  totalOrders: { es: 'Órdenes Totales', en: 'Total Orders' },
  ordersPlaceholder: { es: '87', en: '87' },
  boxDistribution: { es: 'Distribución de Cajas', en: 'Box Distribution' },
  boxesAutoDescription: { es: 'La distribución de cajas se calculará automáticamente desde las órdenes.', en: 'Box distribution will be calculated automatically from orders.' },
  totalBoxes: { es: 'Total de Cajas', en: 'Total Boxes' },
  total: { es: 'Total', en: 'Total' },
  marketingMetrics: { es: 'Métricas de Marketing', en: 'Marketing Metrics' },
  alwaysManual: { es: 'Siempre manual - no se calcula desde DB', en: 'Always manual - not calculated from DB' },
  totalConversations: { es: 'Total de Conversaciones', en: 'Total Conversations' },
  conversationsPlaceholder: { es: '450', en: '450' },
  conversationsHelp: { es: 'Conversaciones en WhatsApp, Meta, etc.', en: 'Conversations on WhatsApp, Meta, etc.' },
  notes: { es: 'Notas', en: 'Notes' },
  notesLabel: { es: 'Notas Opcionales', en: 'Optional Notes' },
  notesPlaceholder: { es: 'Ej: Gran mes, temporada alta, promoción especial...', en: 'Ex: Great month, high season, special promotion...' },
  notesHelp: { es: 'Cualquier nota o comentario sobre este mes', en: 'Any notes or comments about this month' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  saveMetrics: { es: 'Guardar Métricas', en: 'Save Metrics' },
  saving: { es: 'Guardando...', en: 'Saving...' },
  successMessage: { es: '¡Métricas guardadas exitosamente!', en: 'Metrics saved successfully!' },
  errorSaving: { es: 'Error al guardar las métricas. Intenta de nuevo.', en: 'Error saving metrics. Please try again.' },
}

const t = createTranslations(translations)

// Toggle handlers - swap form values when toggling between manual/auto
const toggleFinancialManual = () => {
  form.value.is_financial_manual = !form.value.is_financial_manual
  
  // When switching to auto, populate form with calculated values
  if (!form.value.is_financial_manual && calculatedValues.value.financial) {
    form.value.total_revenue = calculatedValues.value.financial.revenue || 0
    form.value.total_expenses = calculatedValues.value.financial.expenses || 0
  }
}

const toggleOrdersManual = () => {
  form.value.is_orders_manual = !form.value.is_orders_manual
  
  // When switching to auto, populate form with calculated values
  if (!form.value.is_orders_manual && calculatedValues.value.orders !== null) {
    form.value.total_orders = calculatedValues.value.orders || 0
  }
}

const toggleBoxesManual = () => {
  form.value.is_boxes_manual = !form.value.is_boxes_manual
  
  // When switching to auto, populate form with calculated values
  if (!form.value.is_boxes_manual && calculatedValues.value.boxes) {
    form.value.boxes_extra_small = calculatedValues.value.boxes['extra-small'] || 0
    form.value.boxes_small = calculatedValues.value.boxes['small'] || 0
    form.value.boxes_medium = calculatedValues.value.boxes['medium'] || 0
    form.value.boxes_large = calculatedValues.value.boxes['large'] || 0
    form.value.boxes_extra_large = calculatedValues.value.boxes['extra-large'] || 0
  }
}

// Methods
const fetchExistingMetrics = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    // Fetch calculated values from dashboard
    const dashboardResponse = await $customFetch('/admin/dashboard', {
      params: {
        period: 'month',
        year: year.value,
        month: month.value
      }
    })

    if (dashboardResponse.data) {
      // Extract calculated financial values
      // IMPORTANT: Use calculated_value for revenue and calculated_total for expenses
      // These are the TRUE DB values, not the manual overrides
      if (dashboardResponse.data.financial) {
        const financial = dashboardResponse.data.financial
        calculatedValues.value.financial = {
          // Use calculated_value if available (when manual mode is on), otherwise use period_total
          revenue: financial.revenue?.calculated_value ?? financial.revenue?.period_total ?? 0,
          // Use calculated_total if available (when manual mode is on), otherwise use total
          expenses: financial.expenses?.calculated_total ?? financial.expenses?.total ?? 0
        }
      }

      // Extract calculated orders - use the calculated value
      if (dashboardResponse.data.financial?.metrics) {
        calculatedValues.value.orders = dashboardResponse.data.financial.metrics.total_orders_calculated ?? 
                                         dashboardResponse.data.financial.metrics.total_orders ?? 0
      }

      // Extract calculated boxes - use the calculated object if in manual mode
      if (dashboardResponse.data.box_distribution) {
        const boxes = dashboardResponse.data.box_distribution
        // If there's a calculated object, use that (means we're in manual mode)
        // Otherwise use the main values (means we're in auto mode)
        const boxSource = boxes.calculated || boxes
        calculatedValues.value.boxes = {
          'extra-small': boxSource['extra-small'] ?? 0,
          'small': boxSource['small'] ?? 0,
          'medium': boxSource['medium'] ?? 0,
          'large': boxSource['large'] ?? 0,
          'extra-large': boxSource['extra-large'] ?? 0,
          'total': boxSource['total'] ?? 0
        }
      }
    }

    // Fetch existing manual metrics
    const metricsResponse = await $customFetch('/admin/dashboard/manual-metrics', {
      params: {
        year: year.value,
        month: month.value
      }
    })
    
    if (metricsResponse.data) {
      // Load the manual flags
      const isFinancialManual = metricsResponse.data.is_financial_manual || metricsResponse.data.is_manual_mode || false
      const isOrdersManual = metricsResponse.data.is_orders_manual || metricsResponse.data.is_manual_mode || false
      const isBoxesManual = metricsResponse.data.is_boxes_manual || metricsResponse.data.is_manual_mode || false

      form.value.is_financial_manual = isFinancialManual
      form.value.is_orders_manual = isOrdersManual
      form.value.is_boxes_manual = isBoxesManual

      // For financial: use manual values if in manual mode, otherwise use calculated
      if (isFinancialManual) {
        form.value.total_revenue = metricsResponse.data.total_revenue || 0
        form.value.total_expenses = metricsResponse.data.total_expenses || 0
      } else {
        form.value.total_revenue = calculatedValues.value.financial?.revenue || 0
        form.value.total_expenses = calculatedValues.value.financial?.expenses || 0
      }

      // For orders: use manual values if in manual mode, otherwise use calculated
      if (isOrdersManual) {
        form.value.total_orders = metricsResponse.data.total_orders || 0
      } else {
        form.value.total_orders = calculatedValues.value.orders || 0
      }

      // For boxes: use manual values if in manual mode, otherwise use calculated
      if (isBoxesManual) {
        form.value.boxes_extra_small = metricsResponse.data.boxes_extra_small || 0
        form.value.boxes_small = metricsResponse.data.boxes_small || 0
        form.value.boxes_medium = metricsResponse.data.boxes_medium || 0
        form.value.boxes_large = metricsResponse.data.boxes_large || 0
        form.value.boxes_extra_large = metricsResponse.data.boxes_extra_large || 0
      } else {
        form.value.boxes_extra_small = calculatedValues.value.boxes?.['extra-small'] || 0
        form.value.boxes_small = calculatedValues.value.boxes?.['small'] || 0
        form.value.boxes_medium = calculatedValues.value.boxes?.['medium'] || 0
        form.value.boxes_large = calculatedValues.value.boxes?.['large'] || 0
        form.value.boxes_extra_large = calculatedValues.value.boxes?.['extra-large'] || 0
      }

      // Conversations are always manual
      form.value.total_conversations = metricsResponse.data.total_conversations || 0
      form.value.notes = metricsResponse.data.notes || ''
    } else {
      // No manual metrics exist - initialize form with calculated values
      form.value.total_revenue = calculatedValues.value.financial?.revenue || 0
      form.value.total_expenses = calculatedValues.value.financial?.expenses || 0
      form.value.total_orders = calculatedValues.value.orders || 0
      form.value.boxes_extra_small = calculatedValues.value.boxes?.['extra-small'] || 0
      form.value.boxes_small = calculatedValues.value.boxes?.['small'] || 0
      form.value.boxes_medium = calculatedValues.value.boxes?.['medium'] || 0
      form.value.boxes_large = calculatedValues.value.boxes?.['large'] || 0
      form.value.boxes_extra_large = calculatedValues.value.boxes?.['extra-large'] || 0
    }
  } catch (error) {
    console.error('Error fetching metrics:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const total_profit = form.value.total_revenue - form.value.total_expenses
    
    await $customFetch('/admin/dashboard/manual-metrics', {
      method: 'POST',
      body: {
        year: year.value,
        month: month.value,
        // Granular flags
        is_financial_manual: form.value.is_financial_manual,
        is_orders_manual: form.value.is_orders_manual,
        is_boxes_manual: form.value.is_boxes_manual,
        // Financial (only matters if is_financial_manual is true)
        total_revenue: form.value.total_revenue,
        total_expenses: form.value.total_expenses,
        total_profit: total_profit,
        // Orders (only matters if is_orders_manual is true)
        total_orders: form.value.total_orders,
        // Boxes (only matters if is_boxes_manual is true)
        boxes_extra_small: form.value.boxes_extra_small,
        boxes_small: form.value.boxes_small,
        boxes_medium: form.value.boxes_medium,
        boxes_large: form.value.boxes_large,
        boxes_extra_large: form.value.boxes_extra_large,
        // Marketing (always used)
        total_conversations: form.value.total_conversations,
        // Notes
        notes: form.value.notes
      }
    })
    
    successMessage.value = t.value.successMessage

    $toast.success(t.value.successMessage)
    
    await navigateTo('/app/admin/dashboard')
    
  } catch (error) {
    console.error('Error saving metrics:', error)
    $toast.error(error.data?.message || t.value.errorSaving)
    errorMessage.value = t.value.errorSaving
  } finally {
    saving.value = false
  }
}

const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

onMounted(() => {
  fetchExistingMetrics()
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>