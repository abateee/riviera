"use client";

import { useEffect, useState } from "react";

import type { SiteSettings } from "@/lib/content/types";

type StickyCallBarProps = {
  settings: SiteSettings;
};

export function StickyCallBar({ settings }: StickyCallBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 140);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-20px_rgba(67,87,66,0.32)] backdrop-blur lg:hidden">
      <a
        href={settings.phoneHref}
        className="flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white"
      >
        Appeler {settings.phoneDisplay}
      </a>
    </div>
  );
}
