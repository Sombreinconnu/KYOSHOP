"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  Sparkles,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/products", label: "Mes Produits", icon: Package },
  { href: "/dashboard/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/dashboard/finances", label: "Finances", icon: Wallet },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#0d0d12]/75 p-5 backdrop-blur-xl">
      <Link
        href="/dashboard"
        className="mb-10 bg-gradient-to-r from-[#0055FF] to-[#7000FF] bg-clip-text text-lg font-bold tracking-tight text-transparent"
      >
        KYÔ SHOP
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#0055FF]" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
        <Link
          href="/dashboard/kyo-digital"
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#0055FF] to-[#7000FF] px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0055FF]/25 transition hover:opacity-95"
        >
          <Sparkles className="h-4 w-4 shrink-0" />
          Services KYÔ DIGITAL
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-500 transition hover:bg-white/5 hover:text-zinc-300"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
