"use client";

import { Package, ShoppingBag, TrendingUp } from "lucide-react";
import type { Shop } from "@/types/shop";

type DashboardHomeProps = {
  shop: Shop;
  userEmail: string;
  showCongratulations?: boolean;
};

const stats = [
  { label: "Ventes du jour", value: "0", icon: ShoppingBag },
  { label: "Commandes", value: "0", icon: Package },
  { label: "Revenus", value: "0 FCFA", icon: TrendingUp },
];

export function DashboardHome({
  shop,
  userEmail,
  showCongratulations = false,
}: DashboardHomeProps) {
  return (
    <main className="p-8 lg:p-10">
      {showCongratulations && (
        <div
          className="mb-6 rounded-3xl border border-white/60 p-6 text-white shadow-lg backdrop-blur-md transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${shop.color_accent} 0%, #7000FF 100%)`,
          }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-white/80">
            Félicitations
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {shop.name} est en ligne !
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Votre boutique est prête. Partagez votre lien : kyoshop.app/
            {shop.slug}
          </p>
        </div>
      )}

      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(0,85,255,0.06)] backdrop-blur-md">
        <p className="text-xs font-medium uppercase tracking-wider text-[#0055FF]">
          {shop.name}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
          Tableau de bord
        </h1>
        <p className="mt-4 text-zinc-600">
          Connecté en tant que{" "}
          <span className="font-semibold text-zinc-900">{userEmail}</span>
        </p>
        {shop.description && (
          <p className="mt-2 text-sm text-zinc-500">{shop.description}</p>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-white/60 bg-white/70 p-6 backdrop-blur-md"
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${shop.color_accent}20` }}
            >
              <Icon className="h-5 w-5" style={{ color: shop.color_accent }} />
            </div>
            <p className="text-2xl font-bold text-zinc-900">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
