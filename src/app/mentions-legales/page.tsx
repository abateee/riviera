import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Mentions légales | ${settings.title}`,
    description: `Mentions légales du site ${settings.title}.`,
    path: "/mentions-legales",
  });
}

export default async function LegalPage() {
  const settings = await getSiteSettings();

  return (
    <section className="pb-24 pt-16">
      <div className="section-shell max-w-4xl rounded-[2rem] bg-white p-8 shadow-[0_25px_70px_-45px_rgba(67,87,66,0.26)] sm:p-10">
        <h1 className="font-heading text-5xl text-slate-950">Mentions légales</h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">Éditeur</h2>
            <p className="mt-2">
              Site édité par <strong>{settings.legalName}</strong>.
            </p>
            {settings.legalRepresentative ? (
              <p>Responsable de publication : {settings.legalRepresentative}</p>
            ) : null}
            {settings.legalAddress ? <p>Adresse : {settings.legalAddress}</p> : null}
            {settings.siret ? <p>SIRET : {settings.siret}</p> : null}
            <p>Téléphone : {settings.phoneDisplay}</p>
            <p>
              Ville principale : {settings.city}, {settings.region}
            </p>
            {settings.email ? <p>E-mail : {settings.email}</p> : null}
          </section>

          {settings.hostingProvider || settings.hostingAddress ? (
            <section>
              <h2 className="text-lg font-semibold text-slate-950">Hébergement</h2>
              {settings.hostingProvider ? (
                <p className="mt-2">Hébergeur : {settings.hostingProvider}</p>
              ) : null}
              {settings.hostingAddress ? <p>Adresse : {settings.hostingAddress}</p> : null}
            </section>
          ) : null}

          <section>
            <h2 className="text-lg font-semibold text-slate-950">
              Propriété intellectuelle
            </h2>
            <p className="mt-2">
              L&apos;ensemble des contenus du site relève de la réglementation
              applicable en matière de propriété intellectuelle. Toute
              reproduction non autorisée est interdite.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
