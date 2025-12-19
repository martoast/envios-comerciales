<template>
  <Disclosure
    as="nav"
    class="bg-white border-b border-gray-200 shadow-sm"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <a
              href="/app/admin/dashboard"
              @click.prevent="handleNavigation('/app/admin/dashboard')"
              class="flex items-center"
            >
              <!-- Logo -->
              <img src="/logo.svg" class="h-20 w-20 inline-flex items-center justify-center">
            </a>
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <!-- Dashboard -->
            <button
              @click="handleNavigation('/app/admin/dashboard')"
              :class="[
                isActiveRoute('/app/admin/dashboard')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.dashboard }}
            </button>
            
            <!-- Orders -->
            <button
              @click="handleNavigation('/app/admin/orders')"
              :class="[
                isActiveRoute('/app/admin/orders')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.orders }}
            </button>

            <!-- Boxes -->
            <button
              @click="handleNavigation('/app/admin/boxes')"
              :class="[
                isActiveRoute('/app/admin/boxes')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.boxes }}
            </button>

            <!-- Purchase Requests (NEW) -->
            <button
              @click="handleNavigation('/app/admin/purchase-requests')"
              :class="[
                isActiveRoute('/app/admin/purchase-requests')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.purchaseRequests }}
            </button>

            <!-- Packages -->
            <button
              @click="handleNavigation('/app/admin/packages')"
              :class="[
                isActiveRoute('/app/admin/packages')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.packages }}
            </button>

            <!-- Customers -->
            <button
              @click="handleNavigation('/app/admin/customers')"
              :class="[
                isActiveRoute('/app/admin/customers')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.customers }}
            </button>

            <!-- Expenses -->
            <button
              @click="handleNavigation('/app/admin/expenses')"
              :class="[
                isActiveRoute('/app/admin/expenses')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.expenses }}
            </button>

            <!-- Affiliates -->
            <button
              @click="handleNavigation('/app/admin/affiliates')"
              :class="[
                isActiveRoute('/app/admin/affiliates')
                  ? 'border-primary-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200',
              ]"
            >
              {{ t.affiliates }}
            </button>
          </div>
        </div>
        
        <!-- Right-side profile and admin badge -->
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <span class="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mr-4 border border-primary-200">
              {{ t.adminRole }}
            </span>
            
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex items-center gap-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 px-3 py-2 hover:bg-gray-50 border border-gray-200"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-medium">{{ userInitials }}</span>
                  </div>
                  <span class="hidden lg:block text-gray-700">{{ user?.name }}</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-200">
                    <p class="text-sm text-gray-500">{{ t.signedInAs }}</p>
                    <p class="text-sm font-medium text-gray-900 truncate">{{ user?.email }}</p>
                  </div>
                  
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/app/admin/account/"
                      @click.prevent="handleNavigation('/app/admin/account/')"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ t.account }}
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click.prevent="handleLogout"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ t.logout }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/dashboard')"
          :class="[
            isActiveRoute('/app/admin/dashboard')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.dashboard }}</DisclosureButton>

        <!-- Orders -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/orders')"
          :class="[
            isActiveRoute('/app/admin/orders')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.orders }}</DisclosureButton>

        <!-- Boxes (Mobile) -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/boxes')"
          :class="[
            isActiveRoute('/app/admin/boxes')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.boxes }}</DisclosureButton>

        <!-- Purchase Requests (Mobile) -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/purchase-requests')"
          :class="[
            isActiveRoute('/app/admin/purchase-requests')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.purchaseRequests }}</DisclosureButton>

        <!-- Packages -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/packages')"
          :class="[
            isActiveRoute('/app/admin/packages')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.packages }}</DisclosureButton>

        <!-- Customers -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/customers')"
          :class="[
            isActiveRoute('/app/admin/customers')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.customers }}</DisclosureButton>

        <!-- Expenses -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/expenses')"
          :class="[
            isActiveRoute('/app/admin/expenses')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.expenses }}</DisclosureButton>

        <!-- Affiliates (Mobile) -->
        <DisclosureButton
          as="button"
          @click="handleNavigation('/app/admin/affiliates')"
          :class="[
            isActiveRoute('/app/admin/affiliates')
              ? 'bg-primary-50 border-primary-500 text-primary-600'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 w-full text-left',
          ]"
        >{{ t.affiliates }}</DisclosureButton>
      </div>

      <!-- Profile info -->
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="px-4 sm:px-6">
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-primary-600 font-medium text-lg">{{ userInitials }}</span>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-900">{{ user?.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user?.email }}</div>
            </div>
            <span class="ml-auto px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full border border-primary-200">
              {{ t.adminRole }}
            </span>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="button"
            @click="handleNavigation('/app/admin/account')"
            class="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 sm:px-6 w-full text-left"
          >{{ t.account }}</DisclosureButton>
          <DisclosureButton
            as="button"
            @click="handleLogout"
            class="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 sm:px-6 w-full text-left"
          >{{ t.logout }}</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, computed } from "vue";

const { $customFetch } = useNuxtApp();
const user = useUser().value;
const router = useRouter();

// Language setup
const { t: createTranslations } = useLanguage();

const translations = {
  dashboard: { es: 'Panel de Control', en: 'Dashboard' },
  orders: { es: 'Órdenes', en: 'Orders' },
  boxes: { es: 'Cajas', en: 'Boxes' },
  purchaseRequests: { es: 'Compra Asistida', en: 'Assisted Purchase' },
  packages: { es: 'Paquetes', en: 'Packages' },
  customers: { es: 'Clientes', en: 'Customers' },
  expenses: { es: 'Gastos', en: 'Expenses' },
  affiliates: { es: 'Afiliados', en: 'Affiliates' },
  adminRole: { es: 'Administrador', en: 'Administrator' },
  signedInAs: { es: 'Sesión iniciada como', en: 'Signed in as' },
  account: { es: 'Cuenta', en: 'Account' },
  logout: { es: 'Cerrar Sesión', en: 'Sign out' },
};

const t = createTranslations(translations);

const userInitials = computed(() => {
  if (!user?.name) return 'A';
  const names = user.name.split(' ');
  return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

const isActiveRoute = (route) => {
  const currentPath = router.currentRoute.value.path;
  return (
    currentPath.startsWith(route) &&
    (currentPath === route || currentPath.charAt(route.length) === "/")
  );
};

const handleNavigation = async (path) => {
  if (router.currentRoute.value.path === path) {
    window.location.href = path;
  } else {
    await navigateTo(path);
  }
};

const handleLogout = async () => {
  try {
    await $customFetch("/auth/logout", { method: "POST" });
    useState("user", () => null);
    useCookie("XSRF-TOKEN").value = null;
    window.location.href = "/login";
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>