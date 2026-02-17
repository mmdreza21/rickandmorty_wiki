<script setup lang="ts">
import type { Character } from "~/types/character";
import type { Episode } from "~/types/episode";
import type { Location } from "~/types/location";

const route = useRoute();
const { getCharacterById, getMultipleEpisodes, getMultipleLocations } =
  useCharacters();

const {
  data: character,
  pending: isLoading,
  error,
} = await useAsyncData<Character>(`character-${route.params.id}`, () =>
  getCharacterById(Number(route.params.id)),
);

const episodeUrls = computed(() => character.value?.episode ?? []);

const { data: episodes } = await useAsyncData<Episode[]>(
  `character-episodes-${route.params.id}`,
  () => getMultipleEpisodes(episodeUrls.value),
  {
    watch: [episodeUrls],
    default: () => [],
  },
);

const { data: location } = await useAsyncData<Location>(
  `character-locations-${route.params.id}`,
  () => getMultipleLocations(character.value?.location.url),
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "bg-green-status";
    case "Dead":
      return "bg-red-status";
    default:
      return "bg-gray-600";
  }
};
</script>

<template>
  <div class="min-h-screen bg-dark-bg font-rubik">
    <div class="gradient-bg px-16 md:px-[156px] py-[68px] pb-16 relative">
      <div
        class="absolute w-[200px] h-[152px] left-[0] md:left-[294px] md:top-[100px] top-[200px] bg-yellow-primary blur-[100px] rounded-full"
      ></div>
      <div v-if="isLoading" class="flex justify-center items-center h-[200px]">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-primary"
        ></div>
      </div>

      <div v-else-if="error" class="flex justify-center items-center h-[200px]">
        <p class="text-red-500">{{ error }}</p>
      </div>

      <div v-else-if="character" class="relative z-10">
        <div
          class="flex flex-col md:flex-row items-start md:items-center gap-12"
        >
          <div
            class="w-[240px] h-[240px] rounded-lg relative overflow-hidden bg-gray-100"
          >
            <NuxtImg
              :src="character.image"
              :alt="character.name"
              class="w-full h-full object-cover relative z-10"
              format="webp"
            />
            <div class="absolute inset-0">
              <div
                class="absolute w-full h-px border border-cyan-400 top-1/2 left-0 rotate-45"
              ></div>
              <div
                class="absolute w-full h-px border border-cyan-400 top-1/2 left-0 -rotate-45"
              ></div>
            </div>
          </div>

          <div class="flex flex-col items-start gap-4 flex-1">
            <h1 class="text-white font-medium text-3xl md:text-4xl">
              {{ character.name }}
            </h1>

            <div class="flex items-center gap-2">
              <span
                :class="[
                  'w-3 h-3 rounded-full',
                  getStatusColor(character.status),
                ]"
              ></span>
              <span class="text-white text-base">
                {{ character.status }} - {{ character.species }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 md:px-[156px] pb-16 mt-16">
      <div v-if="episodes.length" class="flex flex-col items-start mb-6">
        <div class="flex">
          <NuxtImg
            class="w-[24px] h-[24px] mt-1 mr-3"
            src="/svg/play_list.svg"
          />
          <h2 class="text-white font-medium text-2xl">Episodes</h2>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-6"
        >
          <EpisodeCard
            v-for="episode in episodes"
            :key="episode.id"
            :episode="episode"
          />
        </div>
      </div>

      <div v-if="location" class="flex flex-col items-start mt-16">
        <div class="flex mb-6">
          <NuxtImg
            class="w-[24px] h-[24px] mt-1 mr-3"
            src="/svg/location_on.svg"
          ></NuxtImg>
          <h2 class="text-white font-medium text-2xl">Locations</h2>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
        >
          <LocationCard :location="location" />
        </div>
      </div>
    </div>
  </div>
</template>
