<template>
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background Animation -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div class="floating-shapes">
        <div v-for="i in 6" :key="i" 
             :class="`shape shape-${i}`"
             class="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 animate-float"></div>
      </div>
    </div>
    
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <!-- Profile Image -->
      <div class="mb-8 animate-fade-in-up">
        <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1 shadow-2xl">
          <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
               alt="Profile" 
               class="w-full h-full rounded-full object-cover">
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="animate-fade-in-up animation-delay-200">
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          <span class="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Frontend Developer
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Crafting beautiful, responsive web experiences with modern technologies
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button @click="scrollToSection('#projects')" 
                  class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            View My Work
          </button>
          <button @click="scrollToSection('#contact')" 
                  class="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300">
            Get In Touch
          </button>
        </div>
        
        <!-- Social Links -->
        <div class="flex justify-center space-x-6">
          <a v-for="social in socialLinks" 
             :key="social.name"
             :href="social.url" 
             target="_blank"
             class="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
            <i :class="social.icon" class="text-2xl"></i>
          </a>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const socialLinks = [
  { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
  { name: 'Email', icon: 'pi pi-envelope', url: 'mailto:hello@example.com' }
]

const scrollToSection = (href) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.floating-shapes .shape {
  animation: float 6s ease-in-out infinite;
}

.shape-1 { top: 10%; left: 10%; width: 80px; height: 80px; animation-delay: 0s; }
.shape-2 { top: 20%; right: 10%; width: 120px; height: 120px; animation-delay: 1s; }
.shape-3 { bottom: 20%; left: 15%; width: 60px; height: 60px; animation-delay: 2s; }
.shape-4 { bottom: 30%; right: 20%; width: 100px; height: 100px; animation-delay: 3s; }
.shape-5 { top: 50%; left: 5%; width: 40px; height: 40px; animation-delay: 4s; }
.shape-6 { top: 60%; right: 5%; width: 70px; height: 70px; animation-delay: 5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>