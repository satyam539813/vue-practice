<template>
  <footer class="bg-slate-900 border-t border-slate-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Portfolio
          </h3>
          <p class="text-gray-400 mb-6 max-w-md">
            Passionate Frontend Developer creating beautiful, functional, and user-centered digital experiences.
          </p>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks" :key="social.name"
               :href="social.url" target="_blank"
               class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href" 
                 class="text-gray-400 hover:text-white transition-colors duration-300"
                 @click="scrollToSection(link.href)">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Services -->
        <div>
          <h4 class="text-white font-semibold mb-4">Services</h4>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service">
              <span class="text-gray-400">{{ service }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} Portfolio. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
  { name: 'Email', icon: 'pi pi-envelope', url: 'mailto:hello@example.com' }
]

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const services = [
  'Web Development',
  'UI/UX Design',
  'Mobile Apps',
  'API Development',
  'Consulting'
]

const scrollToSection = (href) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>