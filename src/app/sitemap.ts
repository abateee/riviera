import type { MetadataRoute } from "next";

import { getServiceAreas, getServices } from "@/lib/content";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const [services, serviceAreas] = await Promise.all([
    getServices(),
    getServiceAreas(),
  ]);

  return [
    "",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    ...services.map((service) => `/services/${service.slug}`),
    ...serviceAreas
      .filter((area) => !area.noindex)
      .map((area) => `/secteurs/${area.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
