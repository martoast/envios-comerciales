<template>
  <div>
    <!-- WhatsApp Button -->
    <WhatsAppButton />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Logo Carousel -->
    <LogoCarousel :animation-speed="30" />
    
    <!-- How It Works Section -->
    <HowItWorksSection />
    
    <!-- Pricing Section -->
    <PricingSection 
      :show-header="true" 
      :show-features="false" 
      :show-c-t-a="false"
      background-color="bg-white"
    />
    
    <!-- Calculator Section -->
    <BoxCalculator />
    
    <!-- Trust Section -->
    <TrustSection />
    
    <!-- Testimonials Section -->
    <TestimonialsSection />
    
    <!-- FAQ Section -->
    <FAQSection />
    
    <!-- CTA Footer -->
    <CTAFooter />
    
    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup>
// Define page meta to use default layout
definePageMeta({
  layout: 'default'
})
</script>