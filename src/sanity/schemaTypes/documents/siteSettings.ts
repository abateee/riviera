import { defineArrayMember, defineField, defineType } from "sanity";

import { FALLBACK_SITE_SETTINGS } from "../../../lib/content/fallback";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  initialValue: FALLBACK_SITE_SETTINGS,
  fields: [
    defineField({
      name: "title",
      title: "Nom commercial",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "legalName",
      title: "Raison sociale",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "legalRepresentative",
      title: "Responsable de publication",
      type: "string",
    }),
    defineField({
      name: "legalAddress",
      title: "Adresse légale",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "siret",
      title: "SIRET",
      type: "string",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Téléphone affiché",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneHref",
      title: "Lien téléphone",
      description: "Format conseillé : tel:+33669058919",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "Ville principale",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Région / département",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Adresse e-mail",
      type: "string",
    }),
    defineField({
      name: "hostingProvider",
      title: "Hébergeur",
      type: "string",
    }),
    defineField({
      name: "hostingAddress",
      title: "Adresse de l'hébergeur",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Description du site",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "serviceTags",
      title: "Services clés",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: "openingHours",
      title: "Horaires affichés",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "socialProof",
      title: "Phrase de rassurance",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
  ],
});
