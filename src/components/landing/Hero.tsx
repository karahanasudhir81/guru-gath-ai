import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mic, Play, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioWave, Mandala, Toran } from "@/components/brand/Ornaments";
import { AGENT_AVATARS } from "@/lib/agents";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";

const DEMO_TURNS = [
  { role: "user", text: "Arya, why does ice float on water?" },
  {
    role: "assistant",
    text: "Lovely question! **Step 1:** when water freezes, hydrogen bonds lock molecules into a hexagonal lattice. **Step 2:** that lattice has more empty space, so ice is about 9% less dense (≈ 0.917 g/cm³). **Step 3:** by Archimedes' principle, lower density ⇒ it floats. Quick check: what would happen to lakes in winter if ice sank?",
  },
  { role: "user", text: "Fish would freeze! So ice insulates the water below?" },
  { role: "assistant", text: "Exactly — शाबाश! The ice layer insulates, keeping liquid water at ~4 °C underneath. That's why aquatic life survives Kashmir winters. Ready for a numerical on density next?" },
];

function LiveDemoPreview() {
  const [visible, setVisible] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        for (let i = 1; i <= DEMO_TURNS.length; i++) {
          if (cancelled) return;
          setVisible(i);
          if (i < DEMO_TURNS.length && DEMO_TURNS[i]?.role === "assistant") {
            setTyping(true);
            await new Promise((r) => setTimeout(r, 1400));
            setTyping(false);
          } else {
            await new Promise((r) => setTimeout(r, 2200));
          }
        }
        await new Promise((r) => setTimeout(r, 3500));
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-saffron/25 via-transparent to-gold/15 blur-2xl" />
      <div className="gold-trim overflow-hidden rounded-3xl bg-card text-card-foreground shadow-card">
        <Toran />
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3">
          <div className="flex items-center gap-3">
            <img src={AGENT_AVATARS["arya"]} alt="Arya" width={40} height={40} className="size-10 rounded-full ring-2 ring-gold/60" />
            <div>
              <p className="text-sm font-semibold text-navy-deep">Arya · STEM Tutor</p>
              <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="size-1.5 rounded-full bg-teal" /> Live · listening in English & हिन्दी
              </p>
            </div>
          </div>
          <span className="rounded-full border border-saffron/40 bg-saffron/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-saffron-deep">
            Demo
          </span>
        </div>
        <div className="relative min-h-[300px] space-y-3 px-5 py-4 bg-jali-ink">
          <Mandala className="absolute -right-20 -top-16 size-72 opacity-[0.07]" />
          {DEMO_TURNS.slice(0, visible).map((t, i) => (
            <div key={i} className={`flex animate-fade-up ${t.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={
                  t.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-br-md bg-navy px-4 py-2.5 text-sm text-ivory"
                    : "max-w-[88%] rounded-2xl rounded-bl-md border border-gold/30 bg-ivory px-4 py-2.5 text-sm text-ink"
                }
                dangerouslySetInnerHTML={{ __html: t.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
              />
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gold/30 bg-ivory px-4 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-saffron [animation-delay:0ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-saffron [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-saffron [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-navy/10 bg-ivory-deep/70 px-5 py-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-saffron text-navy-deep shadow-glow">
            <Mic className="size-4" />
          </span>
          <AudioWave bars={28} className="flex-1" />
          <span className="text-xs font-medium text-ink-muted">0:42</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { meta } = useLanguage();
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden bg-gradient-hero bg-jali">
      <Mandala className="absolute -left-40 top-24 size-[38rem] opacity-[0.08] animate-spin-slow" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 md:grid-cols-[1.05fr_1fr] md:pt-24">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-glass px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold">
            <Sparkle className="size-3.5" />
            {meta.script} · {meta.greeting} to your AI gurukul
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] text-foreground md:text-7xl">
            Learn with a tutor who <span className="text-gradient-saffron italic">listens</span>, speaks, and remembers.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Four specialised AI tutors — Arya, Bhasha Coach, Saraswati and Yukti — for STEM, languages, exam prep and coding.
            Talk in English or your mother tongue, upload worksheets, and keep every session in your study memory.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to={user ? "/tutor" : "/auth"} search={user ? undefined : { tab: "signup" }}>
                Try Interactive Tutor <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="gold" size="xl">
              <a href="#agents">
                <Play /> Meet the tutors
              </a>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ["24/7", "Always available"],
              ["5", "Indian languages"],
              ["40+", "Subjects & exams"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold text-gold">{v}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="animate-fade-up [animation-delay:150ms]">
          <LiveDemoPreview />
        </div>
      </div>
    </section>
  );
}
