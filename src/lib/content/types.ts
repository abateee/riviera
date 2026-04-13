import type { PortableTextBlock } from "sanity";

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type ReassuranceItem = {
  _key?: string;
  title: string;
  text: string;
};

export type SiteSettings = {
  title: string;
  legalName: string;
  legalRepresentative?: string;
  legalAddress?: string;
  siret?: string;
  phoneDisplay: string;
  phoneHref: string;
  city: string;
  region: string;
  email?: string;
  hostingProvider?: string;
  hostingAddress?: string;
  description: string;
  serviceTags: string[];
  openingHours: string[];
  socialProof: string;
};

export type HomePage = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBullets: string[];
  reassurance: ReassuranceItem[];
  serviceIntro: string;
  areasIntro: string;
  leadIntro: string;
  faq: FaqItem[];
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  highlights: string[];
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
  orderRank: number;
};

export type Testimonial = {
  _id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  serviceLabel?: string;
  published: boolean;
  orderRank: number;
};

export type ServiceArea = {
  _id: string;
  title: string;
  slug: string;
  cityName: string;
  heroTitle: string;
  intro: string;
  mainContent: PortableTextBlock[];
  faq: FaqItem[];
  seoTitle?: string;
  seoDescription?: string;
  noindex: boolean;
  published: boolean;
  orderRank: number;
  nearbyCities: string[];
};
