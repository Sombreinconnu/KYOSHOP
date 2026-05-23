import { KyoAvatar } from "./KyoAvatar";

type ChatMessageProps = {
  role: "assistant" | "user";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && <KyoAvatar size="sm" />}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isAssistant
            ? "rounded-tl-md border border-white/40 bg-white/90 text-zinc-800"
            : "rounded-tr-md bg-gradient-to-r from-[#0055FF] to-[#7000FF] text-white"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
