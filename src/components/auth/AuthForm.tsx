import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm({
  defaultTab = "login",
  redirectTo = "/dashboard",
  onSuccess,
}: {
  defaultTab?: "login" | "signup";
  redirectTo?: string;
  onSuccess?: () => void;
}) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const finish = () => {
    onSuccess?.();
    void navigate({ to: redirectTo });
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back! Happy learning.");
    finish();
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (!data.session) {
      toast.success("Account created! Check your inbox to confirm your email, then sign in.");
      return;
    }
    toast.success("Namaste! Your study space is ready.");
    finish();
  };

  const fieldClass =
    "h-11 border-navy/15 bg-ivory-deep/60 text-ink placeholder:text-ink-muted/70 focus-visible:ring-saffron/60";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-navy/8 p-1">
        <TabsTrigger value="login" className="data-[state=active]:bg-navy data-[state=active]:text-ivory text-ink-muted">
          Sign in
        </TabsTrigger>
        <TabsTrigger value="signup" className="data-[state=active]:bg-navy data-[state=active]:text-ivory text-ink-muted">
          Create account
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form onSubmit={login} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-ink">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <Input id="login-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${fieldClass} pl-10`} placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-password" className="text-ink">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <Input id="login-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${fieldClass} pl-10`} placeholder="••••••••" />
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="animate-spin" />} Continue learning
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup">
        <form onSubmit={signup} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="signup-name" className="text-ink">Full name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <Input id="signup-name" required value={name} onChange={(e) => setName(e.target.value)} className={`${fieldClass} pl-10`} placeholder="Priya Sharma" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signup-email" className="text-ink">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <Input id="signup-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${fieldClass} pl-10`} placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signup-password" className="text-ink">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <Input id="signup-password" type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${fieldClass} pl-10`} placeholder="At least 6 characters" />
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="animate-spin" />} Start free trial
          </Button>
          <p className="text-center text-xs text-ink-muted">Free forever tier · No card required</p>
        </form>
      </TabsContent>
    </Tabs>
  );
}
