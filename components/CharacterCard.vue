<!-- components/CharacterCard.vue -->
<script setup lang="ts">
import { computed } from "vue";
import type { Character } from "~/types/character";

interface Props {
  character: Character;
}

const { character } = defineProps<Props>();
const { id, name, status, species, image } = character;

const getStatusColor = computed(() => {
  switch (status) {
    case "Alive":
      return "#00FF80";
    case "Dead":
      return "#FF1E00";
    default:
      return "#989A9C";
  }
});

const statusText = computed(() => {
  if (status === "unknown") {
    return `Unknown - ${species}`;
  }
  return `${status} - ${species}`;
});

// Use NuxtImage for optimized images
const imageUrl = computed(() => {
  return image || "/images/placeholder-character.png";
});
</script>

<template>
  <NuxtLink
    :to="`/character/${id}`"
    class="flex flex-col items-start p-4 gap-4 w-[384px] h-[459px] border border-transparent hover:border-dark-border rounded-2xl bg-dark-bg transition-colors duration-300"
  >
    <div
      class="relative w-[352px] h-[352px] bg-gray-100 rounded-lg overflow-hidden"
    >
      <NuxtImg
        v-if="image"
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover rounded-lg"
        loading="lazy"
        format="webp"
        quality="80"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <div class="relative w-32 h-32">
          <div
            class="absolute inset-0 border-2 border-gray-500 rotate-45"
          ></div>
          <div
            class="absolute inset-0 border-2 border-gray-500 -rotate-45"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-end w-full gap-2">
      <h3 class="text-white font-bold text-xl truncate w-full">
        {{ name }}
      </h3>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="w-3 h-3 rounded-full"
        :style="{ backgroundColor: getStatusColor }"
      ></span>
      <span class="text-white text-base">{{ statusText }}</span>
    </div>
  </NuxtLink>
</template>
