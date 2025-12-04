import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nickheymann.github.io/musikfuerfirmen";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2024-12-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date("2024-12-04"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date("2024-12-04"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
