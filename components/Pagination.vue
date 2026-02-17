<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  totalPages: number;
  isLoading?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const currentPage = computed(() => {
  return Number(route.query.page ?? 1);
});

const visiblePages = computed(() => {
  const delta = 2;
  const range: number[] = [];
  const result: (number | string)[] = [];
  let last: number | undefined;

  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === 1 ||
      i === props.totalPages ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) result.push(last + 1);
      else if (i - last > 2) result.push("...");
    }
    result.push(i);
    last = i;
  }

  return result;
});

const pendingPage = ref<number | null>(null);

const debouncedNavigate = useDebounceFn((page: number) => {
  pendingPage.value = null;
  router.push({
    query: { ...route.query, page },
  });
}, 1000); // Handle page change with debounce cuse the api gives us 429 too many requests in a short time

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === currentPage.value) return;

  pendingPage.value = page;
  debouncedNavigate(page);
};

watch(
  () => route.query.page,
  () => {
    pendingPage.value = null;
  },
);
</script>

<template>
  <div v-if="totalPages > 1 && !isLoading" class="flex justify-center pt-8">
    <div class="flex items-center gap-2">
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1 || pendingPage !== null"
        class="w-8 h-8 disabled:opacity-50 hover:text-yellow-primary transition-colors"
        aria-label="First page"
      >
        «
      </button>

      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1 || pendingPage !== null"
        class="w-8 h-8 disabled:opacity-50 hover:text-yellow-primary transition-colors"
        aria-label="Previous page"
      >
        ‹
      </button>

      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          @click="goToPage(page as number)"
          :disabled="pendingPage !== null"
          :class="[
            'w-8 h-8 rounded-full text-sm transition-colors',
            pendingPage === page
              ? 'bg-yellow-primary/50 text-[#00333D] animate-pulse'
              : currentPage === page
                ? 'bg-yellow-primary text-[#00333D]'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white',
          ]"
        >
          {{ page }}
        </button>
        <span
          v-else
          class="w-8 h-8 text-gray-400 flex items-center justify-center"
        >
          ...
        </span>
      </template>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages || pendingPage !== null"
        class="w-8 h-8 disabled:opacity-50 hover:text-yellow-primary transition-colors"
        aria-label="Next page"
      >
        ›
      </button>

      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages || pendingPage !== null"
        class="w-8 h-8 disabled:opacity-50 hover:text-yellow-primary transition-colors"
        aria-label="Last page"
      >
        »
      </button>
    </div>
  </div>
</template>
