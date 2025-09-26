<script>
import {socialLinks} from "@/data/data.js";

export default {
  name: 'Icons',
  computed: {
    socialLinks() {
      return socialLinks
    }
  }
}
</script>

<template>
  <div class="mt-[80%] flex gap-4 justify-center text-orange-500">
    <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.url"
        :aria-label="`Link to my ${link.name}`"
        target="_blank"
        rel="noopener noreferrer"
        class="transform transition-transform hover:scale-110"
    >
      <i :class="link.iconClass" class="text-xl"/>
    </a>
  </div>
</template>