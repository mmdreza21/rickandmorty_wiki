<script setup lang="ts">
import type { Location } from "~/types/location";

defineProps<{
  location: Location;
}>();
</script>

<template>
  <div
    class="w-full max-w-[384px] h-[126px] bg-card-bg rounded-2xl p-4 flex flex-col items-start gap-3"
  >
    <h3 class="text-white font-bold text-xl truncate w-full">
      {{ location.name }}
    </h3>
    <span class="text-cyan-400 font-medium text-base">{{ location.type }}</span>
    <span class="text-gray-600 text-base">{{ location.dimension }}</span>
  </div>
</template>
