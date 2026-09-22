import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Север Дом — строительство загородных домов под ключ",
    template: "%s · Север Дом",
  },
  description:
    "Демонстрационный лендинг: проектирование и строительство современных домов в Москве и Московской области.",
  alternates: { canonical: "/" },
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
  manifest: `${basePath}/manifest.webmanifest`,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Север Дом",
    title: "Север Дом — дом с прозрачной сметой",
    description: "Проектирование и строительство современных загородных домов. Демонстрационный проект.",
    images: [{ url: `${siteUrl}/images/og/sever-dom-og.webp`, width: 1200, height: 630, alt: "Север Дом — дом с прозрачной сметой" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Север Дом — дом с прозрачной сметой",
    description: "Демонстрационный проект строительной компании.",
    images: [`${siteUrl}/images/og/sever-dom-og.webp`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17201c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
