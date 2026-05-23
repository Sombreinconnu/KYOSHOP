"use client";

import { KyoAvatar } from "./KyoAvatar";

export function MagicLoader() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <KyoAvatar size="lg" />
      <p className="text-center text-sm font-medium text-zinc-700">
        Laisse-moi faire un peu de magie... 🪄
      </p>
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i % 2 === 0 ? "bg-[#0055FF]" : "bg-emerald-500"
            }`}
            style={{
              animation: `magic-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full origin-left animate-[loading-bar_3s_ease-in-out_forwards] rounded-full bg-gradient-to-r from-[#0055FF] via-emerald-500 to-[#7000FF]" />
      </div>
    </div>
  );
}
