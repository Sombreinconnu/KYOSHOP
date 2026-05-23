import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="p-8 lg:p-10">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(0,85,255,0.06)] backdrop-blur-md">
        <p className="text-xs font-medium uppercase tracking-wider text-[#0055FF]">
          Espace vendeur
        </p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
          Bienvenue sur votre tableau de bord
        </h1>
        <p className="mt-4 text-zinc-600">
          Connecté en tant que{" "}
          <span className="font-semibold text-zinc-900">{user.email}</span>
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Votre session est active. Vous pouvez commencer à configurer votre boutique.
        </p>
      </div>
    </main>
  );
}
