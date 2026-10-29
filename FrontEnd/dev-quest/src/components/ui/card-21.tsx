import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag: string;
  stats: string;
  href?: string;
  themeColor: string; // Ex: "245 75% 60%" (formato HSL para CSS variables)
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  (
    {
      className,
      imageUrl,
      location,
      flag,
      stats,
      href,
      themeColor,
      onClick,
      ...props
    },
    ref
  ) => {
    const cardContent = (
      <div
        className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                   transition-all duration-500 ease-in-out 
                   group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
        aria-label={`Explorar trilha ${location}`}
        style={{
          boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
        }}
      >
        {/* Imagem de Fundo com Zoom suave */}
        <div
          className="absolute inset-0 bg-cover bg-center 
                     transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Gradiente Temático com cor HSL */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
          }}
        />

        {/* Conteúdo do Card */}
        <div className="relative flex flex-col justify-end h-full p-6 text-white select-none">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {location} <span className="text-2xl ml-1">{flag}</span>
          </h3>
          <p className="text-sm text-white/80 mt-1 font-medium">{stats}</p>

          {/* Botão de Ação */}
          <div
            className="mt-6 sm:mt-8 flex items-center justify-between bg-[hsl(var(--theme-color)/0.25)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.35)] 
                       rounded-lg px-4 py-3 
                       transition-all duration-300 
                       group-hover:bg-[hsl(var(--theme-color)/0.45)] group-hover:border-[hsl(var(--theme-color)/0.6)]"
          >
            <span className="text-sm font-semibold tracking-wide">Começar Agora</span>
            <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        style={
          {
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full h-full cursor-pointer", className)}
        onClick={onClick}
        {...props}
      >
        {href ? (
          <a
            href={href}
            className="block w-full h-full"
            onClick={(e) => {
              if (href === "#") e.preventDefault();
            }}
          >
            {cardContent}
          </a>
        ) : (
          cardContent
        )}
      </div>
    );
  }
);

DestinationCard.displayName = "DestinationCard";

export { DestinationCard };

