<template>
  <div>
    <!-- WhatsApp Button -->
    <WhatsAppButton />

    <!-- Hero Section -->
    <MainHeroSection />

    <!-- Logo Carousel -->
    <LogoCarousel :animation-speed="30" />

    <!-- How It Works Section -->
    <MainStepsSection />

    <CTAFooter />

    <BoxPricing/>

    <!-- <CTACarouselBanner/> -->

    <!-- Affiliate Program Promo -->
    <AffiliatePromoSection />

    <!-- Testimonials Section -->
    <!-- <MainTestimonialsSection /> -->

    <!-- CTA Footer -->
    

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup>
// Import components from Landing/Main folder
import WhatsAppButton from '~/components/Landing/WhatsAppButton.vue'
import MainHeroSection from '~/components/Landing/Main/HeroSection.vue'
import LogoCarousel from '~/components/Landing/LogoCarousel.vue'
import MainStepsSection from '~/components/Landing/Main/StepsSection.vue'
import MainTestimonialsSection from '~/components/Landing/Main/TestimonialsSection.vue'
import CTACarouselBanner from '~/components/Landing/Main/CTACarouselBanner.vue'
import AffiliatePromoSection from '~/components/Landing/Main/AffiliatePromoSection.vue'
import FooterSection from '~/components/Landing/FooterSection.vue'
import CTAFooter from '~/components/Landing/CTAFooter.vue'

// Define page meta to use default layout
definePageMeta({
  layout: 'default'
})
</script>