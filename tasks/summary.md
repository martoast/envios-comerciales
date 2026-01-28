# Boxly - Codebase Summary

> **Purpose**: This document serves as a comprehensive entry point for AI assistants working on this codebase. It provides complete architectural understanding, file organization, patterns, and conventions used throughout the application.

---

## 1. Project Overview

**Boxly** is a package forwarding and consolidation service that allows customers to:
1. Get a US shipping address (PO Box in San Ysidro, CA)
2. Shop from any US online store
3. Have packages shipped to the Boxly warehouse
4. Consolidate multiple packages into one shipment
5. Ship to their address in Mexico at competitive rates

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Nuxt 3 | ^3.17.6 | Vue.js meta-framework (SPA mode) |
| Vue 3 | ^3.5.17 | Frontend framework |
| Tailwind CSS | 6.13.1 | Styling |
| Pinia | ^3.0.3 | State management |
| Headless UI | ^1.7.23 | Accessible UI components |
| Heroicons | ^2.2.0 | Icon library |
| Mapbox GL | ^3.14.0 | Maps integration |
| libphonenumber-js | ^1.12.24 | Phone validation |

### Key URLs
- **Production**: https://boxly.mx
- **API Base**: Configured via `API_URL` env variable
- **Warehouse Address**: 482 W. San Ysidro Blvd. Apt. 123, San Ysidro, CA 92173

---

## 2. Directory Structure

```
/Users/alex/Documents/erick/boxly/app/
├── pages/              # File-based routing (66 Vue files)
├── components/         # Reusable Vue components (64 files)
├── layouts/            # Page layout wrappers (4 files)
├── middleware/         # Route guards & auth (8 files)
├── composables/        # Vue composables/hooks (6 files)
├── plugins/            # Nuxt plugins (10 files)
├── stores/             # Pinia stores (1 file)
├── public/             # Static assets (images, favicon)
├── server/             # Server-side config
├── tasks/              # Documentation & todos
├── nuxt.config.ts      # Nuxt configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript config
├── package.json        # Dependencies
└── .env                # Environment variables
```

---

## 3. Application Architecture

### 3.1 Authentication Flow

The app uses **cookie-based authentication** with CSRF token protection:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User visits   │────▶│  CSRF cookie    │────▶│  Login/Register │
│   any page      │     │  initialized    │     │  with credentials│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  User state     │◀────│  API returns    │◀────│  POST to        │
│  stored in      │     │  session cookie │     │  /auth/login    │
│  useState()     │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Key Files**:
- `plugins/$fetch.ts` - Custom fetch with CSRF header injection
- `plugins/retriveUser.ts` - User retrieval and state initialization
- `middleware/auth.ts` - Authentication check
- `middleware/admin.ts` - Admin role check
- `middleware/customer.ts` - Customer role check

### 3.2 User Roles

| Role | Access | Middleware |
|------|--------|------------|
| `customer` | `/app/*` (excluding `/app/admin/*`) | `customer` |
| `admin` | `/app/admin/*` | `admin` |

### 3.3 Layouts

| Layout | File | Used By |
|--------|------|---------|
| `default` | `layouts/default.vue` | Landing pages, auth pages |
| `app` | `layouts/app.vue` | Customer dashboard |
| `admin` | `layouts/admin.vue` | Admin dashboard |
| `empty` | `layouts/empty.vue` | Special pages (no navbar) |

---

## 4. Routing Structure

### 4.1 Public Routes (No Auth)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | `index.vue` | Landing page |
| `/login` | `login.vue` | User login |
| `/register` | `register.vue` | User registration |
| `/forgot-password` | `forgot-password.vue` | Password recovery |
| `/reset-password` | `reset-password.vue` | Password reset |
| `/how-it-works` | `how-it-works.vue` | Service explanation |
| `/expats` | `expats.vue` | Expats landing page |
| `/faq` | `faq.vue` | FAQ page |
| `/shipping-calculator` | `shipping-calculator.vue` | Pricing calculator |
| `/affiliate-program` | `affiliate-program.vue` | Affiliate info |
| `/track` | `track.vue` | Package tracking |
| `/stores` | `stores.vue` | Supported stores |
| `/shopping` | `shopping.vue` | Shopping guide |

### 4.2 Customer Routes (`/app/*`)

**Middleware**: `['auth', 'customer', 'complete-profile']`

