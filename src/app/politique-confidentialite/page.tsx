import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Politique de confidentialité | ${settings.title}`,
    description: `Politique de confidentialité du site ${settings.title}.`,
    path: "/politique-confidentialite",
  });
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const contactMethod = settings.email
    ? `${settings.email} ou ${settings.phoneDisplay}`
    : settings.phoneDisplay;

  return (
    <section className="pb-24 pt-16">
      <div className="section-shell max-w-4xl rounded-[2rem] bg-white p-8 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.4)] sm:p-10">
        <h1 className="font-heading text-5xl text-slate-950">
          Politique de confidentialité
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">
              Données collectées
            </h2>
            <p className="mt-2">
              Le formulaire de contact collecte les informations strictement
              nécessaires au rappel : nom, téléphone, e-mail facultatif, besoin
              exprimé, créneau souhaité et message libre.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">
              Finalité du traitement
            </h2>
            <p className="mt-2">
              Les données sont utilisées uniquement pour reprendre contact au
              sujet de la demande envoyée depuis le site {settings.title}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">
              Destinataires et conservation
            </h2>
            <p className="mt-2">
              Les informations sont destinées aux personnes en charge du suivi
              des demandes chez {settings.legalName}. Elles peuvent être
              transmises aux outils techniques nécessaires à la réception et au
              traitement des demandes envoyées depuis le site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">Vos droits</h2>
            <p className="mt-2">
              Vous pouvez demander l&apos;accès, la rectification ou la suppression
              de vos données en utilisant les coordonnées de contact suivantes :
              {` ${contactMethod}.`}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
