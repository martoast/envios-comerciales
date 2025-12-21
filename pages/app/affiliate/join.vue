<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center gap-3 sm:gap-4">
          <NuxtLink
            to="/app"
            class="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
          <div>
            <h1 class="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900">{{ t.pageTitle }}</h1>
            <p class="text-xs sm:text-sm text-gray-500">{{ t.pageSubtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Hero Card -->
      <div class="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl p-6 sm:p-10 mb-8 shadow-xl">
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div class="relative">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
            <span class="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
            {{ t.badge }}
          </div>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">{{ t.heroTitle }}</h2>
          <p class="text-base sm:text-lg text-white/90 mb-6 max-w-xl">{{ t.heroDesc }}</p>

          <!-- Stats row -->
          <div class="flex flex-wrap gap-4 sm:gap-6">
            <div class="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span class="text-xl font-bold text-white">%</span>
              </div>
              <div>
                <p class="text-white font-bold text-lg">10%</p>
                <p class="text-white/70 text-xs">{{ t.perShipment }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </div>
              <div>
                <p class="text-white font-bold text-lg">{{ t.recurring }}</p>
                <p class="text-white/70 text-xs">{{ t.everyShipment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How it Works -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">{{ t.howItWorks }}</h3>
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">{{ t.step1Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.step1Desc }}</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">{{ t.step2Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.step2Desc }}</p>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">{{ t.step3Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.step3Desc }}</p>
          </div>
        </div>
      </div>

      <!-- Benefits -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-900 mb-4">{{ t.benefitsTitle }}</h3>
        <div class="grid sm:grid-cols-2 gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ t.benefit1 }}</p>
              <p class="text-xs text-gray-500">{{ t.benefit1Desc }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ t.benefit2 }}</p>
              <p class="text-xs text-gray-500">{{ t.benefit2Desc }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ t.benefit3 }}</p>
              <p class="text-xs text-gray-500">{{ t.benefit3Desc }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ t.benefit4 }}</p>
              <p class="text-xs text-gray-500">{{ t.benefit4Desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Join CTA Card -->
      <div class="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-6 sm:p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t.ctaTitle }}</h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">{{ t.ctaDesc }}</p>

        <button
          @click="joinAffiliateProgram"
          :disabled="submitting"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <svg v-if="submitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>{{ t.ctaButton }}</span>
          <svg v-if="!submitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p class="text-xs text-gray-500 mt-4">{{ t.ctaNote }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'customer']
})

const { $customFetch } = useNuxtApp()
const user = useUser()
const { t: createTranslations } = useLanguage()

const submitting = ref(false)

const translations = {
  pageTitle: { es: 'Programa de Afiliados', en: 'Affiliate Program' },
  pageSubtitle: { es: 'Gana dinero compartiendo Boxly', en: 'Earn money sharing Boxly' },
  badge: { es: 'Gratis para unirte', en: 'Free to join' },
  heroTitle: { es: 'Gana con cada referido', en: 'Earn with every referral' },
  heroDesc: { es: 'Comparte tu link único y recibe el 10% de comisión por cada envío que realicen tus referidos. Sin inversión, sin complicaciones.', en: 'Share your unique link and receive 10% commission on every shipment your referrals make. No investment, no hassle.' },
  perShipment: { es: 'por envío', en: 'per shipment' },
  recurring: { es: 'Recurrente', en: 'Recurring' },
  everyShipment: { es: 'cada envío', en: 'every shipment' },
  howItWorks: { es: '¿Cómo funciona?', en: 'How does it work?' },
  step1Title: { es: 'Obtén tu link', en: 'Get your link' },
  step1Desc: { es: 'Únete y recibe tu link de referido único', en: 'Join and get your unique referral link' },
  step2Title: { es: 'Comparte', en: 'Share' },
  step2Desc: { es: 'Comparte con amigos, familiares o en redes', en: 'Share with friends, family or on social media' },
  step3Title: { es: 'Gana', en: 'Earn' },
  step3Desc: { es: 'Recibe 10% por cada envío de tus referidos', en: 'Receive 10% on every shipment from referrals' },
  benefitsTitle: { es: 'Beneficios del programa', en: 'Program benefits' },
  benefit1: { es: 'Comisiones recurrentes', en: 'Recurring commissions' },
  benefit1Desc: { es: 'Ganas por todos los envíos, no solo el primero', en: 'Earn on all shipments, not just the first' },
  benefit2: { es: 'Sin límites', en: 'No limits' },
  benefit2Desc: { es: 'No hay tope en cuánto puedes ganar', en: 'No cap on how much you can earn' },
  benefit3: { es: 'Cookie de 30 días', en: '30-day cookie' },
  benefit3Desc: { es: 'Tu referencia se guarda por 30 días', en: 'Your reference is saved for 30 days' },
  benefit4: { es: 'Pagos mensuales', en: 'Monthly payouts' },
  benefit4Desc: { es: 'Retira tus ganancias a tu cuenta bancaria', en: 'Withdraw earnings to your bank account' },
  ctaTitle: { es: '¿Listo para comenzar?', en: 'Ready to get started?' },
  ctaDesc: { es: 'Únete al programa de afiliados ahora. Podrás agregar tus datos bancarios después desde tu portal de afiliado.', en: 'Join the affiliate program now. You can add your bank details later from your affiliate portal.' },
  ctaButton: { es: 'Unirme al Programa', en: 'Join the Program' },
  ctaNote: { es: 'Los datos bancarios son opcionales y puedes agregarlos después', en: 'Bank details are optional and can be added later' },
}

const t = createTranslations(translations)

const joinAffiliateProgram = async () => {
  submitting.value = true
  try {
    await $customFetch('/affiliate/become', {
      method: 'POST',
      body: {}
    })
    // Update user data
    user.value.is_affiliate = true
    // Redirect to affiliate portal
    await navigateTo('/app/affiliate')
  } catch (error) {
    console.error('Error joining affiliate program:', error)
  } finally {
    submitting.value = false
  }
}

// Redirect if already an affiliate
onMounted(() => {
  if (user.value?.is_affiliate) {
    navigateTo('/app/affiliate')
  }
})
</script>
