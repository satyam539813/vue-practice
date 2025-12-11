
<template>
<nav>
  <router-link v-for="r in routes" :to="r.path" :key="r.path">
     {{r.name}}
  </router-link>
</nav>
  <div class="view">
    <router-view/>
  </div>
</template>

<script setup>

import {routes} from "../../router/index.js";
</script>


<style scoped>
nav{
  display: flex;
  gap: clamp(3%, 4%, 5%);
  padding:clamp(0.2%, 1%, 3%);


  a{
    text-decoration: none;
    color: black;
    text-transform: Capitalize;
    font:clamp(0.2rem, 2vw, 1.5rem) bold;
  }
}
.view{
  padding:clamp(1%, 1vw,2vw);
  background: black;
  color: white;
  min-width: 100%;
  border-radius:1.2vw;
  font:clamp(0.5rem, 3vw, 2rem) bold;
  height: calc(150vh - clamp(2rem, 5vw, 5rem));
  }

</style>