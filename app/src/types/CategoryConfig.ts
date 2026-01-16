export type FilterType = "price" | "product_type" | "sorting";

export type CategoryConfig = {
  name: string;
  route: string;
  availableProductTypes: string[];
  availableFilters: FilterType[];
  showcaseTitle: string;
};

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  Filma: {
    name: "Filma",
    route: "/movies",
    availableProductTypes: ["poster"],
    availableFilters: ["price", "sorting"],
    showcaseTitle: "Filma",
  },
  Makina: {
    name: "Makina",
    route: "/cars",
    availableProductTypes: ["poster"],
    availableFilters: ["price", "sorting"],
    showcaseTitle: "Makina",
  },
  Basketboll: {
    name: "Basketboll",
    route: "/basketball",
    availableProductTypes: ["poster"],
    availableFilters: ["price", "sorting"],
    showcaseTitle: "Basketboll",
  },
  F1: {
    name: "Formula 1",
    route: "/f1",
    availableProductTypes: ["poster", "accessory", "clothing"],
    availableFilters: ["price", "product_type", "sorting"],
    showcaseTitle: "Formula 1",
  },
  Futboll: {
    name: "Futboll",
    route: "/football",
    availableProductTypes: ["poster", "accessory", "clothing"],
    availableFilters: ["price", "product_type", "sorting"],
    showcaseTitle: "Futboll",
  },
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  poster: "Poster",
  accessory: "Aksesore",
  clothing: "Veshje",
};
