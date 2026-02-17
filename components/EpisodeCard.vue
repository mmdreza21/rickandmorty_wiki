<script setup lang="ts">
import type { Episode } from "~/types/episode";

defineProps<{
  episode: Episode;
}>();
</script>

<template>
  <div
    class="max-w-[384px] h-[126px] bg-card-bg rounded-2xl p-4 flex flex-col items-start gap-3"
  >
    <h3 class="text-white font-bold text-xl">
      {{
        episode.name.length > 15
          ? episode.name.slice(0, 15) + "..."
          : episode.name
      }}
    </h3>
    <span class="text-[#0AD7F1] font-medium">{{
      episode.episode.replace("E", " E")
    }}</span>
    <span class="text-[#989898] text-base">{{ episode.air_date }}</span>
  </div>
</template>
