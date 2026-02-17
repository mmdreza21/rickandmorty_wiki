<script setup lang="ts">
import type { Character } from "~/types/character";

const route = useRoute();
const router = useRouter();
const { getCharacters } = useCharacters();

const searchQuery = ref("");
const debouncedSearch = refDebounced(searchQuery, 500);

const page = computed(() => Number(route.query.page ?? 1));

const {
  data,
  pending: isLoading,
  error,
  refresh,
} = await useAsyncData(
  "characters",
  () => getCharacters(page.value, debouncedSearch.value),
  { watch: [page, debouncedSearch] },
);

const characters = computed(() => data.value?.results ?? []);
const totalPages = computed(() => data.value?.info.pages ?? 1);

watch(debouncedSearch, () => {
  router.push({ query: { ...route.query, page: 1 } });
});
</script>

<template>
  <SearchSection v-model="searchQuery" />

  <div class="pb-16 relative">
    <div class="bg-dark-bg rounded-2xl py-6">
      <div v-if="isLoading" class="flex justify-center items-center h-[600px]">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-primary"
        ></div>
      </div>

      <div v-else-if="error" class="flex justify-center items-center h-[600px]">
        <div class="text-center">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button
            @click="refresh()"
            class="px-4 py-2 bg-yellow-primary text-[#00333D] rounded"
          >
            Try Again
          </button>
        </div>
      </div>

      <div
        v-else-if="!characters.length"
        class="flex justify-center items-center h-[600px]"
      >
        <p class="text-gray-400">No characters found</p>
      </div>

      <div v-else class="flex flex-wrap justify-center gap-6">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
      </div>

      <Pagination :total-pages="totalPages" />
    </div>
  </div>
</template>

<style scoped>
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(153, 156, 159, 0.18) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(153, 156, 159, 0.18) 1px,
      transparent 1px
    );
  background-size: 50px 50px;
}
</style>
