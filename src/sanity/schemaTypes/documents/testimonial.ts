import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Prénom / nom",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "location",
      title: "Localisation",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: "rating",
      title: "Note",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "serviceLabel",
      title: "Service concerné",
      type: "string",
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
      title: "name",
      subtitle: "location",
    },
  },
});
