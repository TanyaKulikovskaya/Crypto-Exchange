<template>
  <main class="h-full container mx-auto flex flex-col px-4 py-2 text-gray">
    <h1 class="text-5xl leading-[3.75rem] mb-4 md:mt-10">Crypto Exchange</h1>
    <h3 class="text-xl leading-5 mb-[60px]">Exchange fast and easy</h3>
    <CryptoConverter />
  </main>
</template>

<script setup>
import CryptoConverter from '@/components/CryptoConverter.vue'
</script>
