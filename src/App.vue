<template>
  <div class="w-full h-screen bg-black relative">
    <Header />
    <Left />
    <Right />
    <RightMost/>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
import RightMost from "@/components/RightMost.vue";
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  background: black;
 }
</style>
