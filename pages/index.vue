<template>
  <div>
    <!-- WhatsApp Button -->
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

    <!-- Hero Section -->
    <header class="min-h-[95vh] flex items-center text-center py-[120px] px-5 bg-white">
      <div class="max-w-[800px] mx-auto animate-fadeIn">
        <svg class="w-[100px] h-auto mb-5 mx-auto" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <g stroke="#0d2c4f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
            <line x1="0" y1="35" x2="40" y2="35" />
            <line x1="5" y1="50" x2="45" y2="50" />
            <line x1="0" y1="65" x2="40" y2="65" />
            <path fill="#FFC107" d="M 55,25 L 105,25 L 125,45 L 75,45 Z" />
            <path fill="#FFA000" d="M 55,25 L 55,75 L 75,95 L 75,45 Z" />
            <path fill="#FF8F00" d="M 75,95 L 125,95 L 125,45 L 75,45 Z" />
          </g>
        </svg>
        <h1 class="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-extrabold text-gray-900 leading-tight mb-5">
          <span v-html="t.heroTitle"></span>
        </h1>
        <p class="text-[1.1rem] md:text-[1.25rem] max-w-[650px] mx-auto mb-[30px] text-gray-600">
          {{ t.heroSubtitle }}
        </p>
        <div class="flex justify-center gap-[15px] flex-wrap">
          <a href="#pricing" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600">
            {{ t.ctaPlans }}
          </a>
          <a href="#calculator" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 cursor-pointer transition-all duration-300 border-gray-200 bg-white text-gray-900 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5">
            {{ t.ctaEstimate }}
          </a>
        </div>
      </div>
    </header>

    <section id="logos" class="py-16 px-5 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 fade-in-section overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="text-center font-semibold text-gray-700 mb-10 text-lg">
          {{ t.logosHeader }}
        </div>
        
        <!-- Mobile Grid Layout -->
        <div class="md:hidden">
          <div class="grid grid-cols-3 gap-6">
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/21afeea318a64a71bcb1dbd3ef27ffec/shein-logo.png" 
                   alt="SHEIN Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/c7378301189a420a8648cdc317dad98b/sephora.png" 
                   alt="Sephora Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/4342cf740e1d4c809a5266f006012ffc/macys-logo.png" 
                   alt="Macy's Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9b11fc458968411b972a0f7df9e42c67/apple-logo.png" 
                   alt="Apple Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/22ea4c4db5df4d4fbb4f5067de096869/shop-disney-logo.png" 
                   alt="Disney Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9c6f199c00bc41a8ba335347cbb4ac66/ready-edit-nordstrom-logo-transparent-2.png" 
                   alt="Nordstrom Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3706eb76defa4368bf0c8b1d738b3456/amazon-logo.png" 
                   alt="Amazon Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/7569832f95cb49f8af42a2aa4c4adc8d/walmart-logo.png" 
                   alt="Walmart Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/fbd77ea07e224a73b1fecf4137d7ba78/ebay-logo.png" 
                   alt="eBay Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/f3ffc5a464e94ff89d4405d026923c27/bath-body-works.png" 
                   alt="Bath & Body Works Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3e5ad2a7062640a1a4fee03f0004ebbe/gap.png" 
                   alt="Gap Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
            
            <div class="flex items-center justify-center">
              <img src="https://static.nc-myus.com/images/pub/www/uploads/image/774f8d281cfe45ef81f7882de1599be2/carters-logo-120x120.png" 
                   alt="Carter's Logo" 
                   class="h-16 w-auto max-w-[100px] object-contain grayscale opacity-60">
            </div>
          </div>
        </div>
        
        <!-- Desktop Carousel -->
        <div class="hidden md:block relative">
          <!-- Gradient Overlays for smooth edges -->
          <div class="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none md:w-32"></div>
          <div class="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none md:w-32"></div>
          
          <!-- Carousel Wrapper -->
          <div 
            ref="logoCarousel"
            class="flex overflow-x-auto scrollbar-hide touch-pan-x"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @touchstart="startTouch"
            @touchmove="onTouch"
            @touchend="endTouch"
          >
            <!-- Logo Track - Duplicated for infinite scroll effect -->
            <div class="flex animate-scroll-logos">
              <!-- First set of logos -->
              <div class="flex items-center gap-12 px-6">
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/21afeea318a64a71bcb1dbd3ef27ffec/shein-logo.png" 
                     alt="SHEIN Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/c7378301189a420a8648cdc317dad98b/sephora.png" 
                     alt="Sephora Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/4342cf740e1d4c809a5266f006012ffc/macys-logo.png" 
                     alt="Macy's Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9b11fc458968411b972a0f7df9e42c67/apple-logo.png" 
                     alt="Apple Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/22ea4c4db5df4d4fbb4f5067de096869/shop-disney-logo.png" 
                     alt="Disney Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9c6f199c00bc41a8ba335347cbb4ac66/ready-edit-nordstrom-logo-transparent-2.png" 
                     alt="Nordstrom Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3706eb76defa4368bf0c8b1d738b3456/amazon-logo.png" 
                     alt="Amazon Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/7569832f95cb49f8af42a2aa4c4adc8d/walmart-logo.png" 
                     alt="Walmart Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/fbd77ea07e224a73b1fecf4137d7ba78/ebay-logo.png" 
                     alt="eBay Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/f3ffc5a464e94ff89d4405d026923c27/bath-body-works.png" 
                     alt="Bath & Body Works Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3e5ad2a7062640a1a4fee03f0004ebbe/gap.png" 
                     alt="Gap Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/774f8d281cfe45ef81f7882de1599be2/carters-logo-120x120.png" 
                     alt="Carter's Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
              </div>
              
              <!-- Duplicate set for seamless loop -->
              <div class="flex items-center gap-12 px-6">
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/21afeea318a64a71bcb1dbd3ef27ffec/shein-logo.png" 
                     alt="SHEIN Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/c7378301189a420a8648cdc317dad98b/sephora.png" 
                     alt="Sephora Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/4342cf740e1d4c809a5266f006012ffc/macys-logo.png" 
                     alt="Macy's Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9b11fc458968411b972a0f7df9e42c67/apple-logo.png" 
                     alt="Apple Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/22ea4c4db5df4d4fbb4f5067de096869/shop-disney-logo.png" 
                     alt="Disney Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/9c6f199c00bc41a8ba335347cbb4ac66/ready-edit-nordstrom-logo-transparent-2.png" 
                     alt="Nordstrom Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3706eb76defa4368bf0c8b1d738b3456/amazon-logo.png" 
                     alt="Amazon Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/7569832f95cb49f8af42a2aa4c4adc8d/walmart-logo.png" 
                     alt="Walmart Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/fbd77ea07e224a73b1fecf4137d7ba78/ebay-logo.png" 
                     alt="eBay Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/f3ffc5a464e94ff89d4405d026923c27/bath-body-works.png" 
                     alt="Bath & Body Works Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/3e5ad2a7062640a1a4fee03f0004ebbe/gap.png" 
                     alt="Gap Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
                
                <img src="https://static.nc-myus.com/images/pub/www/uploads/image/774f8d281cfe45ef81f7882de1599be2/carters-logo-120x120.png" 
                     alt="Carter's Logo" 
                     class="h-20 w-auto max-w-[280px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer transform hover:scale-110">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.howItWorksTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.howItWorksTitle }}</h2>
          <p class="text-lg text-gray-600">{{ t.howItWorksSubtitle }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          <div v-for="(step, index) in t.steps" :key="index" class="bg-white p-8 rounded-2xl border border-gray-200 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div class="w-16 h-16 bg-primary-50 text-primary-500 rounded-full inline-flex items-center justify-center mb-5">
              <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M21.6 12.6L23 12l-1.4-2.4-1.4 2.4zM20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 6h4v2h-4V6z"/>
              </svg>
              <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zm-1.5 6.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[30px] h-[30px]">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
            <h3 class="text-xl mb-2.5 font-bold">{{ step.title }}</h3>
            <p class="text-base mb-0">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section id="calculator" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.calculatorTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.calculatorTitle }}</h2>
          <p class="text-lg text-gray-600">{{ t.calculatorSubtitle }}</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-[30px]">
            <div class="flex flex-col">
              <label for="length" class="font-semibold mb-2 text-gray-900">{{ t.length }}</label>
              <input v-model.number="dimensions.length" type="number" id="length" placeholder="0" class="w-full p-3 rounded-lg border border-gray-200 text-base">
            </div>
            <div class="flex flex-col">
              <label for="width" class="font-semibold mb-2 text-gray-900">{{ t.width }}</label>
              <input v-model.number="dimensions.width" type="number" id="width" placeholder="0" class="w-full p-3 rounded-lg border border-gray-200 text-base">
            </div>
            <div class="flex flex-col">
              <label for="height" class="font-semibold mb-2 text-gray-900">{{ t.height }}</label>
              <input v-model.number="dimensions.height" type="number" id="height" placeholder="0" class="w-full p-3 rounded-lg border border-gray-200 text-base">
            </div>
            <div class="flex flex-col">
              <label class="font-semibold mb-2 text-gray-900">{{ t.unit }}</label>
              <div class="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button
                  @click="currentUnit = 'cm'"
                  :class="['flex-1 p-2 border-none bg-transparent rounded-md cursor-pointer font-semibold transition-all duration-200', currentUnit === 'cm' ? 'bg-primary-500 text-white' : '']"
                >
                  cm
                </button>
                <button
                  @click="currentUnit = 'in'"
                  :class="['flex-1 p-2 border-none bg-transparent rounded-md cursor-pointer font-semibold transition-all duration-200', currentUnit === 'in' ? 'bg-primary-500 text-white' : '']"
                >
                  in
                </button>
              </div>
            </div>
          </div>
          <button @click="calculatePrice" class="w-full px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600">
            {{ t.estimateCost }}
          </button>
          <div v-if="calculatorResult.show" :class="['mt-[30px] p-5 rounded-xl text-center animate-fadeIn', calculatorResult.type === 'success' ? 'bg-green-50 border border-green-500' : 'bg-red-50 border border-red-500']">
            <h3 class="mb-[10px] text-[1.25rem] font-bold" v-html="calculatorResult.title"></h3>
            <p class="mb-0" v-html="calculatorResult.message"></p>
            <p v-if="calculatorResult.subtext" class="text-[0.9rem] text-gray-600 mt-2" v-html="calculatorResult.subtext"></p>
            <div v-if="calculatorResult.showTip" class="mt-5 p-[15px] bg-primary-50 rounded-lg text-[0.95rem]" v-html="t.consolidationTip"></div>
            <a v-if="calculatorResult.showContactBtn" :href="calculatorResult.contactLink" target="_blank" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600 mt-[15px]">
              {{ t.contactBtn }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.pricingTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.pricingTitle }}</h2>
          <p class="text-lg text-gray-600">{{ t.pricingSubtitle }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] items-stretch justify-center">
          <div v-for="(plan, index) in t.pricingPlans" :key="index" :class="['bg-white p-8 rounded-2xl border-2 shadow-md flex flex-col text-center transition-all duration-300 relative w-full max-w-sm mx-auto', plan.featured ? 'border-primary-500 shadow-lg' : 'border-gray-200']">
            <div v-if="plan.featured" class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">{{ t.mostPopular }}</div>
            <div class="text-lg font-bold text-primary-500 mb-4">{{ plan.name }}</div>
            <div class="text-5xl font-extrabold text-gray-900 mb-6">${{ plan.price }} <span class="text-2xl text-gray-600 font-medium">USD</span></div>
            <ul class="list-none mb-8 text-left flex-grow">
              <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="flex items-center gap-2.5 mb-3">
                <span class="text-green-500 w-5 h-5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </span>
                <div>
                  <strong>{{ feature.label }}:</strong> {{ feature.value }}
                </div>
              </li>
            </ul>
            <a :href="plan.link" :class="plan.featured ? 'w-full mt-auto px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-primary-500 text-white shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-primary-600' : 'w-full mt-auto px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 cursor-pointer transition-all duration-300 border-gray-200 bg-white text-gray-900 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5'" target="_blank" rel="noopener noreferrer">
              {{ plan.buttonText }}
            </a>
          </div>
        </div>
        <div class="max-w-2xl mx-auto mt-14 p-5 bg-primary-50 border border-blue-200 rounded-2xl text-sm">
          <p>{{ t.paymentNote }}</p>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section id="trust" class="py-24 px-5 bg-white">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.trustTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.trustTitle }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <div v-for="(item, index) in t.trustItems" :key="index" class="flex items-start gap-5">
            <div class="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center">
              <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1.05 15.54L6.4 12.03l1.41-1.41L10.95 14.2l5.24-5.24 1.41 1.41L10.95 16.54z"/>
              </svg>
              <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M12 2L4 6v12h16V6l-8-4zm4 14h-3v-4h-2v4H8V9h8v7z"/>
              </svg>
              <svg v-else-if="index === 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <svg v-else-if="index === 4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-[1.2rem] mb-[5px] font-bold">{{ item.title }}</h3>
              <p class="text-[0.95rem] mb-0">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-24 px-5">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.testimonialsTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.testimonialsTitle }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <div v-for="(testimonial, index) in t.testimonials" :key="index" class="bg-white p-[30px] rounded-2xl border border-gray-200">
            <div class="stars text-yellow-500 mb-[15px]">
              <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <p class="italic mb-5 text-gray-900">"{{ testimonial.quote }}"</p>
            <div class="font-bold text-gray-900">
              {{ testimonial.author }} - <span class="font-normal text-gray-600">{{ testimonial.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-24 px-5 bg-white">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <span class="text-primary-500 font-semibold mb-2.5 block uppercase tracking-wider">{{ t.faqTagline }}</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold text-gray-900 leading-tight">{{ t.faqTitle }}</h2>
        </div>
        <div class="max-w-[800px] mx-auto">
          <div v-for="(faq, index) in t.faqs" :key="index" class="border-b border-gray-200 last:border-b-0">
            <button
              @click="openFaq = openFaq === index ? -1 : index"
              class="w-full p-5 flex justify-between items-center text-left bg-transparent border-none cursor-pointer text-[1.1rem] font-semibold text-gray-900 hover:text-primary-500"
            >
              <span>{{ faq.question }}</span>
              <svg
                :class="['transition-transform duration-300', openFaq === index ? 'rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div
              v-show="openFaq === index"
              class="overflow-hidden transition-all duration-300"
            >
              <p class="px-5 pb-5 m-0 text-base">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section class="bg-dark-500 text-white py-20 px-5 text-center">
      <div class="max-w-6xl mx-auto px-5 fade-in-section">
        <h2 class="text-4xl mb-4 text-white">{{ t.ctaFooterTitle }}</h2>
        <p class="text-lg mb-8 text-white/80 max-w-2xl mx-auto">{{ t.ctaFooterSubtitle }}</p>
        <a :href="t.ctaFooterLink" target="_blank" class="px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold text-lg no-underline border-2 border-transparent cursor-pointer transition-all duration-300 bg-white text-primary-500 shadow-md hover:-translate-y-1 hover:shadow-lg">
          {{ t.contactWhatsApp }}
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-500 text-white/70 py-12 px-5 text-base border-t border-white/10">
      <div class="max-w-6xl mx-auto px-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-left md:text-left">
          <div>
            <h4 class="text-white mb-4 text-lg">{{ t.addressUSA }}</h4>
            <p class="m-0">
              2220 Otay Lakes Road<br>
              San Diego, CA 91915<br>
              United States
            </p>
          </div>
          <div>
            <h4 class="text-white mb-4 text-lg">{{ t.contact }}</h4>
            <ul class="list-none p-0 m-0">
              <li class="mb-2">
                <a href="mailto:erickmartos00@gmail.com" class="text-white/70 no-underline hover:text-white hover:underline">erickmartos00@gmail.com</a>
              </li>
              <li class="mb-2">
                <a href="https://wa.me/16195591910" target="_blank" class="text-white/70 no-underline hover:text-white hover:underline">WhatsApp: +1 (619) 559-1910</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-white mb-4 text-lg">{{ t.businessHours }}</h4>
            <p class="m-0">
              {{ t.hoursWeekdays }}<br>
              {{ t.hoursSaturday }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10 pt-5 border-t border-white/10">
          <p class="m-0">{{ t.copyright }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Define page meta to use default layout
definePageMeta({
  layout: 'default'
})

// Use the language composable
const { t: createTranslations } = useLanguage()

// Calculator state
const dimensions = ref({ length: 0, width: 0, height: 0 })
const currentUnit = ref('cm')
const calculatorResult = ref({
  show: false,
  type: '',
  title: '',
  message: '',
  subtext: '',
  showTip: false,
  showContactBtn: false,
  contactLink: ''
})

// FAQ state
const openFaq = ref(-1)

// Logo carousel state
const logoCarousel = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const animationPaused = ref(false)
const autoScrollInterval = ref(null)

// Define translations
const translations = {
  // Hero
  heroTitle: {
    es: 'Compra en <span class="text-[#2E6BB7]">USA</span> y recibe en <span class="text-[#2E6BB7]">México</span>.',
    en: 'Shop in the <span class="text-[#2E6BB7]">USA</span> and receive in <span class="text-[#2E6BB7]">Mexico</span>.'
  },
  heroSubtitle: {
    es: 'Envia tus compras a nuestro PO Box en San Diego y nosotros lo enviamos a tu casa o negocio en México.',
    en: 'Send your purchases to our PO Box in San Diego and we will ship it to your home or business in Mexico.'
  },
  ctaPlans: {
    es: 'Ver Planes de Consolidación',
    en: 'See Consolidation Plans'
  },
  ctaEstimate: {
    es: 'Estimar un Artículo',
    en: 'Estimate an Item'
  },
  
  // Logos
  logosHeader: {
    es: 'Recibimos paquetes de todas tus tiendas favoritas',
    en: 'We receive packages from all your favorite stores'
  },
  
  // How it works
  howItWorksTagline: {
    es: 'NUESTRO PROCESO',
    en: 'OUR PROCESS'
  },
  howItWorksTitle: {
    es: 'Comprar en USA nunca fue tan fácil',
    en: 'Shopping in the USA has never been easier'
  },
  howItWorksSubtitle: {
    es: 'En 4 simples pasos, tus productos favoritos de Estados Unidos llegan a tu casa o negocio en México. Nosotros nos encargamos de la logística.',
    en: 'In 4 simple steps, your favorite products from the United States arrive at your home or business in Mexico. We take care of the logistics.'
  },
  
  // Calculator
  calculatorTagline: {
    es: 'ESTIMADOR DE ARTÍCULO INDIVIDUAL',
    en: 'SINGLE ITEM ESTIMATOR'
  },
  calculatorTitle: {
    es: '¿Solo quieres enviar un producto?',
    en: 'Just Shipping One Product?'
  },
  calculatorSubtitle: {
    es: 'Ingresa las dimensiones de tu producto para obtener un precio estimado. Si envías varios artículos, nuestros planes de consolidación son más económicos.',
    en: 'Enter your product\'s dimensions to get an estimated price. If you\'re shipping multiple items, our consolidation plans are more cost-effective.'
  },
  length: {
    es: 'Largo',
    en: 'Length'
  },
  width: {
    es: 'Ancho',
    en: 'Width'
  },
  height: {
    es: 'Alto',
    en: 'Height'
  },
  unit: {
    es: 'Unidad',
    en: 'Unit'
  },
  estimateCost: {
    es: 'Estimar Costo',
    en: 'Estimate Cost'
  },
  estimatedPrice: {
    es: 'Precio Estimado:',
    en: 'Estimated Price:'
  },
  basedOnVolWeight: {
    es: 'Basado en un peso volumétrico de',
    en: 'Based on a volumetric weight of'
  },
  tooLarge: {
    es: 'Dimensiones Demasiado Grandes',
    en: 'Dimensions Too Large'
  },
  contactUs: {
    es: 'Tu paquete excede el tamaño estándar. Por favor, contáctanos para una cotización personalizada.',
    en: 'Your package exceeds standard size. Please contact us for a custom quote.'
  },
  fillFields: {
    es: 'Por favor, ingresa todas las dimensiones.',
    en: 'Please enter all dimensions.'
  },
  contactBtn: {
    es: 'Contactar Ahora',
    en: 'Contact Now'
  },
  consolidationTip: {
    es: '<strong>Tip:</strong> ¿Enviando múltiples artículos? Ahorra dinero con nuestros <a href="#pricing" class="text-[#2E6BB7] font-semibold no-underline hover:underline">planes de consolidación</a>.',
    en: '<strong>Tip:</strong> Shipping multiple items? Save money with our <a href="#pricing" class="text-[#2E6BB7] font-semibold no-underline hover:underline">consolidation plans</a>.'
  },
  
  // Pricing
  pricingTagline: {
    es: 'PLANES DE CONSOLIDACIÓN',
    en: 'CONSOLIDATION PLANS'
  },
  pricingTitle: {
    es: 'Ahorra Agrupando tus Compras',
    en: 'Save by Grouping Your Purchases'
  },
  pricingSubtitle: {
    es: 'Ideal para cuando compras en varias tiendas. Llenamos una caja con todos tus productos y te la enviamos en un solo paquete.',
    en: 'Ideal for when you shop at multiple stores. We\'ll fill a box with all your products and send it to you in one single package.'
  },
  mostPopular: {
    es: 'Más Popular',
    en: 'Most Popular'
  },
  paymentNote: {
    es: 'Aceptamos pagos por transferencia en moneda nacional al tipo de cambio interbancario del día. Este precio no incluye el 16% de IVA.',
    en: 'We accept payments by transfer in local currency at the interbank exchange rate of the day. This price does not include the 16% VAT.'
  },
  
  // Trust
  trustTagline: {
    es: 'NUESTRA PROMESA',
    en: 'OUR PROMISE'
  },
  trustTitle: {
    es: '¿Por qué confiar en nosotros?',
    en: 'Why Trust Us?'
  },
  
  // Testimonials
  testimonialsTagline: {
    es: 'LO QUE DICEN NUESTROS CLIENTES',
    en: 'WHAT OUR CLIENTS SAY'
  },
  testimonialsTitle: {
    es: 'Historias de Éxito Reales',
    en: 'Real Success Stories'
  },
  
  // FAQ
  faqTagline: {
    es: 'PREGUNTAS FRECUENTES',
    en: 'FREQUENTLY ASKED QUESTIONS'
  },
  faqTitle: {
    es: 'Resolvemos tus Dudas',
    en: 'Answering Your Doubts'
  },
  
  // Footer
  ctaFooterTitle: {
    es: 'Tu Próximo Envío Comienza Aquí',
    en: 'Your Next Shipment Starts Here'
  },
  ctaFooterSubtitle: {
    es: 'Obtén tu cotización personalizada en minutos y empieza a comprar en cualquier tienda de USA hoy mismo.',
    en: 'Get your custom quote in minutes and start shopping from any US store today.'
  },
  ctaFooterLink: {
    es: 'https://wa.me/16195591910?text=Hola!%20Quiero%20mi%20cotizaci%C3%B3n%20personalizada%20ahora.',
    en: 'https://wa.me/16195591910?text=Hi!%20I%20want%20my%20custom%20quote%20now.'
  },
  contactWhatsApp: {
    es: 'Contactar por WhatsApp',
    en: 'Contact via WhatsApp'
  },
  addressUSA: {
    es: 'Dirección en USA',
    en: 'USA Address'
  },
  contact: {
    es: 'Contacto',
    en: 'Contact'
  },
  businessHours: {
    es: 'Horario de Atención',
    en: 'Business Hours'
  },
  hoursWeekdays: {
    es: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    en: 'Monday to Friday: 9:00 AM - 6:00 PM'
  },
  hoursSaturday: {
    es: 'Sábado: 10:00 AM - 2:00 PM',
    en: 'Saturday: 10:00 AM - 2:00 PM'
  },
  copyright: {
    es: '© 2025 Envios Comerciales Tijuana - Todos los derechos reservados.',
    en: '© 2025 Envios Comerciales Tijuana - All rights reserved.'
  },
  
  // WhatsApp
  whatsappLink: {
    es: 'https://wa.me/16195591910?text=Hola!%20Quiero%20una%20cotizaci%C3%B3n.',
    en: 'https://wa.me/16195591910?text=Hi!%20I%20want%20a%20quote.'
  }
}

// Get reactive translations
const baseTranslations = createTranslations(translations)

// Computed values for complex translations
const steps = computed(() => {
  const { language } = useLanguage()
  return language.value === 'es' ? [
    {
      title: '1. Envíanos tu Orden',
      description: 'Nos mandas los links de los productos que quieres o envías tus compras a nuestra dirección en San Diego.'
    },
    {
      title: '2. Recibimos y Consolidamos',
      description: 'Recibimos tus paquetes, los agrupamos en un solo envío para ahorrar costos de envio.'
    },
    {
      title: '3. Cruzamos la Frontera',
      description: 'Nos encargamos de todos los trámites de aduana y la importación para que no tengas sorpresas.'
    },
    {
      title: '4. Recibe en tu Puerta',
      description: 'Tu paquete llega seguro en 3-5 días hábiles a cualquier parte de México. ¡Listo para disfrutar!'
    }
  ] : [
    {
      title: '1. Send Us Your Order',
      description: 'Send us the links to the products you want, or ship your purchases to our San Diego address.'
    },
    {
      title: '2. We Receive & Consolidate',
      description: 'We receive your packages and group them into a single shipment to save on shipping costs.'
    },
    {
      title: '3. We Cross the Border',
      description: 'We handle all customs paperwork and import procedures so you have no surprises.'
    },
    {
      title: '4. Receive at Your Door',
      description: 'Your package arrives safely in 3-5 business days anywhere in Mexico. Ready to enjoy!'
    }
  ]
})

const pricingPlans = computed(() => {
  const { language } = useLanguage()
  return language.value === 'es' ? [
    {
      name: 'Caja Chica',
      price: 89,
      features: [
        { label: 'Dimensiones', value: '40x30x25 cm' },
        { label: 'Ideal para', value: 'Ropa, cosméticos, electrónicos pequeños.' }
      ],
      buttonText: 'Elegir Plan Chico',
      link: 'https://wa.me/16195591910?text=Hola!%20Quiero%20cotizar%20un%20envío%20consolidado%20en%20Caja%20Chica.',
      featured: false
    },
    {
      name: 'Caja Mediana',
      price: 165,
      features: [
        { label: 'Dimensiones', value: '60x45x40 cm' },
        { label: 'Ideal para', value: 'Cajas de zapatos, equipo de deporte, herramientas.' }
      ],
      buttonText: 'Elegir Plan Mediano',
      link: 'https://wa.me/16195591910?text=Hola!%20Quiero%20cotizar%20un%20envío%20consolidado%20en%20Caja%20Mediana.',
      featured: true
    },
    {
      name: 'Caja Grande',
      price: 225,
      features: [
        { label: 'Dimensiones', value: '80x50x50 cm' },
        { label: 'Ideal para', value: 'Muebles pequeños, equipo de ejercicio, refacciones.' }
      ],
      buttonText: 'Elegir Plan Grande',
      link: 'https://wa.me/16195591910?text=Hola!%20Quiero%20cotizar%20un%20envío%20consolidado%20en%20Caja%20Grande.',
      featured: false
    }
  ] : [
    {
      name: 'Small Box',
      price: 89,
      features: [
        { label: 'Dimensions', value: '15.7x11.8x9.8 in' },
        { label: 'Ideal for', value: 'Clothing, cosmetics, small electronics.' }
      ],
      buttonText: 'Choose Small Plan',
      link: 'https://wa.me/16195591910?text=Hi!%20I\'d%20like%20a%20quote%20for%20a%20consolidated%20Small%20Box.',
      featured: false
    },
    {
      name: 'Medium Box',
      price: 165,
      features: [
        { label: 'Dimensions', value: '23.6x17.7x15.7 in' },
        { label: 'Ideal for', value: 'Shoe boxes, sports equipment, tools.' }
      ],
      buttonText: 'Choose Medium Plan',
      link: 'https://wa.me/16195591910?text=Hi!%20I\'d%20like%20a%20quote%20for%20a%20consolidated%20Medium%20Box.',
      featured: true
    },
    {
      name: 'Large Box',
      price: 225,
      features: [
        { label: 'Dimensions', value: '31.5x19.7x19.7 in' },
        { label: 'Ideal for', value: 'Small furniture, exercise equipment, auto parts.' }
      ],
      buttonText: 'Choose Large Plan',
      link: 'https://wa.me/16195591910?text=Hi!%20I\'d%20like%20a%20quote%20for%20a%20consolidated%20Large%20Box.',
      featured: false
    }
  ]
})

const trustItems = computed(() => {
  const { language } = useLanguage()
  return language.value === 'es' ? [
    {
      title: 'Envíos 100% Asegurados',
      description: 'Cada paquete está protegido contra pérdida o daño durante todo el trayecto.'
    },
    {
      title: '10+ Años de Experiencia',
      description: 'Conocemos cada detalle del proceso para garantizar un servicio sin fallas.'
    },
    {
      title: 'Bodega en San Diego, CA',
      description: 'Nuestra ubicación nos permite recibir y procesar tus paquetes de forma rápida.'
    },
    {
      title: '1,000+ Clientes Satisfechos',
      description: 'Únete a nuestra comunidad de clientes que confían en nosotros para sus envíos.'
    },
    {
      title: 'Comunicación Constante',
      description: 'Te mantenemos informado en cada paso del proceso, desde la recepción hasta la entrega.'
    },
    {
      title: 'Sin Cargos Ocultos',
      description: 'Nuestra cotización es transparente. El precio que te damos es el precio final que pagas.'
    }
  ] : [
    {
      title: '100% Insured Shipments',
      description: 'Every package is protected against loss or damage throughout its journey.'
    },
    {
      title: '10+ Years of Experience',
      description: 'We know every detail of the process to ensure a flawless service.'
    },
    {
      title: 'Warehouse in San Diego, CA',
      description: 'Our location allows us to receive and process your packages quickly.'
    },
    {
      title: '1,000+ Satisfied Clients',
      description: 'Join our community of clients who trust us for their shipments.'
    },
    {
      title: 'Constant Communication',
      description: 'We keep you informed at every step, from receiving your package to final delivery.'
    },
    {
      title: 'No Hidden Fees',
      description: 'Our quotes are transparent. The price we give you is the final price you pay.'
    }
  ]
})

const testimonials = computed(() => {
  const { language } = useLanguage()
  return language.value === 'es' ? [
    {
      quote: 'El servicio fue increíblemente rápido y profesional. Recibí mis refacciones de auto en Monterrey sin ningún problema. ¡Totalmente recomendados!',
      author: 'Carlos R.',
      location: 'Monterrey, NL'
    },
    {
      quote: 'Tenía miedo de comprar electrónicos caros, pero el equipo me guió en todo momento y mi laptop llegó perfecta a la Ciudad de México. ¡Excelente comunicación!',
      author: 'Sofia G.',
      location: 'CDMX'
    },
    {
      quote: 'Consolidé varias compras de ropa y juguetes y ahorré muchísimo en el envío a Guadalajara. Súper fácil todo el proceso.',
      author: 'Javier L.',
      location: 'Guadalajara, Jal.'
    }
  ] : [
    {
      quote: 'The service was incredibly fast and professional. I received my car parts in Monterrey without any issues. Totally recommended!',
      author: 'Carlos R.',
      location: 'Monterrey, NL'
    },
    {
      quote: 'I was afraid of buying expensive electronics, but the team guided me at all times and my laptop arrived perfectly in Mexico City. Excellent communication!',
      author: 'Sofia G.',
      location: 'Mexico City'
    },
    {
      quote: 'I consolidated several purchases of clothes and toys and saved a lot on shipping to Guadalajara. The whole process was super easy.',
      author: 'Javier L.',
      location: 'Guadalajara, Jal.'
    }
  ]
})

const faqs = computed(() => {
  const { language } = useLanguage()
  return language.value === 'es' ? [
    {
      question: '¿Qué pasa si mi paquete se pierde o se daña?',
      answer: 'Tu tranquilidad es lo más importante. Todos nuestros envíos están 100% asegurados contra pérdida o daño. Si algo le sucede a tu paquete durante el tránsito con nosotros, te reembolsamos el valor total de tu producto. Contáctanos para conocer los detalles de la cobertura.'
    },
    {
      question: '¿Cuánto tiempo tarda en llegar mi envío?',
      answer: 'Una vez que recibimos tu paquete en nuestra bodega de San Diego, el proceso de cruce y envío a tu domicilio en México toma de 3 a 5 días hábiles. Te mantendremos informado con un número de guía para que puedas rastrearlo en todo momento.'
    },
    {
      question: '¿Cómo sé que su servicio es confiable?',
      answer: 'Llevamos más de 10 años en la industria y hemos servido a más de mil clientes. Nuestra reputación se basa en la transparencia y la eficiencia. Contamos con una bodega física en San Diego, ofrecemos seguro en todos los envíos y puedes ver las opiniones de nuestros clientes satisfechos en esta misma página.'
    }
  ] : [
    {
      question: 'What happens if my package is lost or damaged?',
      answer: 'Your peace of mind is paramount. All our shipments are 100% insured against loss or damage. If anything happens to your package while in transit with us, we will refund the full value of your product. Contact us for coverage details.'
    },
    {
      question: 'How long will my shipment take to arrive?',
      answer: 'Once we receive your package at our San Diego warehouse, the process of crossing and shipping to your address in Mexico takes 3 to 5 business days. We will keep you informed with a tracking number so you can trace it at all times.'
    },
    {
      question: 'How do I know your service is reliable?',
      answer: 'We have been in the industry for over 10 years and have served more than a thousand clients. Our reputation is built on transparency and efficiency. We have a physical warehouse in San Diego, offer insurance on all shipments, and you can see reviews from our satisfied customers on this very page.'
    }
  ]
})

// Create the final t object with everything merged
const t = computed(() => ({
  ...baseTranslations.value,
  steps: steps.value,
  pricingPlans: pricingPlans.value,
  trustItems: trustItems.value,
  testimonials: testimonials.value,
  faqs: faqs.value
}))

// Calculator function
const calculatePrice = () => {
  const { language } = useLanguage()
  const l = dimensions.value.length
  const w = dimensions.value.width
  const h = dimensions.value.height

  if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) {
    calculatorResult.value = {
      show: true,
      type: 'error',
      title: '',
      message: t.value.fillFields,
      subtext: '',
      showTip: false,
      showContactBtn: false,
      contactLink: ''
    }
    return
  }

  const toCm = (val) => currentUnit.value === 'in' ? val * 2.54 : val
  const lengthCm = toCm(l)
  const widthCm = toCm(w)
  const heightCm = toCm(h)

  const volume = lengthCm * widthCm * heightCm
  const volWeight = Math.max(1, volume / 5000)

  const baseFee = 25
  const ratePerKg = 12
  let price = baseFee + (volWeight * ratePerKg)
  price = Math.max(35, price)

  if (lengthCm > 120 || widthCm > 100 || heightCm > 100 || volWeight > 40) {
    const contactHref = language.value === 'es' 
      ? 'https://wa.me/16195591910?text=Hola!%20Tengo%20un%20paquete%20grande%20y%20necesito%20una%20cotizaci%C3%B3n%20personalizada.'
      : 'https://wa.me/16195591910?text=Hi!%20I%20have%20a%20large%20package%20and%20need%20a%20custom%20quote.'
    
    calculatorResult.value = {
      show: true,
      type: 'error',
      title: t.value.tooLarge,
      message: t.value.contactUs,
      subtext: '',
      showTip: false,
      showContactBtn: true,
      contactLink: contactHref
    }
  } else {
    calculatorResult.value = {
      show: true,
      type: 'success',
      title: `${t.value.estimatedPrice} <strong>$${price.toFixed(2)} USD</strong>`,
      message: '',
      subtext: `${t.value.basedOnVolWeight} ${volWeight.toFixed(2)} kg.`,
      showTip: true,
      showContactBtn: false,
      contactLink: ''
    }
  }
}

// Logo Carousel Methods
const startAutoScroll = () => {
  if (!logoCarousel.value) return
  
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
  }
  
  autoScrollInterval.value = setInterval(() => {
    if (!isDragging.value && logoCarousel.value) {
      logoCarousel.value.scrollLeft += 1
      
      const scrollWidth = logoCarousel.value.scrollWidth
      const clientWidth = logoCarousel.value.clientWidth
      const maxScroll = scrollWidth - clientWidth
      
      if (logoCarousel.value.scrollLeft >= maxScroll / 2) {
        logoCarousel.value.scrollLeft = 0
      }
    }
  }, 30)
}

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
}

const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.pageX - logoCarousel.value.offsetLeft
  scrollLeft.value = logoCarousel.value.scrollLeft
  logoCarousel.value.style.cursor = 'grabbing'
  stopAutoScroll()
}

