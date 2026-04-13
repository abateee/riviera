import type { Metadata } from "next";
import { PhoneCall } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { getServices, getSiteSettings } from "@/lib/content";
import { getLeadStatus } from "@/lib/lead/status";
import { buildMetadata } from "@/lib/seo";

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Contact | ${settings.title}`,
    description: `Contactez ${settings.title} pour une aide à domicile à ${settings.city}.`,
    path: "/contact",
  });
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [settings, services, resolvedSearch] = await Promise.all([
    getSiteSettings(),
    getServices(),
    searchParams,
  ]);
  const leadStatus = getLeadStatus(resolvedSearch);

  return (
    <section className="pb-24 pt-14 sm:pt-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Le plus simple est de nous appeler directement."
            description="Si vous préférez laisser une demande, le formulaire ci-contre reste disponible pour organiser un premier échange."
          />
          <div className="mt-8 rounded-[2rem] bg-slate-950 p-8 text-white">
            <div className="flex items-center gap-3 text-brand-200">
              <PhoneCall className="size-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                Téléphone direct
              </p>
            </div>
            <a
              href={settings.phoneHref}
              className="mt-4 inline-block font-heading text-5xl text-white"
            >
              {settings.phoneDisplay}
            </a>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {settings.city} · {settings.region}
            </p>
          </div>
        </div>

        <LeadForm
          pagePath="/contact"
          settings={settings}
          services={services}
          status={leadStatus}
        />
      </div>
    </section>
  );
}
