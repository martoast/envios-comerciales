<!-- pages/help-center.vue -->
<template>
    <main class="overflow-hidden">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-50 to-primary-100/30 py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-dark-500 mb-4">
            {{ t.heroTitle }}
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t.heroSubtitle }}
          </p>
        </div>
      </section>
  
      <!-- Contact Options Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Left Column - Contact Channels -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ t.contactChannels }}
              </h2>
              <p class="text-gray-600 mb-8">
                {{ t.contactDescription }}
              </p>
  
              <!-- Primary Contact - WhatsApp -->
              <div class="mb-6">
                <div class="bg-gradient-to-r from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/50">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-3 bg-green-100 rounded-xl">
                      <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.98-3.686c-.592-1.02-.9-2.176-.898-3.358.002-3.808 3.105-6.912 6.913-6.912 3.809 0 6.913 3.104 6.913 6.913s-3.104 6.923-6.913 6.923z"/>
                      </svg>
                    </div>
                    <div>
                      <span class="inline-block px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full mb-1">
                        {{ t.recommended }}
                      </span>
                      <h3 class="font-bold text-xl text-gray-900">WhatsApp</h3>
                    </div>
                  </div>
                  <p class="text-gray-700 mb-4">
                    {{ t.whatsappDescription }}
                  </p>
                  <a
                    href="https://wa.me/16195591910"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  >
                    {{ t.startChat }}
                    <ArrowRightIcon class="w-5 h-5" />
                  </a>
                  <p class="text-sm text-gray-500 mt-3">+1 (619) 559-1910</p>
                </div>
              </div>
  
              <!-- Secondary Contacts -->
              <div class="space-y-4">
                <!-- Email -->
                <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div class="flex items-center gap-4">
                    <div class="p-3 bg-primary-100 rounded-lg">
                      <EnvelopeIcon class="w-6 h-6 text-primary-600" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">{{ t.emailTitle }}</h4>
                      <p class="text-sm text-gray-600">{{ t.emailDescription }}</p>
                      <a href="mailto:envioscomercialestj@gmail.com" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        envioscomercialestj@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
  
                <!-- Phone -->
                <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div class="flex items-center gap-4">
                    <div class="p-3 bg-primary-100 rounded-lg">
                      <PhoneIcon class="w-6 h-6 text-primary-600" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">{{ t.phoneTitle }}</h4>
                      <p class="text-sm text-gray-600">{{ t.phoneDescription }}</p>
                      <a href="tel:+16195591910" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        +1 (619) 559-1910
                      </a>
                    </div>
                  </div>
                </div>
  
                <!-- Office Hours -->
                <div class="bg-primary-50 rounded-xl p-5 border border-primary-200">
                  <div class="flex items-center gap-4">
                    <div class="p-3 bg-primary-100 rounded-lg">
                      <ClockIcon class="w-6 h-6 text-primary-600" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">{{ t.hoursTitle }}</h4>
                      <p class="text-sm text-gray-700">{{ t.hoursWeekdays }}</p>
                      <p class="text-sm text-gray-700">{{ t.hoursWeekend }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Right Column - Contact Form -->
            <div>
              <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  {{ t.formTitle }}
                </h2>
                <p class="text-gray-600 mb-6">
                  {{ t.formSubtitle }}
                </p>
  
                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.formName }}
                    </label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      :placeholder="t.formNamePlaceholder"
                    />
                  </div>
  
                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.formEmail }}
                    </label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      :placeholder="t.formEmailPlaceholder"
                    />
                  </div>
  
                  <!-- Phone (Optional) -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.formPhone }}
                      <span class="text-gray-400 text-xs ml-1">({{ t.optional }})</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      :placeholder="t.formPhonePlaceholder"
                    />
                  </div>
  
                  <!-- Subject -->
                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.formSubject }}
                    </label>
                    <select
                      id="subject"
                      v-model="form.subject"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">{{ t.formSubjectSelect }}</option>
                      <option value="tracking">{{ t.subjectTracking }}</option>
                      <option value="shipping">{{ t.subjectShipping }}</option>
                      <option value="account">{{ t.subjectAccount }}</option>
                      <option value="payment">{{ t.subjectPayment }}</option>
                      <option value="other">{{ t.subjectOther }}</option>
                    </select>
                  </div>
  
                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                      {{ t.formMessage }}
                    </label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      required
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      :placeholder="t.formMessagePlaceholder"
                    ></textarea>
                  </div>
  
                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
                  >
                    <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                      {{ t.formSubmit }}
                      <PaperAirplaneIcon class="w-5 h-5" />
                    </span>
                    <span v-else class="flex items-center justify-center gap-2">
                      {{ t.formSubmitting }}
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </button>
  
                  <!-- Success Message -->
                  <transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-200 ease-out"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div class="flex items-center gap-3">
                        <CheckCircleIcon class="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p class="text-sm text-green-800">{{ t.formSuccess }}</p>
                      </div>
                    </div>
                  </transition>
                </form>
              </div>
            </div>
          </div>
  
          <!-- FAQ Link Section -->
          <div class="mt-16 text-center">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-8 border border-gray-200">
              <QuestionMarkCircleIcon class="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t.faqTitle }}</h3>
              <p class="text-gray-600 mb-4">{{ t.faqDescription }}</p>
              <NuxtLink
                to="/faq"
                class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                {{ t.faqLink }}
                <ArrowRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <FooterSection />
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import FooterSection from "~/components/Landing/FooterSection.vue"
  import {
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    ArrowRightIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    QuestionMarkCircleIcon
  } from '@heroicons/vue/24/outline'
  
  const { t: createTranslations, language } = useLanguage()
  
  // Form state
  const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  
  // Translations
  const translations = {
    heroTitle: {
      es: 'Centro de Ayuda',
      en: 'Help Center'
    },
    heroSubtitle: {
      es: 'Estamos aquí para ayudarte. Contáctanos a través de cualquiera de nuestros canales disponibles.',
      en: 'We\'re here to help. Contact us through any of our available channels.'
    },
    contactChannels: {
      es: 'Canales de Contacto',
      en: 'Contact Channels'
    },
    contactDescription: {
      es: 'Elige el método que prefieras para ponerte en contacto con nuestro equipo de soporte.',
      en: 'Choose your preferred method to get in touch with our support team.'
    },
    recommended: {
      es: 'RECOMENDADO',
      en: 'RECOMMENDED'
    },
    whatsappDescription: {
      es: 'Respuesta rápida y directa. Disponible durante horario de oficina.',
      en: 'Fast and direct response. Available during business hours.'
    },
    startChat: {
      es: 'Iniciar Chat',
      en: 'Start Chat'
    },
    emailTitle: {
      es: 'Correo Electrónico',
      en: 'Email'
    },
    emailDescription: {
      es: 'Para consultas detalladas',
      en: 'For detailed inquiries'
    },
    phoneTitle: {
      es: 'Teléfono',
      en: 'Phone'
    },
    phoneDescription: {
      es: 'Llámanos directamente',
      en: 'Call us directly'
    },
    hoursTitle: {
      es: 'Horario de Atención',
      en: 'Business Hours'
    },
    hoursWeekdays: {
      es: 'Lunes - Viernes: 9:00 AM - 6:00 PM',
      en: 'Monday - Friday: 9:00 AM - 6:00 PM'
    },
    hoursWeekend: {
      es: 'Sábado: 9:00 AM - 2:00 PM',
      en: 'Saturday: 9:00 AM - 2:00 PM'
    },
    formTitle: {
      es: 'Envíanos un Mensaje',
      en: 'Send Us a Message'
    },
    formSubtitle: {
      es: 'Completa el formulario y te responderemos lo antes posible.',
      en: 'Fill out the form and we\'ll get back to you as soon as possible.'
    },
    formName: {
      es: 'Nombre Completo',
      en: 'Full Name'
    },
    formNamePlaceholder: {
      es: 'Juan Pérez',
      en: 'John Doe'
    },
    formEmail: {
      es: 'Correo Electrónico',
      en: 'Email'
    },
    formEmailPlaceholder: {
      es: 'tu@email.com',
      en: 'you@email.com'
    },
    formPhone: {
      es: 'Teléfono',
      en: 'Phone'
    },
    formPhonePlaceholder: {
      es: '+52 664 123 4567',
      en: '+1 619 123 4567'
    },
    optional: {
      es: 'Opcional',
      en: 'Optional'
    },
    formSubject: {
      es: 'Asunto',
      en: 'Subject'
    },
    formSubjectSelect: {
      es: 'Selecciona un asunto',
      en: 'Select a subject'
    },
    subjectTracking: {
      es: 'Rastreo de Paquete',
      en: 'Package Tracking'
    },
    subjectShipping: {
      es: 'Cotización de Envío',
      en: 'Shipping Quote'
    },
    subjectAccount: {
      es: 'Problema con mi Cuenta',
      en: 'Account Issue'
    },
    subjectPayment: {
      es: 'Pagos y Facturación',
      en: 'Payments & Billing'
    },
    subjectOther: {
      es: 'Otro',
      en: 'Other'
    },
    formMessage: {
      es: 'Mensaje',
      en: 'Message'
    },
    formMessagePlaceholder: {
      es: 'Cuéntanos cómo podemos ayudarte...',
      en: 'Tell us how we can help you...'
    },
    formSubmit: {
      es: 'Enviar Mensaje',
      en: 'Send Message'
    },
    formSubmitting: {
      es: 'Enviando...',
      en: 'Sending...'
    },
    formSuccess: {
      es: '¡Mensaje enviado con éxito! Te responderemos pronto.',
      en: 'Message sent successfully! We\'ll get back to you soon.'
    },
    faqTitle: {
      es: '¿Buscas respuestas rápidas?',
      en: 'Looking for quick answers?'
    },
    faqDescription: {
      es: 'Visita nuestra sección de preguntas frecuentes para encontrar respuestas inmediatas.',
      en: 'Visit our FAQ section for immediate answers to common questions.'
    },
    faqLink: {
      es: 'Ver Preguntas Frecuentes',
      en: 'View FAQs'
    }
  }
  
  const t = createTranslations(translations)
  
  // Methods
  const handleSubmit = async () => {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    showSuccess.value = true
    isSubmitting.value = false
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }
  
  // Page meta
  useHead({
    title: 'Centro de Ayuda - Envios Comerciales Tijuana',
    meta: [
      {
        name: 'description',
        content: 'Contáctanos para cualquier pregunta sobre envíos entre San Diego y Tijuana. WhatsApp, email y formulario de contacto disponibles.'
      }
    ]
  })
  </script>
  
  <style scoped>
  /* Any custom styles if needed */
  </style>