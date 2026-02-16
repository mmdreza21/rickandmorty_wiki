<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-[#0f1115] text-gray-200 flex flex-col">
    <LayoutHeader />
    <main>
      <div class="px-[156px]">
        <slot />
      </div>
    </main>
  </div>
</template>