| Route | Page | Purpose |
|-------|------|---------|
| `/app/` | `app/index.vue` | Customer dashboard |
| `/app/orders` | `app/orders/index.vue` | Orders list |
| `/app/orders/create` | `app/orders/create.vue` | Create new order |
| `/app/orders/[id]` | `app/orders/[id]/index.vue` | Order details |
| `/app/orders/[id]/edit` | `app/orders/[id]/edit.vue` | Edit order |
| `/app/orders/[id]/items` | `app/orders/[id]/items.vue` | Order items |
| `/app/purchase-requests` | `app/purchase-requests/index.vue` | Assisted purchase list |
| `/app/purchase-requests/create` | `app/purchase-requests/create.vue` | Create purchase request |
| `/app/account` | `app/account/index.vue` | Account settings |
| `/app/account/edit` | `app/account/edit.vue` | Edit account |
| `/app/account/shipping-address` | `app/account/shipping-address.vue` | Shipping address |
| `/app/affiliate` | `app/affiliate/index.vue` | Affiliate dashboard |
| `/app/affiliate/join` | `app/affiliate/join.vue` | Join affiliate program |
| `/app/pricing` | `app/pricing/index.vue` | Pricing info |

### 4.3 Admin Routes (`/app/admin/*`)

**Middleware**: `['auth', 'admin']`

| Route | Page | Purpose |
|-------|------|---------|
| `/app/admin/dashboard` | Dashboard with financial metrics |
| `/app/admin/orders` | All orders management |
| `/app/admin/orders/[id]` | Order details & status updates |
| `/app/admin/orders/ready-to-ship` | Orders ready for shipping |
| `/app/admin/packages` | Package management |
| `/app/admin/customers` | Customer management |
| `/app/admin/affiliates` | Affiliate management |
| `/app/admin/boxes` | Box size management |
| `/app/admin/purchase-requests` | Purchase request management |
| `/app/admin/expenses` | Expense tracking |

---

## 5. Order Status Flow

Orders follow this status progression:

```
collecting → awaiting_packages → packages_complete → awaiting_payment → paid → shipped → delivered
                                                                                    ↓
                                                                               cancelled
```

| Status | Color | Description |
|--------|-------|-------------|
| `collecting` | Blue | Customer adding items to order |
| `awaiting_packages` | Amber | Waiting for packages at warehouse |
| `packages_complete` | Purple | All packages received |
| `awaiting_payment` | Orange | Quote sent, waiting for payment |
| `paid` | Emerald | Payment received |
| `processing` | Indigo | Order being processed |
| `shipped` | Cyan | Order shipped to customer |
| `delivered` | Green | Order delivered |
| `cancelled` | Red | Order cancelled |

**Status Composable**: `composables/useOrderStatus.js`

---

## 6. Composables (Hooks)

### 6.1 `useUser.ts`
```typescript
// Returns the global user state
const user = useUser()
// Access: user.value.name, user.value.email, user.value.role
```

### 6.2 `useLanguage.ts`
```typescript
const { language, switchLanguage, t } = useLanguage()

// Define translations
const translations = {
  title: { es: 'Hola', en: 'Hello' }
}
const t = createTranslations(translations)

// Use in template: {{ t.title }}
```

**Supported Languages**: `es` (Spanish - default), `en` (English)

### 6.3 `useOrderStatus.js`
```javascript
const { getStatusColor, getStatusLabel, getAllStatuses } = useOrderStatus()

// getStatusColor('shipped') → 'bg-cyan-100 text-cyan-700'
// getStatusLabel('shipped') → 'Shipped' or 'Enviado' based on language
```

### 6.4 `useAffiliateRef.ts`
```typescript
const { affiliateCode, captureRefFromUrl, getAffiliateCode } = useAffiliateRef()

// Captures ?ref=CODE from URL and stores in cookie for 30 days
captureRefFromUrl()
```

### 6.5 `useToast.js`
```javascript
const { success, error, warning, info } = useToast()

success('Operation completed!')
error('Something went wrong')
```

### 6.6 `useListReturnUrl.ts`
```typescript
// Stores return URL for navigation after actions
```

---

## 7. API Integration

### 7.1 Custom Fetch (`plugins/$fetch.ts`)

All API calls use a custom fetch wrapper that:
1. Adds `X-XSRF-TOKEN` header from cookie
2. Sets `Accept: application/json`
3. Includes credentials (cookies)
4. Handles 401 responses (auto logout)

**Usage**:
```javascript
const { $customFetch } = useNuxtApp()

// GET request
const data = await $customFetch('/orders')

// POST request
await $customFetch('/auth/login', {
  method: 'POST',
  body: { email, password }
})
```

