<template>
  <main class="min-h-screen bg-white">
    <!-- Clean Hero Section -->
    <section class="relative w-full bg-white pt-24 pb-8 md:pt-32 md:pb-12">
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center max-w-3xl mx-auto">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-tight"
          >
            {{ t.heroTitle }}
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-6">
            {{ t.heroSubtitle }}
          </p>

          <!-- Minimal Search Bar -->
          <div class="max-w-xl mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.searchPlaceholder"
              class="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:bg-white text-base transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Category Pills -->
    <section
      class="border-t border-b border-gray-100 bg-white sticky top-0 z-10"
    >
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex gap-2 overflow-x-auto py-4 hide-scrollbar">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0',
              selectedCategory === category.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ category.name[language] }}
          </button>
        </div>
      </div>
    </section>

    <!-- Stores Grid -->
    <section class="py-8 md:py-12">
      <div class="container mx-auto px-4 md:px-8 lg:px-12">
        <!-- No Results -->
        <div v-if="filteredStores.length === 0" class="text-center py-20">
          <svg
            class="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-600 text-lg mb-4">{{ t.noResults }}</p>
          <button
            @click="
              searchQuery = '';
              selectedCategory = 'all';
            "
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ t.clearFilters }}
          </button>
        </div>

        <!-- Grid -->
        <div
          v-else
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
        >
          <a
            v-for="store in filteredStores"
            :key="store.id"
            :href="store.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-3"
          >
            <div class="w-full aspect-square flex items-center justify-center">
              <img
                :src="store.logo"
                :alt="store.name"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <span class="text-sm font-medium text-gray-900 text-center">
              {{ store.name }}
            </span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "default",
});

const { t: createTranslations, language } = useLanguage();

const searchQuery = ref("");
const selectedCategory = ref("all");

const categories = [
  { id: "all", name: { es: "Todas", en: "All" } },
  { id: "fashion", name: { es: "Moda", en: "Fashion" } },
  { id: "beauty", name: { es: "Belleza", en: "Beauty" } },
  { id: "sports", name: { es: "Deportes", en: "Sports" } },
  { id: "electronics", name: { es: "Electrónica", en: "Electronics" } },
  { id: "home", name: { es: "Hogar", en: "Home" } },
  { id: "retail", name: { es: "Retail", en: "Retail" } },
];

const stores = [
  {
    id: 1,
    name: "Target",
    url: "https://www.target.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/2048px-Target_logo.svg.png",
    category: "retail",
  },
  {
    id: 2,
    name: "Amazon",
    url: "https://www.amazon.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    category: "retail",
  },
  {
    id: 3,
    name: "Sephora",
    url: "https://www.sephora.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Sephora_logo.svg",
    category: "beauty",
  },
  {
    id: 4,
    name: "Ulta Beauty",
    url: "https://www.ulta.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ulta_Beauty_logo.svg",
    category: "beauty",
  },
  {
    id: 5,
    name: "Nike",
    url: "https://www.nike.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png",
    category: "sports",
  },
  {
    id: 6,
    name: "New Balance",
    url: "https://www.newbalance.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png",
    category: "sports",
  },
  {
    id: 7,
    name: "Dick's Sporting Goods",
    url: "https://www.dickssportinggoods.com",
    logo: "/logos/dicks.svg",
    category: "sports",
  },
  {
    id: 8,
    name: "Ralph Lauren",
    url: "https://www.ralphlauren.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Ralph_Lauren_logo.svg",
    category: "fashion",
  },
  {
    id: 9,
    name: "Macy's",
    url: "https://www.macys.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Macys_logo.svg",
    category: "retail",
  },
  {
    id: 10,
    name: "Best Buy",
    url: "https://www.bestbuy.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/2560px-Best_Buy_Logo.svg.png",
    category: "electronics",
  },
  {
    id: 11,
    name: "Home Depot",
    url: "https://www.homedepot.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/2560px-TheHomeDepot.svg.png",
    category: "home",
  },

  {
    id: 13,
    name: "Walmart",
    url: "https://www.walmart.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Walmart_logo_%282025%3B_Alt%29.svg",
    category: "retail",
  },
  {
    id: 14,
    name: "Nordstrom",
    url: "https://www.nordstrom.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Nordstrom_Logo_2019.svg",
    category: "fashion",
  },
  {
    id: 15,
    name: "Gap",
    url: "https://www.gap.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Gap_logo.svg",
    category: "fashion",
  },
  {
    id: 16,
    name: "Old Navy",
    url: "https://www.oldnavy.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Old_Navy_Logo.svg",
    category: "fashion",
  },
  {
    id: 17,
    name: "Adidas",
    url: "https://www.adidas.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png",
    category: "sports",
  },
  {
    id: 18,
    name: "Under Armour",
    url: "https://www.underarmour.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/2560px-Under_armour_logo.svg.png",
    category: "sports",
  },
  {
    id: 19,
    name: "Bath & Body Works",
    url: "https://www.bathandbodyworks.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bath_%26_Body_Works_logo.svg",
    category: "beauty",
  },
  {
    id: 20,
    name: "Victoria's Secret",
    url: "https://www.victoriassecret.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Victoria%27s_Secret.svg",
    category: "fashion",
  },
  {
    id: 21,
    name: "Apple",
    url: "https://www.apple.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    category: "electronics",
  },
  {
    id: 22,
    name: "Costco",
    url: "https://www.costco.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/2560px-Costco_Wholesale_logo_2010-10-26.svg.png",
    category: "retail",
  },
  {
    id: 23,
    name: "Zara",
    url: "https://www.zara.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/2560px-Zara_Logo.svg.png",
    category: "fashion",
  },
  {
    id: 24,
    name: "H&M",
    url: "https://www2.hm.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png",
    category: "fashion",
  },
  {
    id: 25,
    name: "Owala",
    url: "https://www.owalalife.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Owala_Logo.svg",
    category: "home",
  },
];

const filteredStores = computed(() => {
  let filtered = stores;

  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (store) => store.category === selectedCategory.value
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((store) =>
      store.name.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const translations = {
  heroTitle: {
    es: "Tiendas reconocidas",
    en: "Stores",
  },
  heroSubtitle: {
    es: "Compra en tus tiendas favoritas de USA",
    en: "Shop at your favorite US stores",
  },
  searchPlaceholder: {
    es: "Buscar tiendas",
    en: "Search stores",
  },
  noResults: {
    es: "No se encontraron tiendas",
    en: "No stores found",
  },
  clearFilters: {
    es: "Limpiar búsqueda",
    en: "Clear search",
  },
};

const t = createTranslations(translations);
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
