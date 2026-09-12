import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AudioLines, Check, Clock, FileAudio, Languages, Library, Plus, ScanText, Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SectionHeading, Mandala } from "@/components/brand/Ornaments";
import { AGENT_AVATARS, ACCENT_CLASSES, LANDING_AGENTS } from "@/lib/agents";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export function AgentsShowcase() {
  const { user } = useAuth();
  return (
    <section id="agents" className="relative scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Multi-agent ecosystem"
          title="Four tutors. One gurukul."
          subtitle="Each agent has its own personality, teaching style and specialised context — switch anytime inside the tutor hub."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_AGENTS.map((a, i) => {
            const acc = ACCENT_CLASSES[a.accent];
            return (
              <article
                key={a.slug}
                className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-card-ivory p-6 text-card-foreground shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-gold animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className={cn("absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent", acc.soft)} />
                <img
                  src={AGENT_AVATARS[a.slug]}
                  alt={`${a.name} avatar`}
                  width={112}
                  height={112}
                  loading="lazy"
                  className={cn("relative mx-auto size-28 rounded-full ring-4 ring-offset-2 ring-offset-ivory transition group-hover:scale-105", acc.ring)}
                />
                <h3 className="relative mt-5 text-center font-display text-3xl font-semibold text-navy-deep">{a.name}</h3>
                <p className={cn("relative mx-auto mt-2 w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider", acc.chip)}>
                  {a.tagline}
                </p>
                <p className="relative mt-4 text-center text-sm leading-relaxed text-ink-muted">{a.blurb}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Link
            to={user ? "/dashboard" : "/auth"}
            className="group inline-flex items-center gap-2 rounded-full border border-dashed border-gold/50 px-5 py-2.5 text-sm text-gold transition hover:bg-gold/10"
          >
            <Plus className="size-4 transition group-hover:rotate-90" /> Add your own custom AI agent
          </Link>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: AudioLines,
    title: "Voice AI, both ways",
    text: "Speak your doubt with the microphone and hear the answer read aloud — natural conversation, hands-free.",
  },
  {
    icon: Clock,
    title: "24/7 agent availability",
    text: "Late-night revision or early-morning doubt — every tutor is awake, patient and ready.",
  },
  {
    icon: Library,
    title: "Multi-subject mastery",
    text: "Maths to Polity, Python to phonetics. Board exams, JEE, NEET, UPSC and beyond.",
  },
  {
    icon: FileAudio,
    title: "Session recording",
    text: "Record conversations, save AI-written summaries, and download transcripts as TXT or PDF.",
  },
  {
    icon: Languages,
    title: "Native language support",
    text: "Learn in Hindi, Tamil, Telugu, Bengali or English — the tutor adapts to how you speak.",
  },
  {
    icon: ScanText,
    title: "Upload & analyse",
    text: "Drop in notes, PDF worksheets or photos of handwritten maths — formulas are read and solved.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 overflow-hidden bg-navy-deep bg-jali py-24">
      <Mandala className="absolute -right-48 -bottom-48 size-[36rem] opacity-[0.07]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why students love it"
          title="Built for the way India studies"
          subtitle="Warm, rigorous and always in your language — a high-performance tutor that feels like a mentor."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass group rounded-2xl p-6 transition duration-300 hover:border-gold/60 hover:bg-ivory/10 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-saffron text-navy-deep shadow-glow transition group-hover:scale-110">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1"><Sigma className="size-3.5 text-gold" /> LaTeX & Greek symbol palette</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">₹ Indian notation & currency</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">Flashcards & progress memory</span>
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Free Trial",
    monthly: 0,
    annual: 0,
    blurb: "Taste the gurukul.",
    features: ["20 tutor messages / day", "All 4 tutors", "Voice input", "Basic session memory"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro Student",
    monthly: 15,
    annual: 12,
    blurb: "For serious daily study.",
    features: ["Unlimited conversations", "Voice in & out", "Session recording + PDF export", "File & image analysis (OCR)", "Flashcards & progress tracking"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Master Scholar",
    monthly: 29,
    annual: 23,
    blurb: "Exam-year power mode.",
    features: ["Everything in Pro", "Custom AI agents", "Priority fast responses", "Essay & answer-writing rubrics", "Human mentor check-ins"],
    cta: "Become a Scholar",
    featured: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { user } = useAuth();
  return (
    <section id="pricing" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Pricing" title="Simple plans for every learner" subtitle="Start free. Upgrade when you're ready — cancel anytime." />
        <div className="mt-8 flex items-center justify-center gap-3 text-sm">
          <span className={cn(!annual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
          <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" className="data-[state=checked]:bg-saffron" />
          <span className={cn(annual ? "text-foreground" : "text-muted-foreground")}>
            Annual <span className="ml-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">save 20%</span>
          </span>
        </div>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1",
                p.featured
                  ? "gold-trim bg-gradient-card-ivory text-card-foreground shadow-glow lg:-my-4 lg:py-11"
                  : "glass text-foreground",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-saffron px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-deep shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className={cn("font-display text-3xl font-semibold", p.featured ? "text-navy-deep" : "text-foreground")}>{p.name}</h3>
              <p className={cn("mt-1 text-sm", p.featured ? "text-ink-muted" : "text-muted-foreground")}>{p.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className={cn("font-display text-6xl font-semibold leading-none", p.featured ? "text-navy-deep" : "text-gold")}>
                  ${annual ? p.annual : p.monthly}
                </span>
                <span className={cn("mb-1 text-sm", p.featured ? "text-ink-muted" : "text-muted-foreground")}>/mo</span>
              </div>
              {annual && p.monthly > 0 && (
                <p className={cn("mt-1 text-xs", p.featured ? "text-ink-muted" : "text-muted-foreground")}>billed ${p.annual * 12} yearly</p>
              )}
              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={cn("flex items-start gap-2.5 text-sm", p.featured ? "text-ink" : "text-foreground/90")}>
                    <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", p.featured ? "bg-saffron/20 text-saffron-deep" : "bg-gold/15 text-gold")}>
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.featured ? "hero" : "gold"} size="lg" className="mt-8 w-full">
                <Link to={user ? "/dashboard" : "/auth"} search={user ? undefined : { tab: "signup" }}>
                  {p.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="gold-trim relative overflow-hidden rounded-3xl bg-gradient-card-ivory p-10 text-center text-card-foreground md:p-16">
          <Mandala className="absolute -left-32 -top-32 size-[28rem] opacity-[0.08]" />
          <Mandala className="absolute -bottom-40 -right-32 size-[28rem] opacity-[0.08]" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-saffron-deep">Shubhaarambh — an auspicious beginning</p>
          <h2 className="relative mt-3 font-display text-4xl font-semibold text-navy-deep md:text-5xl">Your first lesson is one click away.</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-ink-muted">Ask a doubt by voice, upload a worksheet, or just say namaste. Arya is waiting.</p>
          <Button asChild variant="hero" size="xl" className="relative mt-8">
            <Link to={user ? "/tutor" : "/auth"} search={user ? undefined : { tab: "signup" }}>Try Interactive Tutor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
