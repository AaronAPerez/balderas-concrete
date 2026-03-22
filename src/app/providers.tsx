"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Creates a QueryClient with performance-optimized defaults
 *
 * Configuration rationale:
 * - staleTime: 60s - Reduces unnecessary network requests for mostly-static content
 * - gcTime: 10 minutes - Keeps cached data available for back navigation
 * - refetchOnWindowFocus: false - Prevents layout shifts from unexpected refetches
 * - refetchOnMount: false - Uses cached data when components remount
 * - retry: 1 - Quick failure for better UX, prevents blocking UI
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds
        // Reduces re-fetching for static/semi-static data
        staleTime: 60 * 1000,
        // Keep unused data in cache for 10 minutes
        // Improves back/forward navigation experience
        gcTime: 10 * 60 * 1000,
        // Disable automatic refetch on window focus
        // Prevents unnecessary network requests and potential CLS
        refetchOnWindowFocus: false,
        // Don't refetch when component remounts if data exists
        refetchOnMount: false,
        // Only retry once to fail fast
        retry: 1,
        // Retry after 1 second
        retryDelay: 1000,
      },
      mutations: {
        // Don't retry mutations by default
        retry: 0,
      },
    },
  });
}

/**
 * Global providers wrapper
 * Includes React Query for server state management
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient once and reuse across re-renders
  // Using useState ensures the client persists across re-renders
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
