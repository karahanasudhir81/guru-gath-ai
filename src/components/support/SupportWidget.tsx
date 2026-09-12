import { useState } from "react";
import { LifeBuoy, Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toran } from "@/components/brand/Ornaments";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "feedback", label: "Platform feedback" },
  { value: "human_tutor", label: "Talk to a human tutor" },
  { value: "billing", label: "Billing & plans" },
  { value: "bug", label: "Something is broken" },
];

export function SupportWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("feedback");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = user?.email ?? email;
    if (!finalEmail) return toast.error("Please add an email so we can reply.");
    if (message.trim().length < 5) return toast.error("Tell us a little more.");
    setBusy(true);
    const { error } = await supabase.from("support_tickets").insert({
      user_id: user?.id ?? null,
      email: finalEmail,
      category,
      message: message.trim(),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Dhanyavaad! Our team will reply within 24 hours.");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <form
          onSubmit={submit}
          className="w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-gold/40 bg-card text-card-foreground shadow-card animate-fade-up"
        >
          <Toran />
          <div className="flex items-start justify-between px-5 pt-3">
            <div>
              <h3 className="font-display text-2xl font-semibold text-navy-deep">Live help</h3>
              <p className="text-xs text-ink-muted">Feedback, or a human when you need one.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1 text-ink-muted hover:bg-navy/5">
              <X className="size-4" />
            </button>
          </div>
          <div className="space-y-3 px-5 pb-5 pt-4">
            {!user && (
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-navy/15 bg-ivory-deep/60 text-ink placeholder:text-ink-muted/70"
              />
            )}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-navy/15 bg-ivory-deep/60 text-ink">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-gold/30 bg-popover text-popover-foreground">
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value} className="focus:bg-glass">
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              rows={4}
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none border-navy/15 bg-ivory-deep/60 text-ink placeholder:text-ink-muted/70"
            />
            <Button type="submit" variant="hero" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : <Send />} Send message
            </Button>
          </div>
        </form>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Live help"
        className={cn(
          "relative flex size-14 items-center justify-center rounded-full bg-gradient-saffron text-navy-deep shadow-glow transition hover:scale-105",
        )}
      >
        {!open && <span className="absolute inset-0 rounded-full bg-saffron/50 animate-pulse-ring" />}
        {open ? <X className="relative size-6" /> : <LifeBuoy className="relative size-6" />}
      </button>
    </div>
  );
}