### 7.2 API Endpoints (Backend)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/csrf-cookie` | Initialize CSRF token |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/google/redirect` | Google OAuth |
| GET | `/user` | Get current user |
| GET | `/orders` | List orders (paginated) |
| POST | `/orders` | Create order |
| GET | `/orders/{id}` | Get order details |
| PUT | `/orders/{id}` | Update order |
| DELETE | `/orders/{id}` | Delete order |
| GET | `/admin/dashboard` | Admin dashboard data |
| GET | `/admin/orders` | Admin orders list |
| GET | `/affiliate/validate/{code}` | Validate affiliate code |

---

## 8. Design System (Tailwind)

### 8.1 Color Palette

```javascript
// Primary (Blue) - Main brand color
primary: {
  50: '#eaf2fa',
  500: '#2E6BB7',  // Main primary
  600: '#245591',
  700: '#1b406d',
}

// Dark (Navy) - Dark sections
dark: {
  500: '#0d2c4f',  // Main dark
}

// Accent Colors
accent: {
  green: '#25D366',      // WhatsApp green
  red: '#e53e3e',
  gold: '#ffc107',       // Star ratings
}

// Background
bg: {
  main: '#f8f9fa',
  card: '#ffffff',
  'dark-section': '#0d2c4f',
}
```

### 8.2 Typography

**Font**: Inter (sans-serif)

### 8.3 Common Patterns

**Button Styles**:
```html
<!-- Primary Button -->
<button class="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl
               hover:bg-primary-600 shadow-lg hover:shadow-xl
               hover:-translate-y-0.5 transition-all duration-300">

<!-- Secondary Button -->
<button class="px-6 py-3 border-2 border-primary-500 text-primary-500
               font-semibold rounded-xl hover:bg-primary-50 transition-all">
```

**Card Styles**:
```html
<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
```

**Page Background**:
```html
<section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
```

**Animation Classes**:
```html
<div class="animate-fadeIn" style="animation-delay: 0.2s">
```

### 8.4 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 9. Components Organization

### 9.1 Layout Components
- `LandingNavbar.vue` - Public pages navigation
- `CustomerNavbar.vue` - Customer app navigation
- `AdminNavbar.vue` - Admin panel navigation
- `LanguageToggle.vue` - Language switcher

### 9.2 Landing Page Components (`components/Landing/`)
```
Landing/
├── Main/
│   ├── HeroSection.vue
│   ├── HowItWorks.vue
│   ├── StepsSection.vue
│   ├── TestimonialsSection.vue
│   └── FAQSection.vue
├── Expats/
│   ├── HeroSection.vue
│   ├── BenefitsSection.vue
│   └── UseCasesSection.vue
├── WhatsAppButton.vue
├── FooterSection.vue
└── CTAFooter.vue
```

### 9.3 Admin Components (`components/admin/`)
- `AdminOrderHeader.vue` - Order header display
- `AdminOrderItemsList.vue` - Order items list
- `AdminOrderTimeline.vue` - Status timeline
- `AdminOrderModal*.vue` - Various action modals (Ship, Consolidate, MarkPaid, etc.)

### 9.4 User Components (`components/user/`)
- `UserOrderHeader.vue`
- `UserOrderItemsList.vue`
- `UserOrderStatusBanner.vue`

### 9.5 Utility Components
- `BoxCalculator.vue` - Box size calculator
- `BoxPricing.vue` - Pricing display
- `CustomPlacesAutoComplete.vue` - Address autocomplete (Mapbox)
- `PhoneValidationInput.vue` - Phone number input with validation
- `Toast.vue` - Toast notifications
- `OrderProgressTimeline.vue` - Visual order progress

---

## 10. Page Patterns

### 10.1 Standard Page Structure

```vue
<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
    <!-- Header -->
    <div class="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {{ t.pageTitle }}
        </h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Content here -->
    </div>
  </section>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: 'app',  // or 'admin', 'default'
  middleware: ['auth', 'customer', 'complete-profile']
})

// Composables
const { $customFetch } = useNuxtApp()
const user = useUser()
const { t: createTranslations } = useLanguage()

// Translations
const translations = {
  pageTitle: { es: 'Título', en: 'Title' }
}
const t = createTranslations(translations)

// State
const loading = ref(false)
const data = ref([])

// Methods
const fetchData = async () => {
  loading.value = true
  try {
    const response = await $customFetch('/endpoint')
    data.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}
</style>
```

### 10.2 Translation Pattern

Always define translations inline in each component:

```javascript
const translations = {
  title: { es: 'Título en Español', en: 'English Title' },
  description: { es: 'Descripción', en: 'Description' }
}
const t = createTranslations(translations)
```

Use in template: `{{ t.title }}`

---

## 11. State Management

### 11.1 Global User State

