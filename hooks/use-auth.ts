"use client";

import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

interface User {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  primaryAddress?: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function authenticate() {
      try {
        // Make authenticated request to your API
        console.log("fetching user");
        const res = await sdk.quickAuth.fetch("/api/auth/me");

        if (!res.ok) {
          throw new Error(`Authentication failed: ${res.status}`);
        }

        const userData = await res.json();
        setUser(userData);

        // Hide splash screen once authenticated
        await sdk.actions.ready();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Authentication failed")
        );
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    }

    authenticate();
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
}
