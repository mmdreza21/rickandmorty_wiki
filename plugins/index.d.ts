declare module "#app" {
  interface NuxtApp {
    $apiClient: $Fetch<unknown, NitroFetchRequest>;
    $moment: (d: string | number | Date | undefined) => Moment;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $ApiClient: $Fetch<unknown, NitroFetchRequest>;
    $moment: Moment;
  }
}

export { };
