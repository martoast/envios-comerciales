<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 md:px-8 lg:px-12">
      <div class="text-center mb-16">
        <span class="text-primary-600 uppercase font-bold text-sm tracking-wider">
          {{ t.processTag }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
          {{ t.processTitle }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t.processSubtitle }}
        </p>
      </div>

      <!-- Steps -->
      <div class="space-y-20">
        <!-- Step 1: Get Your US Address -->
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Content -->
          <div class="order-2 lg:order-1">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ t.step1Title }}
              </h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <p class="text-lg">{{ t.step1Desc }}</p>
              <div class="flex items-start gap-3 text-sm">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600">{{ t.step1Tip }}</p>
              </div>
            </div>
          </div>
          <!-- Visual -->
          <div class="order-1 lg:order-2">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/register.jpeg" alt="Get your US address" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Shop Anywhere -->
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Visual -->
          <div class="order-1">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/shopping.jpeg" alt="Shop from any store" class="w-full h-full object-cover" />
              </div>
              <!-- Floating Store Logos -->
              <div class="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2">
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-xs">
                  🛍️
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-900">1,000+</p>
                  <p class="text-xs text-gray-600">{{ t.storesAvailable }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Content -->
          <div class="order-2">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ t.step2Title }}
              </h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <p class="text-lg">{{ t.step2Desc }}</p>
              <div class="bg-primary-50 rounded-xl p-6 border-2 border-primary-100">
                <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ t.step2ExampleTitle }}
                </h4>
                <div class="space-y-2 font-mono text-sm bg-white p-4 rounded-lg">
                  <p class="font-bold text-gray-900">{{ t.step2NameExample }}</p>
                  <p class="text-gray-700">{{ t.step2AddressExample }}</p>
                  <p class="text-gray-700">San Diego, CA 91915</p>
                </div>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600">{{ t.step2Tip }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Register Your Purchases -->
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Content -->
          <div class="order-2 lg:order-1">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ t.step3Title }}
              </h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <p class="text-lg">{{ t.step3Desc }}</p>
              <!-- Why This Matters -->
              <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-primary-500">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="font-semibold text-gray-900 mb-1">{{ t.step3WhyTitle }}</p>
                    <p class="text-sm text-gray-700">{{ t.step3WhyDesc }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600">{{ t.step3Tip }}</p>
              </div>
            </div>
          </div>
          <!-- Visual -->
          <div class="order-1 lg:order-2">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/order.jpeg" alt="Register your purchases" class="w-full h-full object-cover" />
              </div>
              <!-- Floating "Easy" Badge -->
              <div class="absolute -top-4 -right-4 bg-primary-600 text-white rounded-full px-6 py-3 shadow-xl transform -rotate-12">
                <p class="text-xs font-bold uppercase">{{ t.step3Badge }}</p>
                <p class="text-lg font-bold">2 min</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: We Consolidate -->
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Visual -->
          <div class="order-1">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/consolidation.jpeg" alt="Package Consolidation" class="w-full h-full object-cover" />
              </div>
              <!-- Floating Badge -->
              <div class="absolute -top-4 -left-4 bg-green-600 text-white rounded-full px-6 py-3 shadow-xl transform -rotate-12">
                <p class="text-xs font-bold uppercase">{{ t.saveBadge }}</p>
                <p class="text-2xl font-bold">60%</p>
              </div>
            </div>
          </div>
          <!-- Content -->
          <div class="order-2">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ t.step4Title }}
              </h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <p class="text-lg">{{ t.step4Desc }}</p>
              <div class="flex items-start gap-3 text-sm">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600">{{ t.step4Tip }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 5: We Ship to Mexico -->
        <div class="grid lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16">
          <!-- Content -->
          <div class="order-2 lg:order-1">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                5
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ t.step5Title }}
              </h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <p class="text-lg">{{ t.step5Desc }}</p>
              <div class="flex items-start gap-3 text-sm">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600">{{ t.step5Tip }}</p>
              </div>
            </div>
          </div>
          <!-- Visual -->
          <div class="order-1 lg:order-2">
            <div class="relative max-w-lg mx-auto lg:max-w-none">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/shipping.jpeg" alt="Shipping to Mexico" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t: createTranslations } = useLanguage();

