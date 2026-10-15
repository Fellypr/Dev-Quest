import Image from "next/image";
import { AnimatedPhrase } from "./components/AnimatedPhrase";

export function PresentationPage() {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-[#020308] text-white`}
    >
      <nav className="w-full h-32 flex items-center justify-center z-50 absolute">
        <Image src="/icon/LogoComNomeSemFundo.png" alt="" width={280} height={80} className=""/>
      </nav>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[140px] right-1/3 -translate-x-[51%] h-[420px] w-[680px] max-w-[90vw] select-none"
      >
        <div
          className="h-full w-full rounded-full opacity-50 blur-[105px]"
          style={{
            background:
              "linear-gradient(98deg, #1d4ed8 0%, #3b82f6 18%, #60a5fa 28%, #6366f1 42%, #7c3aed 58%, #6826ac 78%, #4c1d95 100%)",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[360px] -right-[180px] h-[640px] w-[680px] max-w-[85vw] select-none"
      >
        <div
          className="h-full w-full rounded-full opacity-85 blur-[120px]"
          style={{
            background:
              "linear-gradient(135deg, #1e40af 0%, #2563eb 20%, #38bdf8 32%, #4f46e5 48%, #7c3aed 68%, #6825a9 85%, #4c1d95 100%)",
          }}
        />
      </div>

      <AnimatedPhrase />
    </div>
  );
}
