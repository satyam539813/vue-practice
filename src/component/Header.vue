<template>
  <div class="relative w-full min-h-screen bg-black overflow-x-hidden">
    <div class="w-full h-36"></div>

    <div>
      <div class="w-56 h-106 bg-white rounded-md ml-[13%] mt-23 fixed p-4 z-20 flex flex-col justify-between scale-140">
        <div class="w-full h-39 bg-orange-300 rounded-md">
          <slot name="img" />
          <h1 class="text-xl font-semibold absolute top-[60%] p-1 rounded-full">
            Satyam Kumar
          </h1>
          <slot name="title3" />
        </div>
        <div class="mt-4 text-black">
          <slot name="title1" />
        </div>
        <div class="mt-3">
          <slot name="icons" />
        </div>
      </div>

      <div class="w-119 min-h-[200vh] rounded-md scale-160 absolute right-[20%] top-34 mt-[32%]">
        <slot name="title" />
        <div class="p-4 text-white">
          <Card>
            <template #description1>
              <div class="p-3">
                <i class="pi pi-graduation-cap" />
                <h1>Frontend</h1>
                <h1 class="text-5xl">Vue</h1>
              </div>
            </template>
            <template #description2>
              <div class="p-3">
                <i class="pi pi-objects-column" />
                <h1>Backend</h1>
                <h1 class="text-5xl">Go</h1>
              </div>
            </template>
          </Card>

          <div class="mt-8 space-y-6">
            <p v-for="i in 20" :key="i">
              This is dynamic scrollable content line {{ i }}.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "@/component/Card.vue";
</script>

<style scoped>
html,
body {
  background-color: black;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>