import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Dumbbell, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlanStatus, daysUntil } from "@/components/PlanStatus";
import { brl, fmtDate, getPlan } from "@/lib/gym-data";

export const Route = createFileRoute("/plano/")({
  head: () => ({
    meta: [
      { title: "Meu plano — FORJA Academia" },
      { name: "description", content: "Veja seu plano, vencimento, valor e modalidades incluídas." },
      { property: "og:title", content: "Meu plano — FORJA Academia" },
      { property: "og:description", content: "Veja seu plano, vencimento, valor e modalidades incluídas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  return (
    <AppShell title="Plano">
      {(user) => {
        const plan = getPlan(user.plan);
        const left = daysUntil(user.planEnd);
        const totalDays = Math.max(1, daysUntil(user.planEnd, new Date(user.planStart + "T12:00:00")));
        const pct = Math.min(100, Math.max(0, ((totalDays - left) / totalDays) * 100));
        return (
          <div className="px-5 pb-10 pt-6">
            <Link to="/plano/detalhes" className="block overflow-hidden rounded-3xl border border-border bg-card bg-card-glow p-5 shadow-card transition active:scale-[0.99] hover:border-primary/50">
              <div className="flex items-center justify-between">
                <PlanStatus status={user.planStatus} />
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-3 font-display text-4xl leading-none tracking-wide">{plan.name}</p>
              <div className="mt-4 space-y-2 text-sm">
                <Row label="Vencimento" value={fmtDate(user.planEnd)} />
                <Row label="Valor mensal" value={brl(plan.monthly)} />
              </div>
              {user.planStatus === "ativo" && (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {left >= 0 ? `Faltam ${left} dias para o vencimento` : "Plano vencido"}
                  </p>
                </div>
              )}
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Modalidades</p>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-surface p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary"><Dumbbell className="h-5 w-5" /></span>
                  <div>
                    <p className="font-semibold">Musculação</p>
                    <p className="text-xs text-muted-foreground">Dias e horários livres</p>
                  </div>
                </div>
              </div>
            </Link>

            {left >= 0 && left <= 10 && user.planStatus === "ativo" && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/50 bg-accent/60 p-4 text-sm">
                <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                Seu plano vence em breve. Renove agora e não perca nenhum treino.
              </div>
            )}
          </div>
        );
      }}
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
