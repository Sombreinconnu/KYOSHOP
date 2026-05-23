"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Store } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        router.push("/dashboard");
        router.refresh();
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setMessage("Vérifiez votre boîte mail pour confirmer votre compte.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_8px_32px_rgba(0,85,255,0.08)] backdrop-blur-md">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0055FF] to-[#7000FF] text-white shadow-lg shadow-[#0055FF]/25">
          <Store className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {mode === "signin" ? "Connexion vendeur" : "Créer un compte"}
          </p>
          <p className="text-xs text-zinc-500">Accès à votre espace boutique</p>
        </div>
      </div>

      <div className="mb-6 flex rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-1">
        <button
          type="button"
          disabled={loading}
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all disabled:opacity-50 ${
            mode === "signin"
              ? "bg-white text-[#0055FF] shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Connexion
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all disabled:opacity-50 ${
            mode === "signup"
              ? "bg-white text-[#7000FF] shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Inscription
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-zinc-600">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              id="email"
              type="email"
              required
              disabled={loading}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="w-full rounded-xl border border-zinc-200/80 bg-white/90 py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-[#0055FF]/50 focus:ring-2 focus:ring-[#0055FF]/20 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-zinc-600">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200/80 bg-white/90 py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-[#7000FF]/50 focus:ring-2 focus:ring-[#7000FF]/20 disabled:opacity-60"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200/80 bg-red-50/80 px-3 py-2 text-xs text-red-600">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0055FF] to-[#7000FF] py-3 text-sm font-semibold text-white shadow-lg shadow-[#0055FF]/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{mode === "signin" ? "Connexion…" : "Création…"}</span>
            </>
          ) : mode === "signin" ? (
            "Se connecter"
          ) : (
            "Créer mon compte"
          )}
        </button>
      </form>
    </div>
  );
}
