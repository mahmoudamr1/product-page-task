// components/Providers.tsx
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Default retry attempts
      staleTime: 5 * 60 * 1000, // 5 minutes default stale time
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  try {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  } catch (error) {
    console.error("Failed to initialize QueryClientProvider:", error);
    return <div>Error initializing QueryClientProvider</div>; // Fallback UI
  }
}