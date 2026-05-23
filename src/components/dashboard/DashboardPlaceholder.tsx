type DashboardPlaceholderProps = {
  title: string;
  description: string;
};

export function DashboardPlaceholder({
  title,
  description,
}: DashboardPlaceholderProps) {
  return (
    <main className="p-8 lg:p-10">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
        <p className="mt-2 text-zinc-600">{description}</p>
      </div>
    </main>
  );
}
