"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { GeneratorForm } from "@/components/generator-form";
import { PromptKitOutput } from "@/components/prompt-kit-output";
import { GenerationLoader } from "@/components/generation-loader";
import { ExportButton } from "@/components/export-button";
import type { PromptKit, ProjectInput } from "@/features/generator/generator.types";

interface ApiGenerateResponse {
  status: "success" | "error";
  data?: PromptKit;
  error?: string;
}

const CACHE_KEY = "promptra_cached_kit";

function PageHeading() {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-serif text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">
        Generate Your <span className="italic text-[#8C6A4A]">Prompt Kit</span>
      </h1>
      <p className="mt-3 text-base text-[#6B6457]">
        Describe your project and get a complete vibe coding prompt kit instantly.
      </p>
    </div>
  );
}

interface PostGenerationProps {
  readonly kit: PromptKit;
  readonly userId: string | null | undefined;
  readonly isLoading: boolean;
  readonly onClear: () => void;
  readonly onSubmit: (data: ProjectInput) => Promise<void>;
}

function PostGenerationView({ kit, userId, isLoading, onClear, onSubmit }: PostGenerationProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
      <div className="h-fit rounded-2xl border border-[#E2D9CF] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6457]">
            Regenerate
          </p>
          <button
            onClick={onClear}
            className="text-xs font-medium text-[#8C6A4A] transition-colors hover:text-[#111111] hover:underline"
          >
            Clear
          </button>
        </div>
        <GeneratorForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>

      <div className="animate-fade-in rounded-2xl border border-[#E2D9CF] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between border-b border-[#E2D9CF] pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-lg font-normal text-[#111111]">
              {kit.projectName}
            </h2>
            <span className="rounded-full bg-[#EDE5DA] px-3 py-0.5 text-xs font-medium text-[#8C6A4A]">
              {kit.projectType}
            </span>
          </div>
          <ExportButton kit={kit} projectName={kit.projectName} />
        </div>
        <PromptKitOutput kit={kit} isAuthenticated={!!userId} />
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const { userId } = useAuth();
  const [kit, setKit] = useState<PromptKit | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        setKit(JSON.parse(cached));
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }
  }, []);

  async function handleSubmit(data: ProjectInput): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await response.json()) as ApiGenerateResponse;
      if (json.status === "success" && json.data) {
        setKit(json.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(json.data));
      } else {
        toast.error(json.error ?? "Generation failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearCache(): void {
    localStorage.removeItem(CACHE_KEY);
    setKit(null);
  }

  return (
    <main className="min-h-screen bg-[#F7F4F0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeading />
        {isLoading ? (
          <div className="mx-auto w-full max-w-md">
            <GenerationLoader />
          </div>
        ) : kit === null ? (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-[#E2D9CF] bg-white p-8 shadow-sm">
              <GeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <PostGenerationView
            kit={kit}
            userId={userId}
            isLoading={isLoading}
            onClear={handleClearCache}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}
