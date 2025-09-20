<template>
  <section id="about" class="py-20 bg-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Passionate about creating exceptional digital experiences
        </p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-6">
          <div class="prose prose-lg text-gray-300">
            <p class="text-xl leading-relaxed">
              I'm a passionate Frontend Developer with over 5 years of experience creating 
              beautiful, functional, and user-centered digital experiences. I specialize in 
              modern JavaScript frameworks and have a keen eye for design.
            </p>
            
            <p class="leading-relaxed">
              My journey in web development started with a curiosity about how websites work, 
              and it has evolved into a career focused on crafting exceptional user interfaces 
              and experiences. I believe in writing clean, maintainable code and staying 
              up-to-date with the latest industry trends and best practices.
            </p>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-3xl font-bold text-purple-400 mb-2">{{ stat.value }}</div>
              <div class="text-gray-400 text-sm">{{ stat.label }}</div>
            </div>
          </div>
          
          <!-- Download Resume Button -->
          <div class="pt-8">
            <button class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <i class="pi pi-download mr-2"></i>
              Download Resume
            </button>
          </div>
        </div>
        
        <!-- Image/Visual -->
        <div class="relative">
          <div class="relative z-10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
            <img src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800" 
                 alt="Workspace" 
                 class="w-full h-80 object-cover rounded-xl shadow-2xl">
          </div>
          
          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '15+', label: 'Technologies' }
]
</script>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}
</style>