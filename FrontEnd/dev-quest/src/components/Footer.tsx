import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

import Link from "next/link";
const columns = [
  {
    title: "Produto",
    links: ["Recursos", "Integrações", "Preços", "Novidades"],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Carreiras", "Blog", "Contato"],
  },
  {
    title: "Suporte",
    links: ["Central de ajuda", "Documentação", "Status", "Comunidade"],
  },
];

const socials = [
  { label: "GitHub", icon: FaGithub },
  { label: "LinkedIn", icon: FaLinkedin },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-violet/25 bg-card/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[680px] -translate-x-1/2 rounded-full bg-brand-violet/25 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src= "/icon/LogoSemFundo.png"
                alt="Logo DevQuest"
                className="h-9 w-9 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">
                Dev<span className="text-brand-blue">Quest</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Expandindo fronteiras através de experiências imersivas e produtos
              digitais de alto impacto.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-violet/30 text-muted-foreground transition-colors hover:border-brand-violet/70 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-brand-blue"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DevQuest. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

