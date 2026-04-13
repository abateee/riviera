import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Riviera Compagnie")
    .items([
      S.listItem()
        .title("Réglages du site")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Accueil")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("serviceArea").title("Villes desservies"),
      S.documentTypeListItem("testimonial").title("Témoignages"),
    ]);
