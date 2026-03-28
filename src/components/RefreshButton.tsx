"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRefresh() {
    setLoading(true);
    try {
      await fetch("/api/revalidate", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 transition-colors text-sm font-medium cursor-pointer disabled:cursor-not-allowed"
    >
      {loading ? "Refreshing..." : "Refresh Points"}
    </button>
  );
}