```javascript
// Set user (usually in plugins/retriveUser.ts)
const userState = useState('user')
userState.value = userData

// Access user anywhere
const user = useUser()
console.log(user.value.name)
console.log(user.value.role)  // 'customer' | 'admin'
console.log(user.value.affiliate)  // affiliate data if user is affiliate
```

### 11.2 Pinia Store (Products)

```javascript
// stores/products.js
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [...] // Hot deals product data
  })
})
```

---

## 12. External Integrations

### 12.1 Mapbox
- Address autocomplete for shipping addresses
- Token stored in `MAPBOX_API_TOKEN` env variable

### 12.2 Google Analytics
- GTAG ID in `GTAG_ID` env variable
- Plugin: `plugins/gtag.client.js`

### 12.3 Meta Pixel (Facebook)
- Pixel ID in `META_PIXEL_ID` env variable
- Plugin: `plugins/nuxt-meta-pixel.js`

### 12.4 Google OAuth
- Redirect to `/auth/google/redirect` for OAuth flow

---

## 13. Environment Variables

```env
API_URL=http://localhost:8001           # Backend API URL
COOKIE_DOMAIN=.staging.boxly.mx         # Cookie domain
MAPBOX_API_TOKEN=pk.eyJ1...             # Mapbox API token
GTAG_ID=G-B0GT2ET4F3                    # Google Analytics
META_PIXEL_ID=820984423653377           # Facebook Pixel
```

---

## 14. Important Business Logic

### 14.1 Order Types
- **Regular Order**: Customer ships to their address in Mexico
- **Crossing Order**: Customer picks up at Tijuana (no delivery address)

### 14.2 Box Sizes
- Extra Small (XS)
- Small (S)
- Medium (M)
- Large (L)
- Extra Large (XL)

### 14.3 Affiliate Program
- Affiliates earn 10% commission per shipment
- Referral code tracked via URL param `?ref=CODE`
- Cookie stored for 30 days

### 14.4 Assisted Purchase (Personal Shopping)
- Customers can request Boxly to purchase items on their behalf
- Service fee applies

---

## 15. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Pages | kebab-case | `forgot-password.vue` |
| Components | PascalCase | `AdminOrderHeader.vue` |
| Composables | camelCase with `use` prefix | `useLanguage.ts` |
| Plugins | camelCase or kebab-case | `$fetch.ts`, `gtag.client.js` |
| Middleware | kebab-case | `complete-profile.js` |

---

## 16. Common Tasks Reference

### Adding a New Page

1. Create file in `pages/` directory
2. Define `definePageMeta()` with layout and middleware
3. Set up translations
4. Follow standard page structure

### Adding a New API Call

```javascript
const { $customFetch } = useNuxtApp()

// In a method
const result = await $customFetch('/endpoint', {
  method: 'POST',
  body: { data }
})
```

### Adding Translations

1. Define translations object
2. Use `createTranslations()` from `useLanguage()`
3. Access via `t.value.keyName` or `{{ t.keyName }}` in template

### Protecting a Route

```javascript
definePageMeta({
  middleware: ['auth', 'customer']  // or ['auth', 'admin']
})
```

---

## 17. Testing Locally

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

---

## 18. Key Files Quick Reference

| Purpose | File Path |
|---------|-----------|
| Nuxt config | `nuxt.config.ts` |
| Tailwind config | `tailwind.config.js` |
| Custom fetch | `plugins/$fetch.ts` |
| User retrieval | `plugins/retriveUser.ts` |
| Auth middleware | `middleware/auth.ts` |
| User composable | `composables/useUser.ts` |
| Language composable | `composables/useLanguage.ts` |
| Order status composable | `composables/useOrderStatus.js` |
| Customer navbar | `components/CustomerNavbar.vue` |
| Admin navbar | `components/AdminNavbar.vue` |
| Customer dashboard | `pages/app/index.vue` |
| Admin dashboard | `pages/app/admin/dashboard/index.vue` |
| Orders list (customer) | `pages/app/orders/index.vue` |
| Orders list (admin) | `pages/app/admin/orders/index.vue` |

---

## 19. Code Style Guidelines

1. **Keep changes minimal** - Only modify what's necessary
2. **Use existing patterns** - Follow the established component and page structures
3. **Translations are required** - All user-facing text must be bilingual (es/en)
4. **Mobile-first** - Design for mobile, enhance for desktop
5. **Use composables** - Leverage existing hooks before creating new ones
6. **Error handling** - Always wrap API calls in try/catch
7. **Loading states** - Show loading indicators during async operations

---

*Last Updated: January 2026*
