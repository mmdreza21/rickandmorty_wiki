<!-- pages/index.vue -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Character } from "~/types/character";

// Use the characters composable
const { getCharacters } = useCharacters();

// State
const searchQuery = ref("");
const currentPage = ref(1);
const characters = ref<Character[]>([]);
const totalPages = ref(1);
const totalCount = ref(0);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Debounce search to avoid too many requests
const debouncedSearch = refDebounced(searchQuery, 500);

// Fetch characters function
const fetchCharacters = async (page: number, search?: string) => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await getCharacters(page, search);
    characters.value = response.results;
    totalPages.value = response.info.pages;
    totalCount.value = response.info.count;
  } catch (err) {
    error.value = "Failed to load characters. Please try again.";
    characters.value = [];
    totalPages.value = 1;
  } finally {
    isLoading.value = false;
  }
};

// Watch for page changes
watch(currentPage, async (newPage) => {
  await fetchCharacters(newPage, debouncedSearch.value);
});

// Watch for search changes
watch(debouncedSearch, async (newSearch) => {
  currentPage.value = 1; // Reset to first page on search
  await fetchCharacters(1, newSearch);
});

// Initial load
await fetchCharacters(1);

// Pagination computed properties
const visiblePages = computed(() => {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
});

// Pagination methods
const goToPage = (page: number) => {
  currentPage.value = page;
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

// Status helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "#00FF80";
    case "Dead":
      return "#FF1E00";
    default:
      return "#989A9C"; // gray for unknown
  }
};

const getStatusText = (character: Character) => {
  if (character.status === "unknown") {
    return `Unknown - ${character.species}`;
  }
  return `${character.status} - ${character.species}`;
};
</script>

<template>
  <div class="absolute inset-0 pointer-events-none rounded-circle">
    <div
      class="absolute w-[200px] h-[152px] left-[294px] top-[1px] bg-yellow-primary/30 blur-[45px]"
    ></div>

    <!-- Grid Pattern -->
    <div class="absolute inset-0 opacity-[0.18] mix-blend-color-dodge">
      <div class="grid-pattern"></div>
    </div>
  </div>

  <!-- Search Section -->
  <div class="flex flex-col items-center px-[120px] pt-[26px] pb-6 gap-9">
    <div class="w-full max-w-[1608px]">
      <!-- Search Bar -->
      <div class="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
        <div
          class="flex-1 flex items-center gap-2 px-4 py-3 bg-dark-card rounded"
        >
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for characters..."
            class="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-primary rounded"
        >
          <span class="text-[#00333D] font-medium">Search</span>
        </button>
      </div>

      <!-- Results count -->
      <div
        v-if="!isLoading && characters.length"
        class="mt-2 text-gray-400 text-sm"
      >
        Found {{ totalCount }} characters
      </div>
    </div>
  </div>

  <!-- Character Grid -->
  <div class="px-[120px] pb-16">
    <div class="bg-dark-bg rounded-2xl p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-[600px]">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-primary"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center items-center h-[600px]">
        <div class="text-center">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button
            @click="fetchCharacters(currentPage, debouncedSearch)"
            class="px-4 py-2 bg-yellow-primary text-[#00333D] rounded"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-else-if="!characters.length"
        class="flex justify-center items-center h-[600px]"
      >
        <p class="text-gray-400">No characters found</p>
      </div>

      <!-- Character Grid -->
      <div v-else class="flex flex-wrap justify-center gap-6">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :name="character.name"
          :status="character.status"
          :species="character.species"
          :image="character.image"
          :type="character.type"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && !isLoading" class="flex justify-center pt-8">
        <div class="flex items-center gap-2">
          <!-- First Page -->
          <button
            @click="goToFirstPage"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center disabled:opacity-50"
          >
            <span class="text-2xl text-gray-400">«</span>
          </button>

          <!-- Previous Page -->
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center disabled:opacity-50"
          >
            <span class="text-2xl text-gray-400">‹</span>
          </button>

          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page as number)"
              :class="[
                'w-8 h-8 rounded-full text-sm font-medium transition-colors',
                currentPage === page
                  ? 'bg-yellow-primary text-[#00333D]'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="w-8 h-8 text-gray-400 flex items-center justify-center"
              >...</span
            >
          </template>

          <!-- Next Page -->
          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center disabled:opacity-50"
          >
            <span class="text-2xl text-gray-400">›</span>
          </button>

          <!-- Last Page -->
          <button
            @click="goToLastPage"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center disabled:opacity-50"
          >
            <span class="text-2xl text-gray-400">»</span>
          </button>
        </div>
      </div>
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
