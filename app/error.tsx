"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="text-red-400" size={22} />
        </div>

        <h2 className="text-lg font-semibold text-zinc-100">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Failed to load data. Please try again.
        </p>

        {/* Debug only (optional) */}
        {process.env.NODE_ENV === "development" && (
          <p className="mt-3 text-xs text-red-400 break-all">{error.message}</p>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition"
          >
            <RefreshCcw size={16} />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
