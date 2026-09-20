"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdSpecBuilder from "@/components/builder/AdSpecBuilder";

function BuilderRoute() {
  const specId = useSearchParams().get("id");
  if (!specId) return <div className="card card-body text-sm text-red-700">No ad selected. Go back to the Ad Library.</div>;
  return <AdSpecBuilder specId={specId} />;
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="card card-body text-sm text-ink-400">Loading…</div>}>
      <BuilderRoute />
    </Suspense>
  );
}
