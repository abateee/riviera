import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pb-24 pt-20">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-[0_25px_70px_-45px_rgba(67,87,66,0.26)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
            404
          </p>
          <h1 className="mt-4 font-heading text-5xl text-slate-950">
            Cette page n&apos;existe pas.
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Le contenu demandé a peut-être été déplacé ou n&apos;est pas encore
            publié.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
