import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StickyCallBar } from "@/components/layout/sticky-call-bar";
import {
  getServiceAreas,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { FALLBACK_SITE_SETTINGS } from "@/lib/content/fallback";
import { getBaseUrl } from "@/lib/seo";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: FALLBACK_SITE_SETTINGS.title,
    template: `%s | ${FALLBACK_SITE_SETTINGS.title}`,
  },
  description: FALLBACK_SITE_SETTINGS.description,
  openGraph: {
    siteName: FALLBACK_SITE_SETTINGS.title,
    locale: "fr_FR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services, serviceAreas] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getServiceAreas(),
  ]);

  return (
    <html
      lang="fr"
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-sand-50 font-sans text-slate-900 antialiased">
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,rgba(130,157,127,0.24),transparent_45%),radial-gradient(circle_at_top_left,rgba(239,230,216,0.7),transparent_34%)]" />
          <SiteHeader settings={settings} />
          <main>{children}</main>
          <SiteFooter
            settings={settings}
            services={services}
            serviceAreas={serviceAreas}
          />
          <StickyCallBar settings={settings} />
        </div>
      </body>
    </html>
  );
}
