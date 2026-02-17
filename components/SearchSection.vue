<script setup lang="ts">
interface Props {
  isSearching: boolean;
}
const { isSearching } = defineProps<Props>();

const searchQuery = defineModel();
</script>

<template>
  <div class="gradient-bg px-4 md:px-38">
    <div class="absolute inset-0 pointer-events-none d-flex">
      <div
        class="absolute w-[200px] h-[152px] left-[294px] bg-yellow-primary/80 blur-[80px] rounded-full max-md:hidden"
      ></div>
    </div>
    <div class="flex flex-col items-center pt-[26px] pb-6 relative">
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
            class="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-primary rounded cursor-pointer"
          >
            <div v-if="isSearching" class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-[#00333D] border-t-transparent rounded-full animate-spin"
              ></div>
              <span class="text-[#00333D] font-medium hidden md:flex"
                >Searching...</span
              >
            </div>
            <div v-else class="flex items-center gap-2">
              <NuxtImg
                class="width-[14px] height-[14px]"
                src="/svg/search.svg"
              />
              <span class="text-[#00333D] font-medium hidden md:flex"
                >Search</span
              >
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
