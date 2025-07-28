<template>
  <div class="min-h-screen bg-gray-50 py-20">
    <div class="max-w-4xl mx-auto px-5">
      <!-- Back Button -->
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 mb-6 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>{{ t.backButton }}</span>
      </NuxtLink>
      
      <div class="bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {{ t.title }}
        </h1>
        <p class="text-gray-600 mb-8">{{ t.lastUpdated }}: {{ currentDate }}</p>
        
        <div class="space-y-8 text-gray-700">
          <!-- Introduction -->
          <section>
            <p class="text-lg">{{ t.introduction }}</p>
          </section>

          <!-- Section 1: Service Description -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              1. {{ t.serviceTitle }}
            </h2>
            <p class="mb-4">{{ t.serviceText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.serviceItem1 }}</li>
              <li>{{ t.serviceItem2 }}</li>
              <li>{{ t.serviceItem3 }}</li>
              <li>{{ t.serviceItem4 }}</li>
            </ul>
          </section>

          <!-- Section 2: User Registration -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              2. {{ t.registrationTitle }}
            </h2>
            <p class="mb-4">{{ t.registrationText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.registrationItem1 }}</li>
              <li>{{ t.registrationItem2 }}</li>
              <li>{{ t.registrationItem3 }}</li>
              <li>{{ t.registrationItem4 }}</li>
            </ul>
          </section>

          <!-- Section 3: Use of Service -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              3. {{ t.useTitle }}
            </h2>
            <p class="mb-4">{{ t.useText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.useItem1 }}</li>
              <li>{{ t.useItem2 }}</li>
              <li>{{ t.useItem3 }}</li>
              <li>{{ t.useItem4 }}</li>
              <li>{{ t.useItem5 }}</li>
            </ul>
          </section>

          <!-- Section 4: Shipping and Delivery -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              4. {{ t.shippingTitle }}
            </h2>
            <p class="mb-4">{{ t.shippingText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.shippingItem1 }}</li>
              <li>{{ t.shippingItem2 }}</li>
              <li>{{ t.shippingItem3 }}</li>
              <li>{{ t.shippingItem4 }}</li>
              <li>{{ t.shippingItem5 }}</li>
            </ul>
          </section>

          <!-- Section 5: Fees and Payment -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              5. {{ t.feesTitle }}
            </h2>
            <p class="mb-4">{{ t.feesText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.feesItem1 }}</li>
              <li>{{ t.feesItem2 }}</li>
              <li>{{ t.feesItem3 }}</li>
              <li>{{ t.feesItem4 }}</li>
            </ul>
          </section>

          <!-- Section 6: Prohibited Items -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              6. {{ t.prohibitedTitle }}
            </h2>
            <p class="mb-4">{{ t.prohibitedText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.prohibitedItem1 }}</li>
              <li>{{ t.prohibitedItem2 }}</li>
              <li>{{ t.prohibitedItem3 }}</li>
              <li>{{ t.prohibitedItem4 }}</li>
              <li>{{ t.prohibitedItem5 }}</li>
            </ul>
          </section>

          <!-- Section 7: Insurance and Liability -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              7. {{ t.insuranceTitle }}
            </h2>
            <p class="mb-4">{{ t.insuranceText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.insuranceItem1 }}</li>
              <li>{{ t.insuranceItem2 }}</li>
              <li>{{ t.insuranceItem3 }}</li>
              <li>{{ t.insuranceItem4 }}</li>
            </ul>
          </section>

          <!-- Section 8: User Responsibilities -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              8. {{ t.responsibilitiesTitle }}
            </h2>
            <p class="mb-4">{{ t.responsibilitiesText }}</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>{{ t.responsibilitiesItem1 }}</li>
              <li>{{ t.responsibilitiesItem2 }}</li>
              <li>{{ t.responsibilitiesItem3 }}</li>
              <li>{{ t.responsibilitiesItem4 }}</li>
            </ul>
          </section>

          <!-- Section 9: Account Termination -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              9. {{ t.terminationTitle }}
            </h2>
            <p>{{ t.terminationText }}</p>
          </section>

          <!-- Section 10: Dispute Resolution -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              10. {{ t.disputeTitle }}
            </h2>
            <p>{{ t.disputeText }}</p>
          </section>

          <!-- Section 11: Limitation of Liability -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              11. {{ t.limitationTitle }}
            </h2>
            <p>{{ t.limitationText }}</p>
          </section>

          <!-- Section 12: Changes to Terms -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              12. {{ t.changesTitle }}
            </h2>
            <p>{{ t.changesText }}</p>
          </section>

          <!-- Section 13: Contact -->
          <section>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              13. {{ t.contactTitle }}
            </h2>
            <p class="mb-4">{{ t.contactText }}</p>
            <div class="mt-4 p-4 bg-gray-100 rounded-lg">
              <p class="font-semibold mb-2">{{ t.contactInfo }}</p>
              <p>Email: envioscomercialestj@gmail.com</p>
              <p>WhatsApp: +1 (619) 559-1910</p>
              <p>{{ t.address }}: 2220 Otay Lakes Road, San Diego, CA 91915</p>
              <p class="mt-2">{{ t.hours }}: {{ t.hoursDetail }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t: createTranslations, language } = useLanguage()

