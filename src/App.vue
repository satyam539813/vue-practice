<template>
  <div class="h-screen relative p-10">
    <!-- Favorites Counter -->
    <div class="absolute top-2 right-1 bg-green-500 text-white rounded-full p-4 text-center z-20">
      Favorites:
      <span class="inline-block ml-3 w-8 h-8 text-center leading-8 rounded-full text-white text-sm bg-black">
        {{ state.likes.filter(Boolean).length }}
      </span>
    </div>

    <!-- Cards Container -->
    <div :class="['cards-container', state.layoutFinal ? 'grid-layout' : 'initial-layout']">
      <div
          v-for="(img, i) in state.images"
          :key="i"
          class="card w-45 h-65 rounded-md relative overflow-hidden cursor-pointer"
          @click="openModal(i)"
          :ref="el => state.cardRefs[i] = el"
      >
        <img :src="img" class="absolute top-0 left-0 w-full h-full object-cover" />
        <div
            :class="['absolute bottom-0 w-full h-10 rounded-b-md transition-colors duration-300', state.likes[i] ? 'bg-black' : 'bg-green-500']"
        >
          <button class="text-white w-full p-2 flex items-center justify-center gap-2" @click.stop="toggleLike(i)">
            <i class="pi" :class="state.likes[i] ? 'pi-heart-fill' : 'pi-heart'"></i>
            {{ state.likes[i] ? 'Remove' : 'Add' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import 'primeicons/primeicons.css';

gsap.registerPlugin(Flip);

const state = reactive({
  images: [
    'https://i.pinimg.com/736x/23/39/28/233928e64b4758735b8dd01c8c74e7a5.jpg',
    'https://i.pinimg.com/736x/79/a0/30/79a030f1a9fcd794f42402b574a5fe84.jpg',
    'https://i.pinimg.com/736x/8b/d3/29/8bd329285af5f01ec82f0283f25af5f3.jpg',
    'https://i.pinimg.com/736x/00/0c/69/000c69e663450658e23609e2eaeaba6a.jpg',
    'https://i.pinimg.com/1200x/eb/c4/76/ebc4766eaf3add378c9020131926f757.jpg'
  ],
  likes: Array(5).fill(false),
  cardRefs: [],
  layoutFinal: false
});

const toggleLike = i => state.likes[i] = !state.likes[i];
const openModal = i => console.log('Open modal for image', i);

onMounted(() => {
  // 1️⃣ Initial entrance animation
  gsap.fromTo(
      state.cardRefs,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power4.out' }
  );

  // 2️⃣ Flip layout change after 3 seconds
  setTimeout(() => {
    const flipState = Flip.getState(state.cardRefs);
    state.layoutFinal = true; // change layout class
    Flip.from(flipState, { duration: 1, scale: true, ease: 'power5.inOut' });
  }, 930);
});
</script>

<style scoped>
/* Initial layout: horizontal row with gap */
.initial-layout {
  display: flex;
  justify-content: center;
  align-items: center;
   gap: 1.25rem;
}

/* Final layout: grid / bentogrid style slightly lower */
.grid-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 0.75rem;
  margin: 0 auto;
  padding-top: 10px;
  transition: all ease-in-out 0.18s;
  /* slightly lower than initial */
}

/* Card styling */
.card {
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
</style>
