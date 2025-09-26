<template>

  <div class="w-full h-screen bg-black overflow-x-hidden">

    <div class="w-screen h-screen bg-black">

      <Header>

        <template #title>

          <div class="font-semibold">

            <h1 class="text-7xl text-white">Full Stack</h1>

            <h1 class="text-7xl text-zinc-700">Developer</h1>

            <h6 class=" text-xs p-1 text-zinc-600">Passionate about</h6>

            <h6 class="text-xs text-zinc-500 p-1">Developing scalable Production ready apps with frontend in vue and backend in gin and golang</h6>

          </div>

        </template>





        <template #img>

          <img src="/1.jpg" alt="" class=" w-55 h-51 object-cover rounded-md">

        </template>





        <template #icons>

          <div class="mt-[80%] flex gap-3 justify-center" style="color:orangered">

            <a href="https://google.com"><i class="pi pi-instagram"/></a>

            <a href=""><i class="pi pi pi-facebook"/></a>

            <a href=""><i class="pi pi pi-github"/></a>

            <a href=""><i class="pi pi pi-twitter"/></a>

          </div>

        </template>



        <template #title3>

          <p class="mt-[20%] text-sm p-1"> </p>

        </template>

      </Header>

    </div>



    <!-- Additional section -->

    <div class="w-full h-screen bg-black"></div>

  </div>

</template>



<script setup>

import Header from "@/component/Header.vue";

</script>