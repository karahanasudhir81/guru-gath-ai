import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BrandMark, Toran } from "@/components/brand/Ornaments";
import { AuthForm } from "./AuthForm";

export function AuthDialog({
  open,
  onOpenChange,
  defaultTab = "login",
  redirectTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
  redirectTo?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-gold/40 bg-card p-0 text-card-foreground sm:max-w-md">
        <Toran />
        <div className="px-6 pb-6 pt-2">
          <DialogHeader className="items-center text-center">
            <BrandMark size={44} />
            <DialogTitle className="font-display text-3xl font-semibold text-navy-deep">
              {defaultTab === "signup" ? "Begin your journey" : "Welcome back"}
            </DialogTitle>
            <DialogDescription className="text-ink-muted">
              Your personal AI gurukul — four expert tutors, always available.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <AuthForm defaultTab={defaultTab} redirectTo={redirectTo} onSuccess={() => onOpenChange(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
