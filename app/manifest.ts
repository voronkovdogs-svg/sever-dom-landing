import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Север Дом",
    short_name: "Север Дом",
    description: "Демонстрационный сайт строительной компании",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#17201c",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
