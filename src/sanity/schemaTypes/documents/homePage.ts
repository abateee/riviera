import { defineArrayMember, defineField, defineType } from "sanity";

import { FALLBACK_HOME_PAGE } from "../../../lib/content/fallback";

export const homePageType = defineType({
  name: "homePage",
  title: "Accueil",
  type: "document",
  initialValue: FALLBACK_HOME_PAGE,
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Sur-titre",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "heroTitle",
      title: "Titre principal",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre principal",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "heroBullets",
      title: "Arguments rapides",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(2).max(5),
    }),
    defineField({
      name: "reassurance",
      title: "Blocs de rassurance",
      type: "array",
      of: [defineArrayMember({ type: "reassuranceItem" })],
      validation: (rule) => rule.min(3).max(6),
    }),
    defineField({
      name: "serviceIntro",
      title: "Introduction services",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "areasIntro",
      title: "Introduction secteurs",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "leadIntro",
      title: "Introduction formulaire",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "faq",
      title: "FAQ principale",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(2).max(8),
    }),
  ],
});
