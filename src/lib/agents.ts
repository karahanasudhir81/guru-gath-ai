import aryaImg from "@/assets/agents/arya.jpg";
import bhashaImg from "@/assets/agents/bhasha.jpg";
import saraswatiImg from "@/assets/agents/saraswati.jpg";
import yuktiImg from "@/assets/agents/yukti.jpg";
import type { Database } from "@/integrations/supabase/types";

export type Agent = Database["public"]["Tables"]["agents"]["Row"];

export const AGENT_AVATARS: Record<string, string> = {
  arya: aryaImg,
  bhasha: bhashaImg,
  saraswati: saraswatiImg,
  yukti: yuktiImg,
};

export type AgentAccent = "saffron" | "teal" | "gold" | "indigo" | "lotus";

export const ACCENT_CLASSES: Record<AgentAccent, { ring: string; chip: string; dot: string; soft: string }> = {
  saffron: {
    ring: "ring-saffron/70",
    chip: "bg-saffron/15 text-saffron border-saffron/30",
    dot: "bg-saffron",
    soft: "from-saffron/25",
  },
  teal: {
    ring: "ring-teal/70",
    chip: "bg-teal/15 text-teal border-teal/30",
    dot: "bg-teal",
    soft: "from-teal/25",
  },
  gold: {
    ring: "ring-gold/70",
    chip: "bg-gold/15 text-gold border-gold/30",
    dot: "bg-gold",
    soft: "from-gold/25",
  },
  indigo: {
    ring: "ring-indigo-soft",
    chip: "bg-indigo-soft/40 text-ivory border-ivory/20",
    dot: "bg-indigo-soft",
    soft: "from-indigo-soft/60",
  },
  lotus: {
    ring: "ring-lotus/70",
    chip: "bg-lotus/15 text-lotus border-lotus/30",
    dot: "bg-lotus",
    soft: "from-lotus/25",
  },
};

export function accentOf(agent: Pick<Agent, "accent">): AgentAccent {
  return (["saffron", "teal", "gold", "indigo", "lotus"] as const).includes(agent.accent as AgentAccent)
    ? (agent.accent as AgentAccent)
    : "saffron";
}

export function agentAvatar(agent: Pick<Agent, "slug">): string | undefined {
  return AGENT_AVATARS[agent.slug];
}

/** Static copy used on the public landing page (no login needed). */
export const LANDING_AGENTS = [
  {
    slug: "arya",
    name: "Arya",
    tagline: "General Academic & STEM Tutor",
    blurb: "Patient, step-by-step problem solving for Maths, Physics, Chemistry and Biology.",
    accent: "saffron" as AgentAccent,
  },
  {
    slug: "bhasha",
    name: "Bhasha Coach",
    tagline: "Conversational Language & Speech",
    blurb: "Accent, vocabulary and phonetic guidance in English, Hindi and regional languages.",
    accent: "teal" as AgentAccent,
  },
  {
    slug: "saraswati",
    name: "Saraswati",
    tagline: "Humanities & Exam Prep Guide",
    blurb: "UPSC, Board exams and structured essay feedback with topper-style answers.",
    accent: "gold" as AgentAccent,
  },
  {
    slug: "yukti",
    name: "Yukti",
    tagline: "Logical Reasoning & Coding Mentor",
    blurb: "Algorithms, data structures, logic puzzles and interview practice.",
    accent: "indigo" as AgentAccent,
  },
];
