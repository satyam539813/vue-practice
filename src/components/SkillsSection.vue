<template>
  <section id="skills" class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Technologies I work with to bring ideas to life
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="category in skillCategories" :key="category.name" 
             class="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
          
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
              <i :class="category.icon" class="text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
          </div>
          
          <div class="space-y-4">
            <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-300 font-medium">{{ skill.name }}</span>
                <span class="text-purple-400 text-sm">{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                     :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tools & Software -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-center mb-8 text-white">Tools & Software</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="tool in tools" :key="tool.name" 
               class="flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <i :class="tool.icon" class="text-purple-400 mr-3 text-lg"></i>
            <span class="text-gray-300 font-medium">{{ tool.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillCategories = [
  {
    name: 'Frontend',
    icon: 'pi pi-desktop',
    skills: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 }
    ]
  },
  {
    name: 'Backend',
    icon: 'pi pi-server',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'REST APIs', level: 90 }
    ]
  },
  {
    name: 'DevOps & Tools',
    icon: 'pi pi-cog',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 80 },
      { name: 'Testing', level: 85 }
    ]
  }
]

const tools = [
  { name: 'VS Code', icon: 'pi pi-code' },
  { name: 'Figma', icon: 'pi pi-palette' },
  { name: 'Postman', icon: 'pi pi-send' },
  { name: 'Slack', icon: 'pi pi-comments' },
  { name: 'Notion', icon: 'pi pi-book' },
  { name: 'GitHub', icon: 'pi pi-github' }
]
</script>

<style scoped>
.skill-item:hover .bg-gradient-to-r {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}
</style>