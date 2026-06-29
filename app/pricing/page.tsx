"use client";

// app/pricing/page.tsx — Plan comparison: Free vs Pro — warm design system

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { PricingCard } from "@/components/pricing-card";

const FREE_FEATURES = [
  "1 foundation prompt kit",
  "Project map + file structure",
  "6–8 ordered build steps",
  "Basic tech stack support",
] as const;

const PRO_FEATURES = [
  "Everything in Free",
  "8 follow-up prompts per kit",
  "Debug + optimize + deploy prompts",
  "Security hardening prompts",
  "Priority generation speed",
] as const;

export default function PricingPage() {
  const router = useRouter();
  const { userId } = useAuth();

  function handleFreeClick(): void {
    router.push("/generate");
  }

  function handleProClick(): void {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    toast.info("Checkout coming soon! We'll notify you when Pro launches.");
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="font-serif text-5xl font-normal tracking-tight text-[var(--text-primary)] sm:text-6xl">
            Simple,{" "}
            <span className="italic text-[var(--accent)]">Honest</span>{" "}
            Pricing
          </h1>
          <p className="mt-4 text-base text-[var(--text-muted)]">
            Start free. Upgrade when you need more firepower.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <PricingCard
            name="Free"
            price="Free"
            description="Everything you need to generate your first production-grade prompt kit."
            features={FREE_FEATURES}
            isHighlighted={false}
            ctaLabel="Start Free"
            onCtaClick={handleFreeClick}
          />
          <PricingCard
            name="Pro"
            price="₹149"
            description="Unlock the full prompt kit — from debugging to deployment, all in one place."
            features={PRO_FEATURES}
            isHighlighted={true}
            ctaLabel="Upgrade to Pro"
            onCtaClick={handleProClick}
          />
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-[var(--text-muted)]">
          All prices in INR · Cancel anytime · No hidden fees
        </p>
      </div>
    </main>
  );
}
