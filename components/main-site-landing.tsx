"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // keep if you use later
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Sparkles, FlaskConical, LineChart } from "lucide-react";
import FadeInSection from "@/components/motion/FadeInSection";

export default function MainSiteLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-930 to-slate-900 text-slate-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Hero />
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <ShowcaseSection />
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <SandboxSection />
        </FadeInSection>

        <FadeInSection delay={0.45}>
          <ClosingBand />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-2xl bg-slate-800/70 ring-1 ring-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">CyberClan</span>
            <Badge className="rounded-full bg-violet-600/20 text-violet-200">Quantum</Badge>
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#showcase" className="text-sm text-slate-300 hover:text-white">Showcase</a>
          <a href="#sandbox" className="text-sm text-slate-300 hover:text-white">Sandbox</a>
          <a href="/docs" className="text-sm text-slate-300 hover:text-white">Docs</a>
        </nav>
        <Button asChild size="sm" className="shadow-lg shadow-violet-700/30">
          <a href="/quantum-showcase">
            Launch Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            Web-Based Quantum Showcase & R&D Sandbox
          </div>
          <h1 className="font-bold tracking-tight leading-[1.2] text-[clamp(2rem,6vw,3.5rem)]">
            See quantum’s risk to crypto—then test hybrid Q-ML acceleration
          </h1>
          <p className="mt-4 text-slate-300">
            Experience a guided quantum decryption walkthrough and compare classical vs. hybrid training loops.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-shadow">
              <a href="/quantum-showcase">Try Decryption Demo</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 bg-slate-900/40">
              <a href="/ml-sandbox">Open ML Sandbox</a>
            </Button>
          </div>
          {/* Feature highlights card */}
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
      </div>

      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.06),transparent_45%)]" />
    </section>
  );
}

/* ---------- Sections ---------- */
function ShowcaseSection() {
  return (
    <section id="showcase" className="py-16">
      <h2 className="text-3xl font-semibold">Quantum Decryption Showcase</h2>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Step through a guided, small-key demonstration inspired by Shor’s algorithm.
      </p>
      <div className="mt-6 flex gap-4">
        <Button asChild className="shadow-lg shadow-violet-700/30">
          <a href="/quantum-showcase">Launch Showcase</a>
        </Button>
        <Button asChild variant="ghost">
          <a href="/docs">Read how it works</a>
        </Button>
      </div>
    </section>
  );
}

function SandboxSection() {
  return (
    <section id="sandbox" className="py-16">
      <h2 className="text-3xl font-semibold">Hybrid Quantum-Classical ML Sandbox</h2>
      <p className="mt-2 text-slate-300 max-w-2xl">
        Start/stop experimental runs and visualize accuracy, loss, and latency.
      </p>
      <div className="mt-6 flex gap-4">
        <Button asChild className="shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-shadow">
          <a href="/ml-sandbox">Open Sandbox</a>
        </Button>
        <Button asChild variant="ghost">
          <a href="/docs">See API</a>
        </Button>
      </div>
    </section>
  );
}

/* ---------- Closing + Footer ---------- */
function ClosingBand() {
  return (
    <section className="my-10 rounded-3xl border border-slate-800/60 bg-gradient-to-tr from-violet-700/15 via-fuchsia-600/10 to-cyan-500/10 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Ready to explore?</h3>
          <p className="mt-1 text-slate-300">Launch the demo or open the sandbox to compare runs.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="shadow-lg shadow-violet-700/30">
            <a href="/quantum-showcase">Try the Demo</a>
          </Button>
          <Button asChild variant="outline" className="border-slate-700 bg-slate-900/40">
            <a href="/ml-sandbox">Open Sandbox</a>
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
        © {new Date().getFullYear()} Team 7 — Dalhousie University (ECED 4900). Built with Next.js, Tailwind, and shadcn/ui.
      </div>
    </footer>
  );
}
