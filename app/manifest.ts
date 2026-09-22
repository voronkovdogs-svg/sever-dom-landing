import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: "Север Дом",
    short_name: "Север Дом",
    description: "Демонстрационный сайт строительной компании",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#17201c",
    icons: [{ src: `${basePath}/favicon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
