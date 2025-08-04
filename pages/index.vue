<template>
  <div>
    <!-- WhatsApp Button -->
    <WhatsAppButton />
    
    <!-- Hero Section -->
    <MainHeroSection />
    
    <!-- Logo Carousel -->
    <LogoCarousel :animation-speed="30" />
    
    <!-- How It Works Section -->
    <MainHowItWorksSection />
    
    <!-- Pricing Section -->
    <PricingSection 
      :show-header="true" 
      :show-features="false" 
      :show-c-t-a="false"
      background-color="bg-white"
    />

    

    <CTACarouselBanner/>
    
    <!-- Testimonials Section -->
    <MainTestimonialsSection />
    
    <!-- FAQ Section -->
    <MainFAQSection />
    
    <!-- CTA Footer -->
    <CTAFooter />
    
    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup>
// Import components from Landing/Main folder
import WhatsAppButton from '~/components/Landing/WhatsAppButton.vue'
import MainHeroSection from '~/components/Landing/Main/HeroSection.vue'
import LogoCarousel from '~/components/Landing/LogoCarousel.vue'
import MainHowItWorksSection from '~/components/Landing/Main/HowItWorksSection.vue'
import MainTestimonialsSection from '~/components/Landing/Main/TestimonialsSection.vue'
import MainFAQSection from '~/components/Landing/Main/FAQSection.vue'
import CTACarouselBanner from '~/components/Landing/Main/CTACarouselBanner.vue'
import FooterSection from '~/components/Landing/FooterSection.vue'
import CTAFooter from '~/components/Landing/CTAFooter.vue'

// Define page meta to use default layout
definePageMeta({
  layout: 'default'
})
</script>