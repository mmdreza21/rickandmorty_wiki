<script setup lang="ts">
const searchQuery = defineModel();
</script>

<template>
  <div class="gradient-bg px-4 md:px-38 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none d-flex">
      <div
        class="absolute w-[200px] h-[152px] left-[294px] top-[1px] bg-yellow-primary/80 blur-[80px] rounded-full max-md:hidden"
      ></div>
    </div>
    <div class="flex flex-col items-center pt-[26px] pb-6 gap-9 relative">
      <div class="w-full max-w-[1608px]">
        <div class="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
          <div
            class="flex-1 flex items-center gap-2 px-4 py-3 bg-dark-card rounded"
          >
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search for characters..."
              class="flex-1 bg-transparent text-white outline-none placeholder-14px"
            />
          </div>
          <button
            class="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-primary rounded"
          >
            <NuxtImg class="width-[14px] height-[14px]" src="/svg/search.svg" />
            <span class="text-[#00333D] font-medium hidden md:flex"
              >Search</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
