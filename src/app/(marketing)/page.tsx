import { Sparkles, Zap, Shield } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";

const features = [
  {
    icon: Zap,
    label: "Boutique en 1 minute",
  },
  {
    icon: Shield,
    label: "Paiements sécurisés",
  },
  {
    icon: Sparkles,
    label: "Zéro friction",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#0055FF]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#7000FF]/15 blur-3xl"
      />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-12 px-6 pb-16 pt-28 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pt-32">
        <section className="max-w-xl text-center lg:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#0055FF] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Social Commerce · Afrique
          </p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Vendez partout.{" "}
            <span className="bg-gradient-to-r from-[#0055FF] to-[#7000FF] bg-clip-text text-transparent">
              En un clic.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            KYÔ SHOP transforme votre téléphone en boutique professionnelle.
            Créez votre vitrine, partagez vos produits et encaissez —{" "}
            <strong className="font-semibold text-zinc-800">
              en moins d&apos;une minute
            </strong>
            .
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {features.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm text-zinc-700 backdrop-blur-md"
              >
                <Icon className="h-4 w-4 text-[#7000FF]" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex w-full justify-center lg:justify-end">
          <AuthForm />
        </section>
      </main>
    </div>
  );
}
