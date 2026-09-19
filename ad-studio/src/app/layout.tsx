import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookedAway Ad Studio",
  description: "Create Facebook & Instagram ad creatives from your product photos, then hand them to Claude to publish via Meta's official Ads MCP."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
