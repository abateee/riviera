import type { PortableTextBlock } from "sanity";

import type {
  FaqItem,
  HomePage,
  Service,
  ServiceArea,
  SiteSettings,
} from "@/lib/content/types";

function portableText(...paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((paragraph, index) => ({
    _key: `block-${index}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span-${index}`,
        _type: "span",
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

function faq(question: string, answer: string): FaqItem {
  return { _key: question, question, answer };
}

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  title: "Riviera Compagnie",
  legalName: "Riviera Compagnie",
  phoneDisplay: "06 69 05 89 19",
  phoneHref: "tel:+33669058919",
  city: "Nice",
  region: "Alpes-Maritimes",
  description:
    "Riviera Compagnie accompagne les seniors et leurs proches à Nice avec une aide à domicile humaine, souple et réactive.",
  serviceTags: [
    "Aide à domicile",
    "Compagnie",
    "Aide ménagère",
    "Présence de nuit",
  ],
  openingHours: [
    "Du lundi au vendredi : 8h30 - 18h30",
    "Le samedi : sur demande",
  ],
  socialProof:
    "Une présence locale, un téléphone direct et des solutions adaptées au rythme de chaque famille.",
};

export const FALLBACK_HOME_PAGE: HomePage = {
  heroEyebrow: "Aide à domicile à Nice",
  heroTitle:
    "Une présence fiable et chaleureuse pour accompagner vos proches à domicile.",
  heroSubtitle:
    "Riviera Compagnie accompagne les familles de Nice avec des solutions souples : aide du quotidien, compagnie, ménage léger et présence rassurante.",
  heroBullets: [
    "Réponse rapide par téléphone",
    "Interventions à Nice et dans les environs",
    "Formules ponctuelles ou régulières",
    "Accompagnement possible sur demande pour les personnes en situation de handicap",
  ],
  reassurance: [
    {
      _key: "contact-direct",
      title: "Téléphone direct",
      text: "Un contact simple et humain pour comprendre votre situation et proposer une solution adaptée.",
    },
    {
      _key: "accompagnement-souple",
      title: "Accompagnement souple",
      text: "Mise en place progressive, adaptation du rythme et interventions pensées pour le quotidien réel.",
    },
    {
      _key: "intervenants-selectionnes",
      title: "Intervenants sélectionnés",
      text: "Savoir-être, ponctualité, discrétion et attention portée aux habitudes de la personne accompagnée.",
    },
    {
      _key: "ancrage-local",
      title: "Ancrage local",
      text: "Une organisation pensée pour Nice et la côte, avec une approche de proximité et un suivi plus personnel.",
    },
  ],
  serviceIntro:
    "Chaque accompagnement est ajusté au niveau d'autonomie, au rythme de vie et aux habitudes de la personne aidée.",
  areasIntro:
    "Nous intervenons à Nice et pouvons étudier les demandes dans les villes voisines selon les besoins et les disponibilités.",
  leadIntro:
    "Le téléphone reste le moyen le plus simple pour échanger rapidement. Si vous préférez, laissez vos coordonnées et nous revenons vers vous.",
  faq: [
    faq(
      "Quels types d'aide à domicile propose Riviera Compagnie ?",
      "Nous proposons une aide du quotidien centrée sur la présence, l'accompagnement, le ménage léger, les courses, la préparation des repas et le soutien pratique à domicile.",
    ),
    faq(
      "Intervenez-vous uniquement à Nice ?",
      "Nice reste la ville principale, mais nous pouvons aussi intervenir dans plusieurs communes voisines selon le besoin et l'organisation.",
    ),
    faq(
      "Peut-on demander une aide ponctuelle ?",
      "Oui. Nous pouvons mettre en place une aide ponctuelle, un relais temporaire ou un accompagnement plus régulier.",
    ),
    faq(
      "Accompagnez-vous aussi des personnes en situation de handicap ?",
      "Oui, sur demande. Le plus simple est de nous appeler pour préciser la situation, le besoin et le cadre d'intervention souhaité.",
    ),
    faq(
      "Comment se passe la première prise de contact ?",
      "Le plus rapide est de nous appeler. Nous échangeons sur le besoin, le niveau d'urgence, la ville concernée et la solution la plus adaptée.",
    ),
  ],
};

export const FALLBACK_SERVICES: Service[] = [
  {
    _id: "service-aide-quotidienne",
    title: "Aide à domicile au quotidien",
    slug: "aide-a-domicile-personnes-agees",
    excerpt:
      "Soutenir les gestes du quotidien, préserver l'autonomie et sécuriser l'organisation de la journée.",
    highlights: [
      "Aide au lever, à l'installation et aux repères de la journée",
      "Accompagnement aux courses, aux rendez-vous ou aux sorties de proximité",
      "Soutien pratique pour garder un rythme stable à domicile",
    ],
    body: portableText(
      "Cette prestation s'adresse aux familles qui cherchent une présence fiable pour soulager les gestes du quotidien sans bousculer les habitudes de vie de la personne aidée.",
      "L'objectif n'est pas seulement de faire à la place, mais d'accompagner avec tact, d'apporter des repères et de préserver autant que possible l'autonomie à domicile.",
      "À Nice, cette aide peut être organisée de manière ponctuelle, progressive ou régulière selon la situation.",
    ),
    seoTitle: "Aide à domicile pour personnes âgées à Nice | Riviera Compagnie",
    seoDescription:
      "Aide à domicile pour personnes âgées à Nice : présence, accompagnement et soutien au quotidien.",
    published: true,
    orderRank: 1,
  },
  {
    _id: "service-compagnie",
    title: "Dame de compagnie et présence relationnelle",
    slug: "dame-de-compagnie",
    excerpt:
      "Rompre l'isolement, rassurer et maintenir un lien humain régulier au domicile.",
    highlights: [
      "Présence rassurante et échanges réguliers",
      "Promenades, lecture, conversation et accompagnement extérieur",
      "Soutien précieux pour les proches éloignés ou très sollicités",
    ],
    body: portableText(
      "La compagnie à domicile répond à un besoin souvent sous-estimé : la présence, la conversation et la continuité humaine.",
      "Cette intervention est particulièrement utile lorsqu'un proche vit seul, sort moins, ou a besoin d'une présence calme et attentive pour garder un bon moral au quotidien.",
      "Riviera Compagnie privilégie une relation stable, simple et respectueuse des habitudes de chacun.",
    ),
    seoTitle: "Dame de compagnie à Nice | Riviera Compagnie",
    seoDescription:
      "Présence relationnelle et dame de compagnie à Nice pour rompre l'isolement et rassurer les familles.",
    published: true,
    orderRank: 2,
  },
  {
    _id: "service-menage",
    title: "Aide ménagère à domicile",
    slug: "aide-menagere-a-domicile",
    excerpt:
      "Alléger l'entretien courant du logement et garder un cadre de vie propre, sûr et agréable.",
    highlights: [
      "Entretien courant des pièces de vie",
      "Petites tâches de linge et remise en ordre",
      "Organisation pensée pour ne pas fatiguer inutilement la personne aidée",
    ],
    body: portableText(
      "L'entretien du domicile devient vite une source de fatigue ou d'anxiété lorsqu'il s'accumule. Une aide ménagère régulière redonne de l'air au quotidien.",
      "Le but est de maintenir un logement propre et confortable, sans alourdir l'organisation de la personne aidée ni de sa famille.",
      "Cette aide peut être combinée avec un accompagnement plus relationnel ou plus global selon les besoins.",
    ),
    seoTitle: "Aide ménagère à domicile à Nice | Riviera Compagnie",
    seoDescription:
      "Aide ménagère à domicile à Nice pour garder un cadre de vie propre, sûr et serein.",
    published: true,
    orderRank: 3,
  },
  {
    _id: "service-nuit",
    title: "Présence de nuit",
    slug: "presence-de-nuit",
    excerpt:
      "Une présence rassurante pour sécuriser la nuit, soulager les proches et réduire les inquiétudes.",
    highlights: [
      "Présence calme et repères nocturnes",
      "Relais ponctuel pour soulager la famille",
      "Sécurisation des périodes les plus sensibles",
    ],
    body: portableText(
      "La nuit concentre souvent les inquiétudes : solitude, désorientation, besoin d'être rassuré ou peur d'un incident sans solution immédiate.",
      "Une présence de nuit permet d'apporter un cadre plus sécurisant, de soulager les aidants et de mieux traverser certaines périodes fragiles.",
      "Le dispositif peut être mis en place sur des besoins ponctuels, en sortie d'hospitalisation ou dans un cadre plus durable.",
    ),
    seoTitle: "Présence de nuit à Nice | Riviera Compagnie",
    seoDescription:
      "Présence de nuit à Nice pour rassurer, sécuriser le domicile et soulager les proches aidants.",
    published: true,
    orderRank: 4,
  },
];

export const FALLBACK_SERVICE_AREAS: ServiceArea[] = [
  {
    _id: "area-antibes",
    title: "Aide à domicile à Antibes",
    slug: "antibes",
    cityName: "Antibes",
    heroTitle:
      "Une solution d'aide à domicile pensée pour les familles d'Antibes.",
    intro:
      "À Antibes, nous privilégions un accompagnement clair, humain et facile à mettre en place pour les proches comme pour la personne aidée.",
    mainContent: portableText(
      "Nous pouvons intervenir pour soutenir les gestes du quotidien, rompre l'isolement ou relayer une famille qui a besoin d'une présence fiable à domicile.",
      "Chaque situation est évaluée avec souplesse : besoin ponctuel, sortie d'hospitalisation, reprise de repères à la maison ou organisation régulière.",
      "Le premier échange permet de préciser le contexte, la fréquence souhaitée et la ville d'intervention afin de proposer une aide réaliste et rassurante.",
    ),
    faq: [
      faq(
        "Intervenez-vous vraiment à Antibes ?",
        "Oui, nous pouvons étudier les demandes situées à Antibes et dans ses environs selon le besoin et les disponibilités.",
      ),
      faq(
        "Quel est le moyen le plus rapide pour demander une aide ?",
        "Le plus rapide reste de nous appeler afin d'exposer la situation et de vérifier rapidement la faisabilité.",
      ),
    ],
    seoTitle: "Aide à domicile à Antibes | Riviera Compagnie",
    seoDescription:
      "Aide à domicile à Antibes : présence, accompagnement et solutions souples pour les familles.",
    noindex: false,
    published: true,
    orderRank: 1,
    nearbyCities: ["Juan-les-Pins", "Biot", "Vallauris"],
  },
  {
    _id: "area-cagnes",
    title: "Aide à domicile à Cagnes-sur-Mer",
    slug: "cagnes-sur-mer",
    cityName: "Cagnes-sur-Mer",
    heroTitle:
      "Un accompagnement de proximité pour les familles de Cagnes-sur-Mer.",
    intro:
      "À Cagnes-sur-Mer, nous aidons les familles à organiser une présence rassurante et un soutien concret à domicile.",
    mainContent: portableText(
      "L'objectif est de soulager le quotidien sans compliquer l'organisation familiale : aide au domicile, compagnie, ménage léger ou relais temporaire.",
      "Nous prenons le temps de comprendre les habitudes de vie, le niveau d'autonomie et les priorités immédiates avant toute mise en place.",
      "Si la demande est urgente, un appel permet d'aller plus vite et de vérifier rapidement la zone d'intervention.",
    ),
    faq: [
      faq(
        "Peut-on demander une aide ponctuelle à Cagnes-sur-Mer ?",
        "Oui, selon la situation nous pouvons mettre en place un relais temporaire ou un accompagnement plus régulier.",
      ),
      faq(
        "Le téléphone reste-t-il le meilleur moyen de contact ?",
        "Oui. Le téléphone permet d'obtenir un premier retour rapide et de confirmer les informations essentielles.",
      ),
    ],
    seoTitle: "Aide à domicile à Cagnes-sur-Mer | Riviera Compagnie",
    seoDescription:
      "Aide à domicile à Cagnes-sur-Mer : accompagnement humain, présence et soutien du quotidien.",
    noindex: false,
    published: true,
    orderRank: 2,
    nearbyCities: ["Villeneuve-Loubet", "Saint-Laurent-du-Var"],
  },
  {
    _id: "area-saint-laurent",
    title: "Aide à domicile à Saint-Laurent-du-Var",
    slug: "saint-laurent-du-var",
    cityName: "Saint-Laurent-du-Var",
    heroTitle:
      "Une présence rassurante à domicile pour les familles de Saint-Laurent-du-Var.",
    intro:
      "À Saint-Laurent-du-Var, nous pouvons accompagner les familles qui recherchent une aide souple, lisible et humaine.",
    mainContent: portableText(
      "Une aide bien organisée peut faire une différence concrète lorsque le quotidien devient plus lourd à gérer : présence, accompagnement, courses, sorties de proximité ou soutien à domicile.",
      "Nous privilégions une relation simple, avec un premier échange direct pour comprendre le besoin et proposer une solution adaptée à la situation réelle.",
      "Le but reste le même partout : rassurer la personne aidée, soulager les proches et garder un cadre stable au quotidien.",
    ),
    faq: [
      faq(
        "Comment savoir si vous pouvez intervenir à Saint-Laurent-du-Var ?",
        "Le plus simple est de nous appeler. Nous vérifions rapidement la localisation, le besoin et le délai souhaité.",
      ),
      faq(
        "Proposez-vous aussi des aides régulières ?",
        "Oui. Selon la situation, l'accompagnement peut être ponctuel, progressif ou régulier.",
      ),
    ],
    seoTitle: "Aide à domicile à Saint-Laurent-du-Var | Riviera Compagnie",
    seoDescription:
      "Aide à domicile à Saint-Laurent-du-Var : solutions souples, présence et accompagnement pour les familles.",
    noindex: false,
    published: true,
    orderRank: 3,
    nearbyCities: ["Cagnes-sur-Mer", "Nice Ouest"],
  },
];
