<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- About Section -->
    <AboutSection />
    
    <!-- Skills Section -->
    <SkillsSection />
    
    <!-- Projects Section -->
    <ProjectsSection />
    
    <!-- Contact Section -->
    <ContactSection />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #6366f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f46e5;
}
</style>