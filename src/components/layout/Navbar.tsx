import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="bg-gradient-to-r from-[#0055FF] to-[#7000FF] bg-clip-text text-lg font-bold tracking-tight text-transparent"
        >
          KYÔ SHOP
        </Link>
        <span className="hidden text-xs font-medium uppercase tracking-widest text-zinc-400 sm:inline">
          Social Commerce
        </span>
      </nav>
    </header>
  );
}
