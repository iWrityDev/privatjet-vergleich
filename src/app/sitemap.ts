import { MetadataRoute } from "next";

export const dynamic = "force-static";
import { cities } from "@/data/cities";
import { routes } from "@/data/routes";
import { operators } from "@/data/operators";
import { aircraftTypes } from "@/data/aircraft";
import { destinations } from "@/data/destinations";
import { jetCardPrograms } from "@/data/jetcards";
import { articles } from "@/data/articles";

const BASE = "https://privatjet-vergleich.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/staedte`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/routen`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/anbieter`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/flugzeuge`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/reiseziele`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/jet-cards`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/ratgeber`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/ueber-uns`, priority: 0.5, changeFrequency: "yearly" as const },
    { url: `${BASE}/kontakt`, priority: 0.5, changeFrequency: "yearly" as const },
    { url: `${BASE}/affiliate-hinweis`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${BASE}/datenschutz`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE}/impressum`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const cityPages = cities.map((c) => ({
    url: `${BASE}/staedte/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const routePages = routes.map((r) => ({
    url: `${BASE}/routen/${r.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const operatorPages = operators.map((o) => ({
    url: `${BASE}/anbieter/${o.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const aircraftPages = aircraftTypes.map((a) => ({
    url: `${BASE}/flugzeuge/${a.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const destinationPages = destinations.map((d) => ({
    url: `${BASE}/reiseziele/${d.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const jetCardPages = jetCardPrograms.map((j) => ({
    url: `${BASE}/jet-cards/${j.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const articlePages = articles.map((a) => ({
    url: `${BASE}/ratgeber/${a.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date(a.publishedDate),
  }));

  return [
    ...staticPages,
    ...cityPages,
    ...routePages,
    ...operatorPages,
    ...aircraftPages,
    ...destinationPages,
    ...jetCardPages,
    ...articlePages,
  ];
}