const currentDate = computed(() => {
  return language.value === 'es' 
    ? new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

const translations = {
  backButton: {
    es: 'Volver',
    en: 'Back'
  },
  title: {
    es: 'Términos y Condiciones',
    en: 'Terms and Conditions'
  },
  lastUpdated: {
    es: 'Última actualización',
    en: 'Last updated'
  },
  introduction: {
    es: 'Bienvenido a nuestro servicio de reenvío de paquetes. Estos términos y condiciones rigen el uso de nuestros servicios. Al registrarse y utilizar nuestros servicios, usted acepta cumplir con estos términos.',
    en: 'Welcome to our package forwarding service. These terms and conditions govern the use of our services. By registering and using our services, you agree to comply with these terms.'
  },
  serviceTitle: {
    es: 'Descripción del Servicio',
    en: 'Service Description'
  },
  serviceText: {
    es: 'Proporcionamos un servicio de reenvío de paquetes que incluye:',
    en: 'We provide a package forwarding service that includes:'
  },
  serviceItem1: {
    es: 'Asignación de una dirección personal en San Diego, California',
    en: 'Assignment of a personal address in San Diego, California'
  },
  serviceItem2: {
    es: 'Recepción de paquetes en su nombre',
    en: 'Receiving packages on your behalf'
  },
  serviceItem3: {
    es: 'Consolidación de múltiples paquetes para reducir costos',
    en: 'Consolidation of multiple packages to reduce costs'
  },
  serviceItem4: {
    es: 'Envío a su dirección en México con seguimiento en tiempo real',
    en: 'Shipping to your address in Mexico with real-time tracking'
  },
  registrationTitle: {
    es: 'Registro de Usuario',
    en: 'User Registration'
  },
  registrationText: {
    es: 'Para usar nuestros servicios, debe:',
    en: 'To use our services, you must:'
  },
  registrationItem1: {
    es: 'Ser mayor de 18 años',
    en: 'Be over 18 years old'
  },
  registrationItem2: {
    es: 'Proporcionar información verdadera y completa',
    en: 'Provide true and complete information'
  },
  registrationItem3: {
    es: 'Mantener actualizada su información de contacto',
    en: 'Keep your contact information updated'
  },
  registrationItem4: {
    es: 'Proteger la confidencialidad de su cuenta',
    en: 'Protect the confidentiality of your account'
  },
  useTitle: {
    es: 'Uso del Servicio',
    en: 'Use of Service'
  },
  useText: {
    es: 'Al usar nuestro servicio, usted se compromete a:',
    en: 'By using our service, you agree to:'
  },
  useItem1: {
    es: 'Usar la dirección asignada con el formato "ECTJ [Su Nombre]" en todas sus compras',
    en: 'Use the assigned address with the format "ECTJ [Your Name]" in all your purchases'
  },
  useItem2: {
    es: 'No realizar compras de artículos prohibidos o restringidos',
    en: 'Not purchase prohibited or restricted items'
  },
  useItem3: {
    es: 'Cumplir con todas las leyes aplicables',
    en: 'Comply with all applicable laws'
  },
  useItem4: {
    es: 'No usar el servicio para actividades ilegales',
    en: 'Not use the service for illegal activities'
  },
  useItem5: {
    es: 'Notificarnos de cualquier paquete esperado',
    en: 'Notify us of any expected packages'
  },
  shippingTitle: {
    es: 'Envío y Entrega',
    en: 'Shipping and Delivery'
  },
  shippingText: {
    es: 'Condiciones de envío:',
    en: 'Shipping conditions:'
  },
  shippingItem1: {
    es: 'Los tiempos de entrega son de 3 a 5 días hábiles después de recibir su paquete',
    en: 'Delivery times are 3 to 5 business days after receiving your package'
  },
  shippingItem2: {
    es: 'Es responsabilidad del cliente proporcionar una dirección completa y correcta',
    en: 'It is the customer\'s responsibility to provide a complete and correct address'
  },
  shippingItem3: {
    es: 'No nos hacemos responsables por direcciones incorrectas proporcionadas por el cliente',
    en: 'We are not responsible for incorrect addresses provided by the customer'
  },
  shippingItem4: {
    es: 'Proporcionamos seguimiento en tiempo real de todos los envíos',
    en: 'We provide real-time tracking of all shipments'
  },
  shippingItem5: {
    es: 'Los paquetes no reclamados después de 30 días serán devueltos o destruidos',
    en: 'Unclaimed packages after 30 days will be returned or destroyed'
  },
  feesTitle: {
    es: 'Tarifas y Pagos',
    en: 'Fees and Payments'
  },
  feesText: {
    es: 'Estructura de tarifas:',
    en: 'Fee structure:'
  },
  feesItem1: {
    es: 'El registro es gratuito',
    en: 'Registration is free'
  },
  feesItem2: {
    es: 'Las tarifas de envío se calculan según peso y dimensiones',
    en: 'Shipping fees are calculated based on weight and dimensions'
  },
  feesItem3: {
    es: 'No hay cargos ocultos - el precio cotizado es el precio final',
    en: 'No hidden fees - the quoted price is the final price'
  },
  feesItem4: {
    es: 'El pago debe realizarse antes del envío',
    en: 'Payment must be made before shipping'
  },
  prohibitedTitle: {
    es: 'Artículos Prohibidos',
    en: 'Prohibited Items'
  },
  prohibitedText: {
    es: 'No procesamos envíos de:',
    en: 'We do not process shipments of:'
  },
  prohibitedItem1: {
    es: 'Armas de fuego, municiones o explosivos',
    en: 'Firearms, ammunition or explosives'
  },
  prohibitedItem2: {
    es: 'Sustancias ilegales o controladas',
    en: 'Illegal or controlled substances'
  },
  prohibitedItem3: {
    es: 'Materiales peligrosos o inflamables',
    en: 'Hazardous or flammable materials'
  },
  prohibitedItem4: {
    es: 'Productos falsificados o pirateados',
    en: 'Counterfeit or pirated products'
  },
  prohibitedItem5: {
    es: 'Cualquier artículo prohibido por las leyes de EE.UU. o México',
    en: 'Any item prohibited by US or Mexican laws'
  },
  insuranceTitle: {
    es: 'Seguro y Responsabilidad',
    en: 'Insurance and Liability'
  },
  insuranceText: {
    es: 'Política de seguro:',
    en: 'Insurance policy:'
  },
  insuranceItem1: {
    es: 'Todos los envíos incluyen seguro básico',
    en: 'All shipments include basic insurance'
  },
  insuranceItem2: {
    es: 'Puede contratar seguro adicional para artículos de alto valor',
    en: 'You can purchase additional insurance for high-value items'
  },
  insuranceItem3: {
    es: 'Las reclamaciones deben presentarse dentro de 7 días de la entrega',
    en: 'Claims must be filed within 7 days of delivery'
  },
  insuranceItem4: {
    es: 'Se requiere documentación para procesar reclamaciones',
    en: 'Documentation is required to process claims'
  },
  responsibilitiesTitle: {
    es: 'Responsabilidades del Usuario',
    en: 'User Responsibilities'
  },
  responsibilitiesText: {
    es: 'El usuario es responsable de:',
    en: 'The user is responsible for:'
  },
  responsibilitiesItem1: {
    es: 'Proporcionar información precisa y completa',
    en: 'Providing accurate and complete information'
  },
  responsibilitiesItem2: {
    es: 'Pagar todos los impuestos y aranceles aplicables',
    en: 'Paying all applicable taxes and duties'
  },
  responsibilitiesItem3: {
    es: 'Cumplir con las regulaciones aduanales',
    en: 'Complying with customs regulations'
  },
  responsibilitiesItem4: {
    es: 'Asegurar que las compras cumplan con las leyes locales',
    en: 'Ensuring purchases comply with local laws'
  },
  terminationTitle: {
    es: 'Terminación de Cuenta',
    en: 'Account Termination'
  },
  terminationText: {
    es: 'Nos reservamos el derecho de suspender o terminar su cuenta si viola estos términos, usa el servicio para actividades ilegales, o proporciona información falsa. Usted puede cancelar su cuenta en cualquier momento contactándonos.',
    en: 'We reserve the right to suspend or terminate your account if you violate these terms, use the service for illegal activities, or provide false information. You may cancel your account at any time by contacting us.'
  },
  disputeTitle: {
    es: 'Resolución de Disputas',
    en: 'Dispute Resolution'
  },
  disputeText: {
    es: 'Cualquier disputa será resuelta mediante negociación directa. Si no se puede resolver amigablemente, se someterá a arbitraje según las leyes aplicables. El cliente acepta que cualquier disputa se resolverá individualmente, sin recurrir a acciones colectivas.',
    en: 'Any dispute will be resolved through direct negotiation. If it cannot be resolved amicably, it will be submitted to arbitration according to applicable laws. The customer agrees that any dispute will be resolved individually, without resorting to class actions.'
  },
  limitationTitle: {
    es: 'Limitación de Responsabilidad',
    en: 'Limitation of Liability'
  },
  limitationText: {
    es: 'Nuestra responsabilidad está limitada al valor declarado del paquete. No somos responsables por daños indirectos, incidentales o consecuentes. No garantizamos tiempos de entrega específicos en casos de fuerza mayor.',
    en: 'Our liability is limited to the declared value of the package. We are not responsible for indirect, incidental or consequential damages. We do not guarantee specific delivery times in cases of force majeure.'
  },
  changesTitle: {
    es: 'Cambios a los Términos',
    en: 'Changes to Terms'
  },
  changesText: {
    es: 'Podemos modificar estos términos en cualquier momento. Los cambios serán efectivos al publicarse en nuestro sitio web. El uso continuo del servicio después de los cambios constituye aceptación de los nuevos términos.',
    en: 'We may modify these terms at any time. Changes will be effective upon posting on our website. Continued use of the service after changes constitutes acceptance of the new terms.'
  },
  contactTitle: {
    es: 'Contáctenos',
    en: 'Contact Us'
  },
  contactText: {
    es: 'Para preguntas sobre estos términos y condiciones:',
    en: 'For questions about these terms and conditions:'
  },
  contactInfo: {
    es: 'Información de Contacto',
    en: 'Contact Information'
  },
  address: {
    es: 'Dirección',
    en: 'Address'
  },
  hours: {
    es: 'Horario de atención',
    en: 'Business hours'
  },
  hoursDetail: {
    es: 'Lunes a Viernes 9:00 AM - 6:00 PM, Sábado 10:00 AM - 2:00 PM',
    en: 'Monday to Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 2:00 PM'
  }
}

const t = createTranslations(translations)
</script>