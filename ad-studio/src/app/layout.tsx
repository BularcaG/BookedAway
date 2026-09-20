import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookedAway Ad Console",
  description: "Build Facebook ad specs - campaign, ad set, creative, budgets and bid caps - then hand them off to be published through Meta's official MCP."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-ink-200/70 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">BA</span>
              <span className="text-sm font-semibold tracking-tight text-ink-900">
                BookedAway <span className="text-ink-400">Ad Console</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link href="/" className="btn-ghost">
                Ad Library
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-7">{children}</main>
      </body>
    </html>
  );
}
