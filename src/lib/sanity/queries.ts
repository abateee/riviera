export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    title,
    legalName,
    legalRepresentative,
    legalAddress,
    siret,
    phoneDisplay,
    phoneHref,
    city,
    region,
    email,
    hostingProvider,
    hostingAddress,
    description,
    serviceTags,
    openingHours,
    socialProof
  }
`;

export const homePageQuery = `
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroBullets,
    reassurance[]{
      _key,
      title,
      text
    },
    serviceIntro,
    areasIntro,
    leadIntro,
    faq[]{
      _key,
      question,
      answer
    }
  }
`;

export const servicesQuery = `
  *[_type == "service" && published == true] | order(orderRank asc, title asc){
    _id,
    title,
    slug,
    excerpt,
    highlights,
    body,
    seoTitle,
    seoDescription,
    published,
    orderRank
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug && published == true][0]{
    _id,
    title,
    slug,
    excerpt,
    highlights,
    body,
    seoTitle,
    seoDescription,
    published,
    orderRank
  }
`;

export const testimonialsQuery = `
  *[_type == "testimonial" && published == true] | order(orderRank asc, name asc){
    _id,
    name,
    location,
    quote,
    rating,
    serviceLabel,
    published,
    orderRank
  }
`;

export const serviceAreasQuery = `
  *[_type == "serviceArea" && published == true] | order(orderRank asc, cityName asc){
    _id,
    title,
    slug,
    cityName,
    heroTitle,
    intro,
    mainContent,
    faq[]{
      _key,
      question,
      answer
    },
    seoTitle,
    seoDescription,
    noindex,
    published,
    orderRank,
    nearbyCities
  }
`;

export const serviceAreaBySlugQuery = `
  *[_type == "serviceArea" && slug.current == $slug && published == true][0]{
    _id,
    title,
    slug,
    cityName,
    heroTitle,
    intro,
    mainContent,
    faq[]{
      _key,
      question,
      answer
    },
    seoTitle,
    seoDescription,
    noindex,
    published,
    orderRank,
    nearbyCities
  }
`;
