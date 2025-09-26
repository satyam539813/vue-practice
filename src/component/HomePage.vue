
<template>
  <div class="w-full min-h-screen bg-black text-white overflow-x-hidden">
    <div class="w-full h-screen">
      <Header>
        <template #title>
          <div class="font-semibold">
            <h1 class="text-7xl">{{ profile.titleLine1 }}</h1>
            <h1 class="text-7xl text-zinc-700">{{ profile.titleLine2 }}</h1>
            <p class="text-xs pt-2 text-zinc-600">{{ profile.passion }}</p>
            <p class="text-xs max-w-sm text-zinc-500 pt-1">{{ profile.description }}</p>
          </div>
        </template>

        <template #img>
          <img :src="profile.imageSrc"
               alt="Profile Portrait" class="w-55 h-51
               object-cover rounded-md"
          />
        </template>

        <template #icons>
          <Icons/>
        </template>

        <template #title3>
          <p class="mt-[20%] text-sm p-1"></p>
        </template>
      </Header>
    </div>

    <div class="w-full h-screen">
    </div>
  </div>
</template>

<script setup>

import Header from "@/component/Header.vue";
import {profile} from "@/data/data.js";
import Icons from "@/Icons.vue";
</script>
