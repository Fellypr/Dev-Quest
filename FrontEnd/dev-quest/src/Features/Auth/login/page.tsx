import {AuthLoginForm} from "@/Features/Auth";

export function AuthLoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="relative isolate grid min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(108,70,255,0.24),transparent_32%),radial-gradient(circle_at_86%_74%,rgba(0,119,255,0.2),transparent_30%),linear-gradient(180deg,#050816_0%,#07091f_48%,#020617_100%)]" />
        <AuthLoginForm />
      </div>
    </div>
  );
}
