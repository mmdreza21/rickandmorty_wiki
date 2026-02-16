<script setup lang="ts">
import type { Character } from "~/types/character";

const route = useRoute();
const { getCharacterById } = useCharacters();

const character = ref<Character | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

try {
  character.value = await getCharacterById(Number(route.params.id));
} catch (err) {
  error.value = "Failed to load character details";
} finally {
  isLoading.value = false;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "#00FF80";
    case "Dead":
      return "#FF1E00";
    default:
      return "#989A9C";
  }
};
</script>

<template>
  <div class="min-h-screen bg-dark-bg p-8">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-primary"
      ></div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-screen">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div
      v-else-if="character"
      class="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8"
    >
      <NuxtLink to="/" class="text-yellow-primary mb-4 inline-block">
        ← Back to characters
      </NuxtLink>

      <div class="flex flex-col md:flex-row gap-8">
        <NuxtImg
          :src="character.image"
          :alt="character.name"
          class="w-64 h-64 rounded-lg object-cover"
          format="webp"
        />

        <div class="flex-1">
          <h1 class="text-3xl font-bold text-white mb-4">
            {{ character.name }}
          </h1>

          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: getStatusColor(character.status) }"
              ></span>
              <span class="text-white"
                >Status:
                <span class="text-gray-300">{{ character.status }}</span></span
              >
            </div>

            <p class="text-white">
              Species:
              <span class="text-gray-300">{{ character.species }}</span>
            </p>
            <p v-if="character.type" class="text-white">
              Type: <span class="text-gray-300">{{ character.type }}</span>
            </p>
            <p class="text-white">
              Gender: <span class="text-gray-300">{{ character.gender }}</span>
            </p>
            <p class="text-white">
              Origin:
              <span class="text-gray-300">{{ character.origin.name }}</span>
            </p>
            <p class="text-white">
              Location:
              <span class="text-gray-300">{{ character.location.name }}</span>
            </p>
            <p class="text-white">
              Episodes:
              <span class="text-gray-300">{{ character.episode.length }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
