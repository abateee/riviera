import { defineArrayMember, defineField, defineType } from "sanity";

export const serviceAreaType = defineType({
  name: "serviceArea",
  title: "Ville desservie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Utilisé dans /secteurs/[slug]. Le slug 'nice' est volontairement bloqué pour éviter un doublon avec la page d'accueil.",
      type: "slug",
      options: {
        source: "cityName",
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) {
            return true;
          }

          return value.current === "nice"
            ? "Le slug 'nice' est réservé à la page d'accueil."
            : true;
        }),
    }),
    defineField({
      name: "cityName",
      title: "Nom de la ville",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "heroTitle",
      title: "Titre principal",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "mainContent",
      title: "Contenu principal",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faq",
      title: "FAQ locale",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: "nearbyCities",
      title: "Villes voisines mentionnées",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.max(65),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: "noindex",
      title: "Noindex",
      description: "Empêche l'indexation si activé.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Publié",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Ordre",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "cityName",
      subtitle: "slug.current",
    },
  },
});
