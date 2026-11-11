import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "@/assets/gym-login-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORJA Academia — Entre ou crie sua conta" },
      { name: "description", content: "Acesse seus treinos, avaliações físicas e plano na FORJA Academia." },
      { property: "og:title", content: "FORJA Academia — Entre ou crie sua conta" },
      { property: "og:description", content: "Acesse seus treinos, avaliações físicas e plano na FORJA Academia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

export function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <Dumbbell className="h-5 w-5" />
      </span>
      <span className="font-display text-4xl tracking-[0.2em]">FORJA</span>
    </div>
  );
}

function Welcome() {
  return (
    <div className="relative h-full overflow-hidden">
      <img src={bg} alt="Interior de academia" width={768} height={1344} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative flex h-full flex-col justify-between px-7 pb-10 pt-12">
        <Brand />
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">App do aluno</p>
          <h1 className="mt-2 font-display text-6xl leading-[0.9] tracking-wide">
            Forje sua
            <br />
            melhor versão
          </h1>
          <p className="mt-4 max-w-[18rem] text-muted-foreground">
            Seus treinos, avaliações e plano na palma da mão.
          </p>
          <div className="mt-8 grid gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/cadastro">Criar conta</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
