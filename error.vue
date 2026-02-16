<script setup lang="ts">
const error = useError();

const goHome = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="min-h-screen bg-[#0f1115] text-gray-300 flex flex-col items-center justify-center px-6"
  >
    <!-- Glow Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 blur-3xl rounded-full"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center max-w-xl">
      <h1 class="text-7xl font-bold text-lime-400 drop-shadow-lg">
        {{ error?.statusCode }}
      </h1>

      <h2 class="mt-4 text-2xl font-semibold text-white">
        {{ error?.statusMessage || "Something went wrong" }}
      </h2>

      <p class="mt-4 text-gray-400">
        The page you're looking for doesn’t exist or an unexpected error
        occurred.
      </p>

      <button
        @click="goHome"
        class="mt-8 px-6 py-3 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 transition-all duration-300 shadow-lg shadow-lime-500/20"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>
