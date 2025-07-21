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
  
            <!-- Section 1: Information Collection -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                1. {{ t.informationCollectionTitle }}
              </h2>
              <p class="mb-4">{{ t.informationCollectionText }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>{{ t.infoItem1 }}</li>
                <li>{{ t.infoItem2 }}</li>
                <li>{{ t.infoItem3 }}</li>
                <li>{{ t.infoItem4 }}</li>
                <li>{{ t.infoItem5 }}</li>
              </ul>
            </section>
  
            <!-- Section 2: Use of Information -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                2. {{ t.useOfInformationTitle }}
              </h2>
              <p class="mb-4">{{ t.useOfInformationText }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>{{ t.useItem1 }}</li>
                <li>{{ t.useItem2 }}</li>
                <li>{{ t.useItem3 }}</li>
                <li>{{ t.useItem4 }}</li>
                <li>{{ t.useItem5 }}</li>
              </ul>
            </section>
  
            <!-- Section 3: Information Protection -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                3. {{ t.protectionTitle }}
              </h2>
              <p class="mb-4">{{ t.protectionText }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>{{ t.protectionItem1 }}</li>
                <li>{{ t.protectionItem2 }}</li>
                <li>{{ t.protectionItem3 }}</li>
              </ul>
            </section>
  
            <!-- Section 4: Information Sharing -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                4. {{ t.sharingTitle }}
              </h2>
              <p class="mb-4">{{ t.sharingText }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>{{ t.sharingItem1 }}</li>
                <li>{{ t.sharingItem2 }}</li>
                <li>{{ t.sharingItem3 }}</li>
                <li>{{ t.sharingItem4 }}</li>
              </ul>
            </section>
  
            <!-- Section 5: Cookies -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                5. {{ t.cookiesTitle }}
              </h2>
              <p>{{ t.cookiesText }}</p>
            </section>
  
            <!-- Section 6: User Rights -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                6. {{ t.rightsTitle }}
              </h2>
              <p class="mb-4">{{ t.rightsText }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>{{ t.rightsItem1 }}</li>
                <li>{{ t.rightsItem2 }}</li>
                <li>{{ t.rightsItem3 }}</li>
                <li>{{ t.rightsItem4 }}</li>
              </ul>
            </section>
  
            <!-- Section 7: Data Retention -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                7. {{ t.retentionTitle }}
              </h2>
              <p>{{ t.retentionText }}</p>
            </section>
  
            <!-- Section 8: International Transfers -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                8. {{ t.internationalTitle }}
              </h2>
              <p>{{ t.internationalText }}</p>
            </section>
  
            <!-- Section 9: Minors -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                9. {{ t.minorsTitle }}
              </h2>
              <p>{{ t.minorsText }}</p>
            </section>
  
            <!-- Section 10: Changes -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                10. {{ t.changesTitle }}
              </h2>
              <p>{{ t.changesText }}</p>
            </section>
  
            <!-- Section 11: Contact -->
            <section>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                11. {{ t.contactTitle }}
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
  const { t: createTranslations } = useLanguage()
  
  const currentDate = new Date().toLocaleDateString('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  const translations = {
    backButton: {
      es: 'Volver',
      en: 'Back'
    },
    title: {
      es: 'Política de Privacidad',
      en: 'Privacy Policy'
    },
    lastUpdated: {
      es: 'Última actualización',
      en: 'Last updated'
    },
    introduction: {
      es: 'En nuestra empresa, valoramos y respetamos su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestros servicios de envío desde Estados Unidos a México.',
      en: 'At our company, we value and respect your privacy. This policy describes how we collect, use, and protect your personal information when you use our shipping services from the United States to Mexico.'
    },
    informationCollectionTitle: {
      es: 'Información que Recopilamos',
      en: 'Information We Collect'
    },
    informationCollectionText: {
      es: 'Recopilamos información que usted nos proporciona directamente, incluyendo:',
      en: 'We collect information that you provide directly to us, including:'
    },
    infoItem1: {
      es: 'Información personal: nombre completo, dirección de correo electrónico, número de teléfono',
      en: 'Personal information: full name, email address, phone number'
    },
    infoItem2: {
      es: 'Información de envío: direcciones de entrega en México',
      en: 'Shipping information: delivery addresses in Mexico'
    },
    infoItem3: {
      es: 'Información de pago: datos de tarjeta de crédito (procesados de forma segura)',
      en: 'Payment information: credit card data (securely processed)'
    },
    infoItem4: {
      es: 'Información de compras: detalles de los productos que recibimos para usted',
      en: 'Purchase information: details of products we receive for you'
    },
    infoItem5: {
      es: 'Comunicaciones: mensajes y consultas que nos envía',
      en: 'Communications: messages and inquiries you send us'
    },
    useOfInformationTitle: {
      es: 'Uso de la Información',
      en: 'Use of Information'
    },
    useOfInformationText: {
      es: 'Utilizamos su información para:',
      en: 'We use your information to:'
    },
    useItem1: {
      es: 'Procesar y gestionar sus envíos',
      en: 'Process and manage your shipments'
    },
    useItem2: {
      es: 'Comunicarnos con usted sobre el estado de sus paquetes',
      en: 'Communicate with you about your package status'
    },
    useItem3: {
      es: 'Procesar pagos y prevenir fraudes',
      en: 'Process payments and prevent fraud'
    },
    useItem4: {
      es: 'Cumplir con las regulaciones aduanales y legales',
      en: 'Comply with customs and legal regulations'
    },
    useItem5: {
      es: 'Mejorar nuestros servicios y atención al cliente',
      en: 'Improve our services and customer support'
    },
    protectionTitle: {
      es: 'Protección de la Información',
      en: 'Information Protection'
    },
    protectionText: {
      es: 'Implementamos medidas de seguridad para proteger su información:',
      en: 'We implement security measures to protect your information:'
    },
    protectionItem1: {
      es: 'Encriptación SSL para todas las transacciones',
      en: 'SSL encryption for all transactions'
    },
    protectionItem2: {
      es: 'Acceso restringido a información personal',
      en: 'Restricted access to personal information'
    },
    protectionItem3: {
      es: 'Monitoreo regular de nuestros sistemas de seguridad',
      en: 'Regular monitoring of our security systems'
    },
    sharingTitle: {
      es: 'Compartir Información',
      en: 'Information Sharing'
    },
    sharingText: {
      es: 'No vendemos su información personal. Compartimos información solo cuando:',
      en: 'We do not sell your personal information. We share information only when:'
    },
    sharingItem1: {
      es: 'Es necesario para completar su envío (transportistas, aduanas)',
      en: 'Necessary to complete your shipment (carriers, customs)'
    },
    sharingItem2: {
      es: 'Es requerido por ley o proceso legal',
      en: 'Required by law or legal process'
    },
    sharingItem3: {
      es: 'Usted nos da su consentimiento explícito',
      en: 'You give us explicit consent'
    },
    sharingItem4: {
      es: 'Es necesario para proteger nuestros derechos o seguridad',
      en: 'Necessary to protect our rights or security'
    },
    cookiesTitle: {
      es: 'Cookies',
      en: 'Cookies'
    },
    cookiesText: {
      es: 'Utilizamos cookies para mejorar su experiencia en nuestro sitio web, recordar sus preferencias y analizar el uso del sitio. Puede configurar su navegador para rechazar cookies, pero esto podría afectar la funcionalidad del sitio.',
      en: 'We use cookies to improve your experience on our website, remember your preferences, and analyze site usage. You can configure your browser to reject cookies, but this may affect site functionality.'
    },
    rightsTitle: {
      es: 'Sus Derechos',
      en: 'Your Rights'
    },
    rightsText: {
      es: 'Usted tiene derecho a:',
      en: 'You have the right to:'
    },
    rightsItem1: {
      es: 'Acceder a su información personal',
      en: 'Access your personal information'
    },
    rightsItem2: {
      es: 'Corregir información incorrecta',
      en: 'Correct incorrect information'
    },
    rightsItem3: {
      es: 'Solicitar la eliminación de su información',
      en: 'Request deletion of your information'
    },
    rightsItem4: {
      es: 'Optar por no recibir comunicaciones promocionales',
      en: 'Opt out of promotional communications'
    },
    retentionTitle: {
      es: 'Retención de Datos',
      en: 'Data Retention'
    },
    retentionText: {
      es: 'Mantenemos su información personal mientras su cuenta esté activa o según sea necesario para proporcionarle servicios. Retenemos y usamos su información según sea necesario para cumplir con nuestras obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.',
      en: 'We maintain your personal information while your account is active or as needed to provide you services. We retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.'
    },
    internationalTitle: {
      es: 'Transferencias Internacionales',
      en: 'International Transfers'
    },
    internationalText: {
      es: 'Su información puede ser transferida y mantenida en servidores ubicados fuera de su país de residencia. Al usar nuestros servicios, usted consiente estas transferencias.',
      en: 'Your information may be transferred to and maintained on servers located outside your country of residence. By using our services, you consent to these transfers.'
    },
    minorsTitle: {
      es: 'Menores de Edad',
      en: 'Minors'
    },
    minorsText: {
      es: 'Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos intencionalmente información de menores de edad.',
      en: 'Our services are not directed to persons under 18 years of age. We do not intentionally collect information from minors.'
    },
    changesTitle: {
      es: 'Cambios a esta Política',
      en: 'Changes to this Policy'
    },
    changesText: {
      es: 'Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios significativos publicando la nueva política en nuestro sitio web.',
      en: 'We may update this privacy policy occasionally. We will notify you of significant changes by posting the new policy on our website.'
    },
    contactTitle: {
      es: 'Contáctenos',
      en: 'Contact Us'
    },
    contactText: {
      es: 'Si tiene preguntas sobre esta política de privacidad o nuestras prácticas de información, contáctenos:',
      en: 'If you have questions about this privacy policy or our information practices, contact us:'
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