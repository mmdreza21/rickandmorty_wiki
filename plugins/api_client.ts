export default defineNuxtPlugin({
  parallel: true,
  setup(nuxtApp) {
    // const token = useCookie("Authorization");

    const config = useRuntimeConfig();
    const apiClient = $fetch.create({
      baseURL: `${config.public.BASEURL}/api`,

      onRequest({ options }) {
        // if (token.value) {
        //   options.headers = {
        //     ...options.headers,
        //   };
        // } else {
        //   options.headers = {
        //     ...options.headers,
        //   };
        // }
      },

      onResponse({ response }) {
      },
      onResponseError({ response }) {
        throw new Error(response._data.message as string);
      },
    });
    return {
      provide: {
        apiClient,
      },
    };
  },
});
