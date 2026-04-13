import { defineField, defineType } from "sanity";

export const reassuranceItemType = defineType({
  name: "reassuranceItem",
  title: "Point de rassurance",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "text",
    },
  },
});

