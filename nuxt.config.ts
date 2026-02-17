import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  devServer: { host: "0.0.0.0" },
  css: [
    "~/assets/styles/main.css",
  ],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss() as any],
  },
  routeRules: {},
  plugins: [
    { src: "~/plugins/api_client" },
  ],
  build: {},
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
  ],

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [],
    },
  },

  nitro: {
    preset: 'netlify'
  },
  compatibilityDate: "2026-01-01",

  runtimeConfig: {
    public: {
      BASEURL: "https://rickandmortyapi.com",
    },
  },
});
