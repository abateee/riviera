import type {
  HomePage,
  Service,
  ServiceArea,
  SiteSettings,
  Testimonial,
} from "@/lib/content/types";
import {
  FALLBACK_HOME_PAGE,
  FALLBACK_SERVICES,
  FALLBACK_SERVICE_AREAS,
  FALLBACK_SITE_SETTINGS,
} from "@/lib/content/fallback";
import { isSanityEnabled } from "@/lib/sanity/env";
import { sanityFetch } from "@/lib/sanity/client";
import {
  homePageQuery,
  serviceAreaBySlugQuery,
  serviceAreasQuery,
  serviceBySlugQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/lib/sanity/queries";

type SlugValue = { current?: string };

type SanityService = Omit<Service, "slug"> & { slug?: SlugValue };
type SanityServiceArea = Omit<ServiceArea, "slug"> & { slug?: SlugValue };

function mapService(service: SanityService): Service | null {
  if (!service?.slug?.current) {
    return null;
  }

  return {
    ...service,
    body: service.body ?? [],
    highlights: service.highlights ?? [],
    published: service.published ?? false,
    slug: service.slug.current,
  };
}

function mapServiceArea(area: SanityServiceArea): ServiceArea | null {
  if (!area?.slug?.current) {
    return null;
  }

  return {
    ...area,
    faq: area.faq ?? [],
    mainContent: area.mainContent ?? [],
    nearbyCities: area.nearbyCities ?? [],
    noindex: area.noindex ?? false,
    published: area.published ?? false,
    slug: area.slug.current,
  };
}

async function fetchOrFallback<QueryResponse, Result = QueryResponse>(
  query: string,
  fallback: Result,
  mapper?: (value: QueryResponse) => Result,
  params?: Record<string, unknown>,
) {
  if (!isSanityEnabled) {
    return fallback;
  }

  try {
    const data = await sanityFetch<QueryResponse>(query, params);

    if (!data) {
      return fallback;
    }

    return mapper ? mapper(data) : (data as Result);
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchOrFallback<SiteSettings>(siteSettingsQuery, FALLBACK_SITE_SETTINGS);
}

export async function getHomePage(): Promise<HomePage> {
  return fetchOrFallback<HomePage>(homePageQuery, FALLBACK_HOME_PAGE);
}

export async function getServices(): Promise<Service[]> {
  return fetchOrFallback<SanityService[], Service[]>(
    servicesQuery,
    FALLBACK_SERVICES,
    (services) =>
      services
        .map(mapService)
        .filter((service): service is Service => Boolean(service)),
  );
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  if (!isSanityEnabled) {
    return FALLBACK_SERVICES.find((service) => service.slug === slug);
  }

  try {
    const service = await sanityFetch<SanityService | null>(serviceBySlugQuery, {
      slug,
    });

    return service ? mapService(service) ?? undefined : undefined;
  } catch {
    return FALLBACK_SERVICES.find((service) => service.slug === slug);
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchOrFallback<Testimonial[], Testimonial[]>(
    testimonialsQuery,
    [],
    (items) => items.filter((item) => item.published ?? true),
  );
}

export async function getServiceAreas(): Promise<ServiceArea[]> {
  return fetchOrFallback<SanityServiceArea[], ServiceArea[]>(
    serviceAreasQuery,
    FALLBACK_SERVICE_AREAS,
    (areas) =>
      areas
        .map(mapServiceArea)
        .filter((area): area is ServiceArea => Boolean(area)),
  );
}

export async function getServiceAreaBySlug(
  slug: string,
): Promise<ServiceArea | undefined> {
  if (!isSanityEnabled) {
    return FALLBACK_SERVICE_AREAS.find((area) => area.slug === slug);
  }

  try {
    const area = await sanityFetch<SanityServiceArea | null>(
      serviceAreaBySlugQuery,
      {
        slug,
      },
    );

    return area ? mapServiceArea(area) ?? undefined : undefined;
  } catch {
    return FALLBACK_SERVICE_AREAS.find((area) => area.slug === slug);
  }
}