const translations = {
  processTag: {
    es: "PROCESO COMPLETO",
    en: "COMPLETE PROCESS",
  },
  processTitle: {
    es: "Así funciona Boxly",
    en: "How Boxly works",
  },
  processSubtitle: {
    es: "Desde tu compra hasta la entrega en tu puerta, te explicamos todo el proceso paso a paso",
    en: "From your purchase to delivery at your door, we explain the entire process step by step",
  },
  // Step 1
  step1Title: {
    es: "Obtén tu dirección en USA",
    en: "Get your US address",
  },
  step1Desc: {
    es: "Al registrarte gratis, te asignamos una dirección física en San Diego, California. Úsala para todas tus compras online en tiendas de USA.",
    en: "When you register for free, we assign you a physical address in San Diego, California. Use it for all your online purchases at US stores.",
  },
  step1Tip: {
    es: "Importante: Siempre escribe BOXLY + tu nombre para identificar tus paquetes",
    en: "Important: Always write BOXLY + your name to identify your packages",
  },
  // Step 2
  step2Title: {
    es: "Compra en cualquier tienda de USA",
    en: "Shop at any US store",
  },
  step2Desc: {
    es: "Compra en Amazon, Nike, Sephora, Best Buy y más de 1,000 tiendas. Usa tu dirección Boxly como dirección de envío en el checkout.",
    en: "Shop at Amazon, Nike, Sephora, Best Buy and over 1,000 stores. Use your Boxly address as shipping address at checkout.",
  },
  step2ExampleTitle: {
    es: "Ejemplo de cómo usar tu dirección:",
    en: "Example of how to use your address:",
  },
  step2NameExample: {
    es: "BOXLY Juan Pérez",
    en: "BOXLY John Smith",
  },
  step2AddressExample: {
    es: "123 main street, Unit 123",
    en: "123 main street, Unit 123",
  },
  storesAvailable: {
    es: "tiendas",
    en: "stores",
  },
  step2Tip: {
    es: "Puedes comprar en múltiples tiendas - envía todas tus compras a la misma dirección",
    en: "You can shop at multiple stores - ship all your packages to the same address",
  },
  // Step 3
  step3Title: {
    es: "Registra tus compras en el dashboard",
    en: "Register your purchases in dashboard",
  },
  step3Desc: {
    es: "Después de comprar, entra a tu dashboard de Boxly y crea una orden con la información de tus compras. Esto nos ayuda a saber qué paquetes esperar y prepararnos para recibirlos.",
    en: "After shopping, log into your Boxly dashboard and create an order with your purchase information. This helps us know which packages to expect and prepare to receive them.",
  },
  step3WhyTitle: {
    es: "¿Por qué es importante?",
    en: "Why is this important?",
  },
  step3WhyDesc: {
    es: "Esto nos permite identificar tus paquetes cuando lleguen a nuestro almacén, verificar que todo esté correcto, y preparar tu consolidación más rápido.",
    en: "This allows us to identify your packages when they arrive at our warehouse, verify everything is correct, and prepare your consolidation faster.",
  },
  step3Tip: {
    es: "Registra tus compras al terminar con tu shopping - ¡toma solo 2 minutos!",
    en: "Register your purchases when youre done shopping - it only takes 2 minutes!",
  },
  step3Badge: {
    es: "Solo toma",
    en: "Only takes",
  },
  // Step 4
  step4Title: {
    es: "Nosotros consolidamos tus paquetes",
    en: "We consolidate your packages",
  },
  step4Desc: {
    es: "Recibimos todos tus paquetes en nuestro almacén en San Diego. Los consolidamos en una sola caja para que pagues menos envío. ¡Ahorra hasta 60%!",
    en: "We receive all your packages at our San Diego warehouse. We consolidate them into a single box so you pay less shipping. Save up to 60%!",
  },
  saveBadge: {
    es: "Ahorra hasta",
    en: "Save up to",
  },
  step4Tip: {
    es: "Mientras más paquetes consolides, más ahorras en envío",
    en: "The more packages you consolidate, the more you save on shipping",
  },
  // Step 5
  step5Title: {
    es: "Enviamos a México",
    en: "We ship to Mexico",
  },
  step5Desc: {
    es: "Pagas tu envío de forma segura. Nos encargamos de la logística y el proceso aduanal, y enviamos tu paquete en México por paquetería aérea con Estafeta o DHL. Recibes tu guía cuando se envía.",
    en: "Pay securely. We handle logistics and customs, then ship your package within Mexico by air with Estafeta or DHL. You receive tracking once it ships.",
  },

  step5Tip: {
    es: "Rastreo en tiempo real desde que pagas hasta que recibes",
    en: "Real-time tracking from payment to delivery",
  },
};

const t = createTranslations(translations);
</script>
