"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Shop } from "@/types/shop";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardHome } from "./DashboardHome";
import { OnboardingChat } from "./onboarding/OnboardingChat";

type DashboardShellProps = {
  ownerId: string;
  userEmail: string;
};

export function DashboardShell({ ownerId, userEmail }: DashboardShellProps) {
  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isExitingOnboarding, setIsExitingOnboarding] = useState(false);

  const fetchShop = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("owner_id", ownerId)
      .maybeSingle();

    if (error) {
      console.error("[dashboard] shop fetch:", error.message);
    }

    setShop(data ?? null);
    setIsLoading(false);
  }, [ownerId]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  function handleOnboardingComplete(newShop: Shop) {
    setIsExitingOnboarding(true);
    setTimeout(() => {
      setShop(newShop);
      setShowCongratulations(true);
      setIsExitingOnboarding(false);
    }, 400);
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!shop) {
    return (
      <div
        className={`transition-opacity duration-400 ${
          isExitingOnboarding ? "opacity-0" : "opacity-100"
        }`}
      >
        <OnboardingChat ownerId={ownerId} onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-500 opacity-100">
      <DashboardHome
        shop={shop}
        userEmail={userEmail}
        showCongratulations={showCongratulations}
      />
    </div>
  );
}
