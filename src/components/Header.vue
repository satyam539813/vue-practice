<template>
  <div class="w-full h-screen flex items-center justify-center relative">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Left side - Title content -->
        <div class="text-left">
          <slot name="title"></slot>
          <slot name="title3"></slot>
        </div>
        
        <!-- Right side - Image and icons -->
        <div class="flex flex-col items-center">
          <div class="mb-8">
            <slot name="img"></slot>
          </div>
          <div>
            <slot name="icons"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Header component with slots for flexible content
</script>

<style scoped>
/* Component-specific styles can be added here */
</style>