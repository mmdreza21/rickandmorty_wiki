<!-- components/CharacterCard.vue -->
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  type?: string;
}

const props = defineProps<Props>();

const getStatusColor = computed(() => {
  switch (props.status) {
    case "Alive":
      return "#00FF80";
    case "Dead":
      return "#FF1E00";
    default:
      return "#989A9C";
  }
});

const statusText = computed(() => {
  if (props.status === "unknown") {
    return `Unknown - ${props.species}`;
  }
  return `${props.status} - ${props.species}`;
});

// Use NuxtImage for optimized images
const imageUrl = computed(() => {
  return props.image || "/placeholder-character.jpg";
});
</script>

<template>
  <div
    class="flex flex-col items-start p-4 gap-4 w-[384px] h-[459px] border border-dark-border rounded-2xl bg-dark-bg hover:border-yellow-primary/50 transition-colors duration-300"
  >
    <!-- Image -->
    <div
      class="relative w-[352px] h-[352px] bg-gray-100 rounded-lg overflow-hidden"
    >
      <NuxtImg
        v-if="image"
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover"
        loading="lazy"
        format="webp"
        quality="80"
      />
      <!-- Fallback Pattern if no image -->
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

    <!-- Character Info -->
    <div class="flex flex-col items-end w-full gap-2">
      <h3 class="text-white font-bold text-xl truncate w-full text-right">
        {{ name }}
      </h3>
      <p v-if="type" class="text-gray-400 text-sm">{{ type }}</p>
    </div>

    <!-- Status -->
    <div class="flex items-center gap-2">
      <span
        class="w-3 h-3 rounded-full"
        :style="{ backgroundColor: getStatusColor }"
      ></span>
      <span class="text-white text-base">{{ statusText }}</span>
    </div>
  </div>
</template>
