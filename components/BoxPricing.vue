<template>
  <section
    class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50"
    id="box-pricing"
  >
    <div class="container mx-auto px-4 md:px-8 lg:px-12">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span
          class="text-primary-600 uppercase font-bold text-sm tracking-wider"
        >
          {{ t.pricingTag }}
        </span>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4"
        >
          {{ t.pricingTitle }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600">
          {{ t.pricingSubtitle }}
        </p>
      </div>

      <!-- Pricing Table -->
      <div class="max-w-6xl mx-auto">
        <div
          class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <!-- Desktop Table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200"
                >
                  <th class="px-6 py-4 text-left">
                    <span
                      class="text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >{{ t.tableSize }}</span
                    >
                  </th>
                  <th class="px-6 py-4 text-left">
                    <span
                      class="text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >{{ t.tableDimensions }}</span
                    >
                  </th>
                  <th class="px-6 py-4 text-center">
                    <span
                      class="text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >{{ t.tableWeight }}</span
                    >
                  </th>
                  <th class="px-6 py-4 text-right">
                    <span
                      class="text-sm font-bold text-gray-700 uppercase tracking-wider"
                      >{{ t.tablePrice }}</span
                    >
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="box in boxes"
                  :key="box.size"
                  :class="[
                    'border-b border-gray-100 transition-all hover:bg-gray-50',
                    box.popular ? 'bg-primary-50/30' : '',
                  ]"
                >
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <img src="/box.svg" :alt="box.size" class="w-8 h-8" />
                      <div class="flex items-center gap-2">
                        <span class="text-2xl font-extrabold text-gray-900">{{
                          box.size
                        }}</span>
                        <span
                          v-if="box.popular"
                          class="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                        >
                          {{ t.popularBadge }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-left">
                    <span class="text-gray-700 font-medium">{{
                      box.dimensions[language]
                    }}</span>
                  </td>
                  <td class="px-6 py-5 text-center">
                    <div
                      class="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                      <span class="font-bold text-gray-900"
                        >{{ box.weightLimit }} kg</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <div class="flex items-baseline justify-end gap-1">
                      <span class="text-3xl font-extrabold text-gray-900"
                        >${{ box.price.toLocaleString() }}</span
                      >
                      <span class="text-gray-600 font-semibold">MXN</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards -->
          <div class="md:hidden divide-y divide-gray-200">
            <div
              v-for="box in boxes"
              :key="box.size"
              :class="[
                'p-6 transition-all hover:bg-gray-50',
                box.popular ? 'bg-primary-50/30' : '',
              ]"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <img src="/box.svg" :alt="box.size" class="w-10 h-10" />
                  <span class="text-3xl font-extrabold text-gray-900">{{
                    box.size
                  }}</span>
                </div>
                <span
                  v-if="box.popular"
                  class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {{ t.popularBadge }}
                </span>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">{{
                    t.tableDimensions
                  }}</span>
                  <span class="text-gray-900 font-semibold">{{
                    box.dimensions[language]
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">{{
                    t.tableWeight
                  }}</span>
                  <div
                    class="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
                  >
                    <svg
                      class="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    <span class="font-bold text-gray-900"
                      >{{ box.weightLimit }} kg</span
                    >
                  </div>
                </div>
                <div
                  class="flex justify-between items-center pt-3 border-t border-gray-200"
                >
                  <span class="text-sm font-medium text-gray-600">{{
                    t.tablePrice
                  }}</span>
                  <div>
                    <span class="text-3xl font-extrabold text-gray-900"
                      >${{ box.price.toLocaleString() }}</span
                    >
                    <span class="text-gray-600 font-semibold ml-1">MXN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button Below Table -->
        <div class="text-center mt-8">
          <NuxtLink
            :to="ctaLink"
            class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-105"
          >
            {{ t.ctaButton }}
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="mt-12 max-w-2xl mx-auto">
        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200 shadow-sm"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-900 mb-1 text-lg">
                {{ t.infoTitle }}
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed">
                {{ t.infoDescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  ctaLink: {
    type: String,
    default: "/register",
  },
});

