import { ReactNode } from "react";

export default function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={"scroll-mt-24 " + (className ?? "")}> 
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">{children}</div>
    </section>
  );
}
