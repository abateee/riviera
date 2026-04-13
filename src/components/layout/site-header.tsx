import Link from "next/link";

import type { SiteSettings } from "@/lib/content/types";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between gap-6 py-4">
        <Link href="/" className="min-w-0">
          <div className="font-heading text-3xl leading-none text-slate-950">
            {settings.title}
          </div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {settings.city} · aide à domicile
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          <Link href="/#services" className="transition hover:text-brand-700">
            Services
          </Link>
          <Link href="/#secteurs" className="transition hover:text-brand-700">
            Zones desservies
          </Link>
          <Link href="/contact" className="transition hover:text-brand-700">
            Contact
          </Link>
          <a
            href={settings.phoneHref}
            className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:bg-brand-700"
          >
            {settings.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
