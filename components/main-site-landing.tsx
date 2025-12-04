"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Sparkles, FlaskConical, LineChart } from "lucide-react";
import FadeInSection from "@/components/motion/FadeInSection";
import { Badge } from "./ui/badge";

export default function MainSiteLanding() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-930 to-slate-900 text-slate-100">
      <Header onOpenContact={() => setIsContactOpen(true)} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Hero />
        </FadeInSection>

        {/* Picture tiles removed */}

        <FadeInSection delay={0.2}>
          <ShowcaseSection />
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <SandboxSection />
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <ClosingBand />
        </FadeInSection>
      </main>
      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

/* ---------------- Header (tight right cluster) ---------------- */
function Header({ onOpenContact }: { onOpenContact: () => void }) {
  const pathname = usePathname();

  const NAV = [
    { name: "Home", href: "/" },
    { name: "Showcase", href: "/quantum-showcase" },
    { name: "Sandbox", href: "/sign-in" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-lg supports-[backdrop-filter]:bg-slate-950/60">
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* left: logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src="/images/cyberclan-logo.png"
              alt="CyberClan Logo"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              CyberClan
            </span>
            <Badge className="rounded-full bg-violet-600/20 text-violet-200">
              Quantum
            </Badge>
          </div>
        </Link>

        {/* RIGHT CLUSTER (nav + actions together) */}
        <div className="ml-auto flex items-center gap-3">
          {/* nav pill (moved closer to actions) */}
          <nav className="hidden md:flex items-center gap-2 rounded-2xl border border-white/5 bg-gradient-to-r from-slate-900/60 via-indigo-900/40 to-slate-900/60 px-1.5 py-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-selected={active}
                  className="group relative rounded-xl px-4 py-2 text-sm text-slate-300 transition-colors hover:text-white aria-selected:text-white"
                >
                  {item.name}
                  {/* gradient underline (active only) */}
                  <span className="pointer-events-none absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 opacity-0 transition-opacity duration-300 aria-selected:opacity-100" />
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <button
            type="button"
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center rounded-full border border-slate-700/70 bg-slate-900/40 px-4 py-1.5 text-sm font-medium text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] hover:border-slate-600 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] transition"
          >
            Contact us
          </button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-slate-700 bg-slate-900/40"
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>
      </div>

      {/* thin neon sweep */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
    </header>
  );
}

/* ---------- Hero (updated alignment) ---------- */
function Hero() {
  return (
    <section className="relative pt-14 md:pt-16 pb-16 overflow-hidden">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* LEFT: text and buttons */}
        <div className="order-2 md:order-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            Web-Based Quantum Showcase & R&D Sandbox
          </div>

          <h1 className="font-bold tracking-tight leading-[1.15] text-[clamp(2rem,6vw,3.5rem)]">
            Quantum is coming - are you ready?
          </h1>

          <p className="mt-4 text-slate-300 max-w-lg">
            Experience a guided quantum decryption walkthrough and compare
            classical vs. hybrid training loops.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="transition-shadow shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <a href="/quantum-showcase">Try Decryption Demo</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-900/40"
            >
              <a href="/sign-in">Open ML Sandbox</a>
            </Button>
          </div>

          <Card className="mt-10 w-full max-w-md border-slate-800 bg-slate-900/60 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-violet-400" />
                <p className="text-slate-300 text-sm">
                  Quantum-safe RSA decryption demo built with Shor’s algorithm
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-cyan-400" />
                <p className="text-slate-300 text-sm">
                  Experiment with hybrid classical–quantum training loops
                </p>
              </div>
              <div className="flex items-center gap-3">
                <LineChart className="h-5 w-5 text-fuchsia-400" />
                <p className="text-slate-300 text-sm">
                  Track accuracy, loss, and latency metrics in real time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: cube visual */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end md:pr-2">
          <RightVisual />
        </div>
      </div>

      {/* binary background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08] select-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 20px, rgba(255,255,255,0.02) 20px 40px), repeating-linear-gradient(90deg, transparent 0 20px, rgba(255,255,255,0.015) 20px 40px)",
          backgroundSize: "40px 40px",
          animation: "matrixScroll 20s linear infinite",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.9) 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.9) 60%, transparent 100%)",
        }}
      />
    </section>
  );
}

function RightVisual() {
  return (
    <div className="relative w-full sm:max-w-[540px] md:max-w-[640px] lg:max-w-[720px] md:mt-[-3rem] lg:mt-[-4rem]">
      {/* subtle glow behind */}
      <div className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-tr from-violet-600/25 via-fuchsia-500/15 to-cyan-400/15 blur-3xl" />

      <div className="relative w-full overflow-visible">
        <Image
          src="/images/quantum-cube.png"
          alt="Quantum visual"
          width={1100}
          height={1100}
          className="mx-auto object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
          priority
        />

        {/* smooth edge mask */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            // feather edges in all directions
            background:
              "radial-gradient(130% 110% at 50% 60%, rgba(2,6,23,0) 60%, rgba(2,6,23,0.25) 74%, rgba(2,6,23,0.6) 85%, rgba(2,6,23,1) 100%)",
            // stronger fade at the bottom only
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.4) 95%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* bottom connection glow */}
      <div className="absolute -bottom-8 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent blur-2xl opacity-95" />
    </div>
  );
}

/* ---------------- Other sections ---------------- */
function ShowcaseSection() {
  return (
    <section id="showcase" className="py-16">
      <h2 className="text-3xl font-semibold">Quantum Decryption Showcase</h2>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Step through a guided, small-key demonstration inspired by Shor’s
        algorithm.
      </p>
      <div className="mt-6 flex gap-4">
        <Button asChild className="shadow-lg shadow-violet-700/30">
          <Link href="/quantum-showcase">Launch Showcase</Link>
        </Button>
      </div>
    </section>
  );
}

function SandboxSection() {
  return (
    <section id="sandbox" className="py-16">
      <h2 className="text-3xl font-semibold">
        Hybrid Quantum-Classical ML Sandbox
      </h2>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Start/stop experimental runs and visualize accuracy, loss, and latency.
      </p>
      <div className="mt-6 flex gap-4">
        <Button
          asChild
          className="transition-shadow shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
        >
          <Link href="/sign-in">Open Sandbox</Link>
        </Button>
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section className="my-10 rounded-3xl border border-slate-800/60 bg-gradient-to-tr from-violet-700/15 via-fuchsia-600/10 to-cyan-500/10 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Ready to explore?</h3>
          <p className="mt-1 text-slate-300">
            Launch the demo or open the sandbox to compare runs.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="shadow-lg shadow-violet-700/30">
            <Link href="/quantum-showcase">Try the Demo</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-700 bg-slate-900/40"
          >
            <Link href="/sign-in">Open Sandbox</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-sm text-slate-400">
        © {new Date().getFullYear()} Team 7 — Dalhousie University (ECED 4900).
      </div>
    </footer>
  );
}

/* ---------------- Contact Modal ---------------- */

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs text-slate-400 hover:bg-slate-800"
        >
          Esc
        </button>
        <h2 className="text-xl font-semibold">Contact us</h2>
        <p className="mt-1 text-sm text-slate-300">
          Leave your details and we&apos;ll follow up.
        </p>

        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Message
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-slate-600 bg-slate-900/60"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
