"use client";

export function KyoAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
  };

  const barHeights = ["h-2", "h-3.5", "h-2.5", "h-4"];

  return (
    <div className={`relative shrink-0 ${dimensions[size]}`}>
      <div className="absolute inset-0 animate-ping rounded-full bg-[#0055FF]/20" />
      <div className="absolute inset-1 animate-pulse rounded-full bg-[#7000FF]/15" />
      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#0055FF] to-[#7000FF] shadow-lg shadow-[#0055FF]/30 ${dimensions[size]}`}
      >
        <div className="flex items-end gap-0.5">
          {barHeights.map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-white/90 ${height}`}
              style={{
                animation: `kyo-wave 1s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