const onDrag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX - logoCarousel.value.offsetLeft
  const walk = (x - startX.value) * 2
  logoCarousel.value.scrollLeft = scrollLeft.value - walk
}

const endDrag = () => {
  isDragging.value = false
  if (logoCarousel.value) {
    logoCarousel.value.style.cursor = 'grab'
  }
  setTimeout(() => {
    if (!isDragging.value) {
      startAutoScroll()
    }
  }, 1000)
}

const startTouch = (e) => {
  isDragging.value = true
  startX.value = e.touches[0].pageX - logoCarousel.value.offsetLeft
  scrollLeft.value = logoCarousel.value.scrollLeft
  stopAutoScroll()
}

const onTouch = (e) => {
  if (!isDragging.value) return
  const x = e.touches[0].pageX - logoCarousel.value.offsetLeft
  const walk = (x - startX.value) * 2
  logoCarousel.value.scrollLeft = scrollLeft.value - walk
}

const endTouch = () => {
  isDragging.value = false
  setTimeout(() => {
    if (!isDragging.value) {
      startAutoScroll()
    }
  }, 1000)
}

const pauseAnimation = () => {
  stopAutoScroll()
}

const resumeAnimation = () => {
  setTimeout(() => {
    if (!isDragging.value) {
      startAutoScroll()
    }
  }, 1000)
}

