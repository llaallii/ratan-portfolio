export const siteConfig = {
  name: "Ratan Portfolio",
  description: "Portfolio site built with Next.js",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}
