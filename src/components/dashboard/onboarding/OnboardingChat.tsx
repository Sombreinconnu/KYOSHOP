"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  pickColorAccent,
  slugify,
  withUniqueSlugSuffix,
} from "@/lib/shop/utils";
import type { Shop } from "@/types/shop";
import { KyoAvatar } from "./KyoAvatar";
import { ChatMessage } from "./ChatMessage";
import { MagicLoader } from "./MagicLoader";

type ChatStep = "name" | "category" | "creating";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type OnboardingChatProps = {
  ownerId: string;
  onComplete: (shop: Shop) => void;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Salut ! Je suis ton assistant KYÔ. Prêt à lancer ton business en 1 minute ? Comment s'appelle ta future boutique ?",
};

export function OnboardingChat({ ownerId, onComplete }: OnboardingChatProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [step, setStep] = useState<ChatStep>("name");
  const [input, setInput] = useState("");
  const [shopName, setShopName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, step, scrollToBottom]);

  const createShop = useCallback(
    async (name: string, description: string) => {
      const supabase = createClient();
      const baseSlug = slugify(name) || "ma-boutique";
      const color_accent = pickColorAccent(description);

      let slug = baseSlug;
      let attempt = 0;

      while (attempt < 3) {
        const { data, error: insertError } = await supabase
          .from("shops")
          .insert({
            owner_id: ownerId,
            name: name.trim(),
            slug,
            color_accent,
            description: description.trim(),
          })
          .select()
          .single();

        if (!insertError && data) {
          return data as Shop;
        }

        if (insertError?.code === "23505") {
          slug = withUniqueSlugSuffix(baseSlug);
          attempt += 1;
          continue;
        }

        throw new Error(
          insertError?.message ?? "Impossible de créer la boutique."
        );
      }

      throw new Error("Ce nom de boutique est déjà pris. Réessayez.");
    },
    [ownerId]
  );

  const runMagicSequence = useCallback(
    async (name: string, description: string) => {
      setStep("creating");
      setError(null);

      const magicMessage: Message = {
        id: "magic",
        role: "assistant",
        content: "Laisse-moi faire un peu de magie... 🪄",
      };
      setMessages((prev) => [...prev, magicMessage]);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const shop = await createShop(name, description);
        onComplete(shop);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue.";
        setError(message);
        setStep("category");
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== "magic"),
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: `Oups, quelque chose s'est mal passé : ${message}. Peux-tu réessayer de décrire ce que tu vends ?`,
          },
        ]);
      }
    },
    [createShop, onComplete]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || isSubmitting || step === "creating") return;

    setIsSubmitting(true);
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: value,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (step === "name") {
      setShopName(value);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-category-${Date.now()}`,
          role: "assistant",
          content:
            "Superbe nom ! Raconte-moi en quelques mots ce que tu vends (parfums, vêtements, nourriture...) ?",
        },
      ]);
      setStep("category");
      setIsSubmitting(false);
      return;
    }

    if (step === "category") {
      await runMagicSequence(shopName, value);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 lg:p-8">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-[0_16px_48px_rgba(0,85,255,0.12)] backdrop-blur-lg">
        <header className="flex items-center gap-3 border-b border-white/30 bg-white/50 px-5 py-4 backdrop-blur-md">
          <KyoAvatar size="md" />
          <div>
            <p className="text-sm font-semibold text-zinc-900">Assistant KYÔ</p>
            <p className="text-xs text-emerald-600">En ligne</p>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex max-h-[min(420px,50vh)] flex-col gap-4 overflow-y-auto px-4 py-5"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}
          {step === "creating" && <MagicLoader />}
        </div>

        {error && step !== "creating" && (
          <p className="mx-4 mb-2 rounded-xl border border-red-200/80 bg-red-50/90 px-3 py-2 text-xs text-red-600">
            {error}
          </p>
        )}

        {step !== "creating" && (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-white/30 bg-white/60 p-4 backdrop-blur-md"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSubmitting}
              placeholder={
                step === "name"
                  ? "Ex : Amina Cosmétiques"
                  : "Ex : parfums et soins de peau"
              }
              className="flex-1 rounded-2xl border border-zinc-200/80 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#0055FF]/40 focus:ring-2 focus:ring-[#0055FF]/15 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSubmitting}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0055FF] to-[#7000FF] text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
