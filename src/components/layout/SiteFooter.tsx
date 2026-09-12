import { Globe } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "@/components/brand/Ornaments";
import { LANGUAGES, useLanguage, type LanguageCode } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SiteFooter() {
  const { lang, setLanguage } = useLanguage();
  return (
    <footer className="relative border-t border-border bg-navy-deep bg-jali">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark size={36} />
            <span className="font-display text-2xl font-semibold text-foreground">
              Vidya<span className="text-gradient-saffron">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A modern gurukul in your pocket. Four expert AI tutors, voice conversations, and a memory that grows with you.
          </p>
          <div className="mt-6">
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <Globe className="size-3.5" /> Language / भाषा
            </label>
            <Select
              value={lang}
              onValueChange={(v) => {
                setLanguage(v as LanguageCode);
                const m = LANGUAGES.find((l) => l.code === v);
                toast.success(`${m?.script}! Language set to ${m?.label}.`);
              }}
            >
              <SelectTrigger className="w-56 border-gold/40 bg-glass text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-gold/30 bg-popover text-popover-foreground">
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code} className="focus:bg-glass">
                    {l.native} · {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <FooterCol title="Tutors" links={["Arya · STEM", "Bhasha Coach · Languages", "Saraswati · Humanities", "Yukti · Coding"]} href="/#agents" />
        <FooterCol title="Product" links={["Features", "Pricing", "Session recording", "Voice AI"]} href="/#features" />
        <FooterCol title="Company" links={["About", "Careers", "Privacy", "Terms"]} href="/" />
      </div>
      <div className="divider-gold mx-auto max-w-7xl" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} VidyaAI · विद्या ददाति विनयम् — Knowledge bestows humility.</p>
        <p>Made with care in Bharat 🪷</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, href }: { title: string; links: string[]; href: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href={href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
