import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GradientCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-violet-500", className)}>
      <div className="rounded-2xl bg-gradient-to-b from-white to-white/60 dark:from-white/5 dark:to-white/5 p-6">
        {children}
      </div>
    </div>
  );
}
