import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import { BrandMark, Mandala, Toran } from "@/components/brand/Ornaments";

const searchSchema = z.object({
  tab: z.enum(["login", "signup"]).optional(),
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — VidyaAI Tutor" },
      { name: "description", content: "Sign in or create your free VidyaAI account to start learning with voice-enabled AI tutors." },
      { property: "og:title", content: "Sign in — VidyaAI Tutor" },
      { property: "og:description", content: "Create your free VidyaAI account and meet your AI tutors." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { tab, redirect } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const target = redirect && redirect.startsWith("/") ? redirect : "/dashboard";

  useEffect(() => {
    if (!loading && user) void navigate({ to: target });
  }, [user, loading, navigate, target]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-hero bg-jali px-4 py-12">
      <Mandala className="absolute -left-52 -top-40 size-[40rem] opacity-[0.08] animate-spin-slow" />
      <Mandala className="absolute -bottom-60 -right-40 size-[40rem] opacity-[0.06]" />
      <Link to="/" className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="size-4" /> Back home
      </Link>
      <div className="relative w-full max-w-md animate-fade-up">
        <div className="gold-trim overflow-hidden rounded-3xl bg-card text-card-foreground shadow-card">
          <Toran />
          <div className="px-7 pb-8 pt-4 text-center">
            <BrandMark size={52} className="mx-auto" />
            <h1 className="mt-2 font-display text-4xl font-semibold text-navy-deep">
              {tab === "signup" ? "Begin your journey" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">Your personal AI gurukul — four expert tutors, always available.</p>
            <div className="mt-6 text-left">
              <AuthForm defaultTab={tab ?? "login"} redirectTo={target} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
