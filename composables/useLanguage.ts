// composables/useLanguage.ts
import { ref, computed, watch } from 'vue'

// Define supported languages
export type Language = 'es' | 'en'

// Define translation structure
export interface Translations {
  [key: string]: {
    es: string
    en: string
  }
}

// Create a global reactive state
const currentLanguage = ref<Language>('es')
const isInitialized = ref(false)

export const useLanguage = () => {
  // Initialize language from localStorage
  const initializeLanguage = () => {
    if (!isInitialized.value && process.client) {
      const savedLanguage = localStorage.getItem('preferredLanguage') as Language
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage.value = savedLanguage
      }
      isInitialized.value = true
    }
  }

  // Switch language and save to localStorage
  const switchLanguage = (lang: Language) => {
    currentLanguage.value = lang
    if (process.client) {
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  // Get current language
  const language = computed(() => currentLanguage.value)

  // Helper function to get translations
  const t = (translations: Translations) => {
    return computed(() => {
      const result: Record<string, string> = {}
      for (const key in translations) {
        result[key] = translations[key][currentLanguage.value]
      }
      return result
    })
  }

  // Watch for language changes (useful for real-time updates)
  const onLanguageChange = (callback: (newLang: Language) => void) => {
    return watch(currentLanguage, (newLang) => {
      callback(newLang)
    })
  }

  return {
    language,
    switchLanguage,
    initializeLanguage,
    t,
    onLanguageChange
  }
}