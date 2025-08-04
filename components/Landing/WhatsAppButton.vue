<template>
  <a
    :href="t.whatsappLink"
    class="fixed bottom-[30px] right-[30px] z-[1000] w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center animate-pulse cursor-pointer no-underline shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)] hover:scale-110 transition-all duration-300"
    target="_blank"
    aria-label="Contactar por WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-8 h-8">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.052 2.002c-5.524 0-10.002 4.478-10.002 10.002 0 1.757.458 3.425 1.294 4.886l-1.294 4.744 4.862-1.272c1.411.77 2.999 1.196 4.636 1.196 5.524 0 10.002-4.478 10.002-10.002s-4.478-10.002-10.002-10.002z"/>
    </svg>
  </a>
</template>

<script setup>
const { t: createTranslations } = useLanguage()

const translations = {
  whatsappLink: {
    es: 'https://wa.me/16195591910?text=Hola!%20Quiero%20una%20cotizaci%C3%B3n.',
    en: 'https://wa.me/16195591910?text=Hi!%20I%20want%20a%20quote.'
  }
}

const t = createTranslations(translations)
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 5px 30px rgba(37, 211, 102, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>