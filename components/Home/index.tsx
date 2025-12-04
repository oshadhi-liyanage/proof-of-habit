"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user, loading, error, isAuthenticated } = useAuth();

  const { address } = useAccount();

  return (
    <div className="bg-white text-black flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-lg text-muted-foreground">
          {isAuthenticated ? "You are authenticated!" : "Not authenticated"}
        </p>
        <p className="text-lg text-muted-foreground">
          {address
            ? `${address.substring(0, 6)}...${address.substring(
                address.length - 4
              )}`
            : "No address found"}
        </p>
        <p className="text-lg text-muted-foreground">
          {isAuthenticated ? "You are authenticated!" : "Not authenticated"}
        </p>
      </div>
    </div>
  );
}
