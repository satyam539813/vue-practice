<template>
  <div class="container">

    <!-- LEFT: Product List -->
    <div class="list">
      <ul
          v-for="p in product"
          :key="p.id"
          @click="setSelected(p)"
          :class="{ active: selected?.id === p.id }"
      >
        {{ p.name }}
      </ul>
    </div>

    <!-- RIGHT: Image + Description -->
    <transition name="fade" mode="out-in">
      <div v-if="selected" :key="selected.id" class="content">
        <img :src="selected.img" alt="">
        <p>{{ selected.desc }}</p>
      </div>
    </transition>

  </div>
</template>

<script setup>
import product from "./product.json";
import { ref } from "vue";

const selected = ref(product[0]); // Default first item

function setSelected(p) {
  selected.value = p;
}
</script>

<style scoped lang="scss">

/* ===========================
   GRID LAYOUT (Responsive)
=========================== */

.container {
  display: grid;
  gap: 2rem;

  /* Auto responsive — 1 or 2 columns */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: start;
}

/* ===========================
   LEFT LIST (Sidebar)
=========================== */

.list {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.list ul {
  cursor: pointer;
  padding: 0.8rem 1rem;
  font-size: clamp(1rem, 2.2vw, 1.6rem);
  background: #111;
  margin-bottom: 0.6rem;
  border-radius: 10px;
  transition: 0.25s ease;
  user-select: none;
}

.list ul:hover {
  background: #1b1b1b;
  transform: translateX(4px);
}

/* Selected / Active item */
.list .active {
  background: #333;
  font-weight: 600;
  transform: translateX(6px);
}

/* ===========================
   RIGHT CONTENT AREA
=========================== */

.content {
  text-align: center;
  padding: 1rem;
  background: #0d0d0d;
  border-radius: 14px;
  box-shadow: 0 0 20px rgba(255,255,255,0.05);
}

.content img {
  width: clamp(160px, 35vw, 350px);
  border-radius: 14px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.content p {
  font-size: clamp(1rem, 2vw, 1.4rem);
  line-height: 1.6;
  padding: 0.8rem;
}

/* ===========================
   FADE ANIMATION
=========================== */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
