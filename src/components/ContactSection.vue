<template>
  <section id="contact" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Let's discuss your next project or just say hello
        </p>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <div>
            <h3 class="text-2xl font-semibold text-white mb-6">Let's work together</h3>
            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a project in mind or just want to chat about technology, 
              feel free to reach out!
            </p>
          </div>
          
          <!-- Contact Methods -->
          <div class="space-y-6">
            <div v-for="contact in contactMethods" :key="contact.type" 
                 class="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <i :class="contact.icon" class="text-white text-xl"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold">{{ contact.type }}</h4>
                <p class="text-gray-400">{{ contact.value }}</p>
              </div>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="pt-8">
            <h4 class="text-white font-semibold mb-4">Follow me on</h4>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name"
                 :href="social.url" target="_blank"
                 class="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110">
                <i :class="social.icon" class="text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input v-model="form.name" type="text" id="name" required
                       class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                       placeholder="Your name">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input v-model="form.email" type="email" id="email" required
                       class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                       placeholder="your@email.com">
              </div>
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input v-model="form.subject" type="text" id="subject" required
                     class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                     placeholder="Project discussion">
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea v-model="form.message" id="message" rows="5" required
                        class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300 resize-none"
                        placeholder="Tell me about your project..."></textarea>
            </div>
            
            <button type="submit" :disabled="isSubmitting"
                    class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center">
                <i class="pi pi-spin pi-spinner mr-2"></i>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const contactMethods = [
  {
    type: 'Email',
    value: 'hello@devportfolio.com',
    icon: 'pi pi-envelope'
  },
  {
    type: 'Phone',
    value: '+1 (555) 123-4567',
    icon: 'pi pi-phone'
  },
  {
    type: 'Location',
    value: 'San Francisco, CA',
    icon: 'pi pi-map-marker'
  }
]

const socialLinks = [
  { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
  { name: 'Instagram', icon: 'pi pi-instagram', url: 'https://instagram.com' }
]

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you can implement a toast notification here)
  alert('Message sent successfully!')
}
</script>