// Lifecycle hooks
onMounted(() => {
  // Add styles for animations
  const style = document.createElement('style')
  style.textContent = `
    /* Remove CSS animation in favor of JS-based scrolling */
    .animate-scroll-logos {
      display: flex;
      animation: none !important;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    /* Fade in animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .fade-in-section {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeIn 0.8s ease-out forwards;
    }

    /* Pulse animation for WhatsApp button */
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

    /* Tailwind primary color variables */
    :root {
      --primary-50: #eff6ff;
      --primary-100: #dbeafe;
      --primary-200: #bfdbfe;
      --primary-300: #93c5fd;
      --primary-400: #60a5fa;
      --primary-500: #2E6BB7;
      --primary-600: #2563eb;
      --primary-700: #1d4ed8;
      --primary-800: #1e40af;
      --primary-900: #1e3a8a;
    }

    .bg-primary-50 { background-color: var(--primary-50); }
    .bg-primary-500 { background-color: var(--primary-500); }
    .bg-primary-600 { background-color: var(--primary-600); }
    .text-primary-500 { color: var(--primary-500); }
    .border-primary-500 { border-color: var(--primary-500); }
    .hover\\:bg-primary-600:hover { background-color: var(--primary-600); }
    .hover\\:text-primary-500:hover { color: var(--primary-500); }
    .hover\\:border-primary-500:hover { border-color: var(--primary-500); }

    .bg-dark-500 { background-color: #1a202c; }
  `
  document.head.appendChild(style)

  // Start auto-scrolling after a short delay
  setTimeout(() => {
    startAutoScroll()
  }, 500)

  // Add hover listeners to pause/resume on hover
  if (logoCarousel.value) {
    logoCarousel.value.addEventListener('mouseenter', stopAutoScroll)
    logoCarousel.value.addEventListener('mouseleave', () => {
      if (!isDragging.value) {
        startAutoScroll()
      }
    })
  }

  // Intersection Observer for section animations
  const sections = document.querySelectorAll('.fade-in-section')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running'
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  sections.forEach((section) => {
    section.style.animationPlayState = 'paused'
    observer.observe(section)
  })
})

onUnmounted(() => {
  // Clean up
  stopAutoScroll()
  
  if (logoCarousel.value) {
    logoCarousel.value.removeEventListener('mouseenter', stopAutoScroll)
    logoCarousel.value.removeEventListener('mouseleave', startAutoScroll)
  }
})
</script>