// Use the language composable
const { t: createTranslations, language } = useLanguage();

// Box pricing data
const boxes = [
  {
    size: "XS",
    price: 980,
    dimensions: {
      es: "32×24×13 cm",
      en: "32×24×13 cm",
    },
    weightLimit: 8,
    popular: false,
  },
  {
    size: "S",
    price: 1900,
    dimensions: {
      es: "42×27×32 cm",
      en: "42×27×32 cm",
    },
    weightLimit: 15,
    popular: false,
  },
  {
    size: "M",
    price: 3500,
    dimensions: {
      es: "42×52×40 cm",
      en: "42×52×40 cm",
    },
    weightLimit: 25,
    popular: true,
  },
  {
    size: "L",
    price: 4500,
    dimensions: {
      es: "52×42×40 cm",
      en: "52×42×40 cm",
    },
    weightLimit: 35,
    popular: false,
  },
  {
    size: "XL",
    price: 5500,
    dimensions: {
      es: "52×62×53 cm",
      en: "52×62×53 cm",
    },
    weightLimit: 50,
    popular: false,
  },
];

// Translations
const translations = {
  pricingTag: {
    es: "PRECIOS TRANSPARENTES",
    en: "TRANSPARENT PRICING",
  },
  pricingTitle: {
    es: "Consolida tus compras en una sola caja",
    en: "Consolidate your purchases into one box",
  },
  pricingSubtitle: {
    es: "Compra en múltiples tiendas de EE.UU. Nosotros lo empacamos todo en una caja y lo enviamos a México. Precio fijo, sin sorpresas.",
    en: "Shop from multiple US stores. We pack everything into one box and ship it to Mexico. Fixed price, no surprises.",
  },
  consolidationTitle: {
    es: "💡 Ahorra consolidando tus compras",
    en: "💡 Save by consolidating your purchases",
  },
  consolidationDescription: {
    es: "Compra en diferentes tiendas de EE. UU. y nosotros consolidamos todo en una sola caja. Pagas una sola vez el envío a México en lugar de múltiples envíos. ¡Es la forma más inteligente de ahorrar!",
    en: "Shop from different US stores and we consolidate everything into one box. You pay once for shipping to Mexico instead of multiple shipments. It's the smartest way to save!",
  },
  popularBadge: {
    es: "MÁS POPULAR",
    en: "MOST POPULAR",
  },
  tableSize: {
    es: "Tamaño",
    en: "Size",
  },
  tableDimensions: {
    es: "Dimensiones",
    en: "Dimensions",
  },
  tableWeight: {
    es: "Peso Máximo",
    en: "Max Weight",
  },
  tablePrice: {
    es: "Precio",
    en: "Price",
  },
  feature1: {
    es: "Envío directo a México",
    en: "Direct shipping to Mexico",
  },
  feature1Desc: {
    es: "Entregamos en toda la República",
    en: "We deliver throughout Mexico",
  },
  feature2: {
    es: "Consolidación gratuita",
    en: "Free consolidation",
  },
  feature2Desc: {
    es: "Juntamos todos tus paquetes sin costo",
    en: "We combine all your packages at no cost",
  },
  feature3: {
    es: "Seguro incluido",
    en: "Insurance included",
  },
  feature3Desc: {
    es: "Tu envío está protegido siempre",
    en: "Your shipment is always protected",
  },
  ctaButton: {
    es: "Empezar ahora",
    en: "Start now",
  },
  infoTitle: {
    es: "¿No sabes qué tamaño elegir?",
    en: "Not sure which size to choose?",
  },
  infoDescription: {
    es: "¡No te preocupes! Nosotros optimizamos automáticamente el tamaño de caja para tus compras. Siempre te asignaremos la caja que te permita ahorrar más en tu envío a México.",
    en: "Don't worry! We automatically optimize the box size for your purchases. We'll always assign you the box that saves you the most on your shipment to Mexico.",
  },
};

// Get reactive translations
const t = createTranslations(translations);
</script>
