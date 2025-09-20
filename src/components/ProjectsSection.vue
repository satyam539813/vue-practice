<template>
  <section id="projects" class="py-20 bg-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          A showcase of my recent work and personal projects
        </p>
      </div>
      
      <!-- Project Filter -->
      <div class="flex justify-center mb-12">
        <div class="flex flex-wrap gap-4 bg-slate-900/50 rounded-full p-2">
          <button v-for="filter in filters" :key="filter"
                  @click="activeFilter = filter"
                  :class="[
                    'px-6 py-2 rounded-full font-medium transition-all duration-300',
                    activeFilter === filter 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  ]">
            {{ filter }}
          </button>
        </div>
      </div>
      
      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id" 
             class="group bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
          
          <!-- Project Image -->
          <div class="relative overflow-hidden">
            <img :src="project.image" :alt="project.title" 
                 class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Project Links -->
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a :href="project.github" target="_blank" 
                 class="w-10 h-10 bg-slate-900/80 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
                <i class="pi pi-github"></i>
              </a>
              <a :href="project.demo" target="_blank" 
                 class="w-10 h-10 bg-slate-900/80 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
                <i class="pi pi-external-link"></i>
              </a>
            </div>
          </div>
          
          <!-- Project Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                {{ project.title }}
              </h3>
              <span class="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full">
                {{ project.category }}
              </span>
            </div>
            
            <p class="text-gray-400 mb-4 line-clamp-3">{{ project.description }}</p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" 
                    class="text-xs px-2 py-1 bg-slate-700/50 text-gray-300 rounded-md">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Projects Button -->
      <div class="text-center mt-12">
        <button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
          View All Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')

const filters = ['All', 'Web App', 'Mobile', 'API', 'UI/UX']

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard built with Vue.js and Node.js.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Web App',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Web App',
    technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 3,
    title: 'Weather Mobile App',
    description: 'A beautiful weather application with location-based forecasts, interactive maps, and personalized weather alerts for mobile devices.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Mobile',
    technologies: ['React Native', 'Redux', 'Weather API', 'Maps'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization, custom reports, and interactive charts for business intelligence.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Web App',
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 5,
    title: 'REST API Service',
    description: 'A scalable REST API service with authentication, rate limiting, and comprehensive documentation built with modern backend technologies.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'API',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 6,
    title: 'Design System',
    description: 'A comprehensive design system with reusable components, design tokens, and documentation for consistent user interface development.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'UI/UX',
    technologies: ['Figma', 'Storybook', 'CSS', 'Documentation'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>