import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, MessageSquareText, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "@/components/brand/Ornaments";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Tutors", href: "/#agents" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  const name = (user.user_metadata?.["full_name"] as string | undefined) || user.email || "Student";
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full ring-2 ring-gold/50 transition hover:ring-saffron focus:outline-none" aria-label="Open profile menu">
          <Avatar className="size-9">
            <AvatarFallback className="bg-gradient-saffron font-semibold text-navy-deep">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-gold/30 bg-popover text-popover-foreground">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })} className="gap-2 focus:bg-glass">
          <LayoutDashboard className="size-4" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: "/tutor" })} className="gap-2 focus:bg-glass">
          <MessageSquareText className="size-4" /> Tutor hub
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            void navigate({ to: "/" });
          }}
          className="gap-2 text-saffron focus:bg-glass focus:text-saffron"
        >
          <LogOut className="size-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader({ className }: { className?: string }) {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  const openAuth = (t: "login" | "signup") => {
    setTab(t);
    setAuthOpen(true);
  };

  return (
    <header className={cn("sticky top-0 z-40 w-full", className)}>
      <div className="glass-strong mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <BrandMark size={34} />
          <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
            Vidya<span className="text-gradient-saffron">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="size-9 animate-pulse rounded-full bg-glass" />
          ) : user ? (
            <>
              <Button asChild variant="gold" size="sm">
                <Link to="/tutor">Open tutor</Link>
              </Button>
              <UserMenu />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => openAuth("login")}>
                Sign in
              </Button>
              <Button variant="hero" size="sm" onClick={() => openAuth("signup")}>
                Start free
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-gold/30 bg-navy-deep text-foreground">
            <div className="mt-8 flex flex-col gap-5">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="text-lg font-medium text-muted-foreground hover:text-gold">
                  {n.label}
                </a>
              ))}
              <div className="divider-gold" />
              {user ? (
                <>
                  <Button asChild variant="gold">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="hero">
                    <Link to="/tutor">Open tutor</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="gold" onClick={() => openAuth("login")}>
                    Sign in
                  </Button>
                  <Button variant="hero" onClick={() => openAuth("signup")}>
                    Start free
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} defaultTab={tab} />
    </header>
  );
}
