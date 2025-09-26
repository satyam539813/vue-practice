<template>

  <div class="flex gap-4">

    <div class="bg-green-500 w-45 h-45 rounded-md">

      <slot name="description1"/>

    </div>

    <div class="bg-orange-400 w-45 h-45 rounded-md">

      <slot name="description2"/>

    </div>

  </div>

  <div class="w-[85%] h-25 bg-zinc-900 rounded-md mt-5">

    <slot name="description3"/>

  </div>

</template>



<script setup>



</script>