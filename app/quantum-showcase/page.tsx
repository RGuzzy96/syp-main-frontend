"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";

// ──────────────────────────────────────────────
// QUANTUM DECRYPTION SHOWCASE — Blue/Black Cinematic Edition
// ──────────────────────────────────────────────
export default function QuantumShowcasePage() {
  const sections = [
    {
      id: "threat",
      title: "The Quantum Threat",
      subtitle: "Your encrypted data might not stay private forever.",
      content: (
        <>
          Quantum computing is redefining what “secure” means.
          It can solve in minutes the math problems that keep modern encryption safe today.
        </>
      ),
    },
    {
      id: "harvest",
      title: "Harvest Now, Decrypt Later",
      subtitle: "A silent race between encryption and innovation.",
      content: (
        <>
          Attackers are already <strong>collecting encrypted data</strong> — financial records,
          contracts, and health files — waiting for the day quantum computers can decrypt them instantly.
          This is known as a <em>“harvest now, decrypt later”</em> strategy.
        </>
      ),
    },
    {
      id: "how",
      title: "How It Happens",
      subtitle: "Breaking the unbreakable.",
      content: (
        <>
          Encryption like RSA and ECC depends on factoring huge numbers.
          Quantum algorithms such as <strong>Shor’s</strong> can find those factors much faster than
          classical methods, turning “secure” keys into plain text secrets.
        </>
      ),
    },
    {
      id: "wall",
      title: "The Illusion of Security",
      subtitle: "What seems unbreakable today may shatter tomorrow.",
      content: <EncryptionWall />,
    },
    {
      id: "demo",
      title: "Demonstration",
      subtitle: "Experience a simulated quantum decryption process.",
      content: <QuantumDemo />,
    },
    {
      id: "race",
      title: "Classical vs Quantum",
      subtitle: "A race only one side can win.",
      content: <QuantumRace />,
    },
    {
      id: "challenge",
      title: "Can Your Encryption Survive?",
      subtitle: "Put your trust to the test.",
      content: <QuantumSafeChallenge />,
    },
    {
      id: "protect",
      title: "Protecting the Future",
      subtitle: "Quantum-safe solutions already exist.",
      content: (
        <>
          The good news: researchers have developed <strong>Post-Quantum Cryptography (PQC)</strong> —
          encryption methods designed to resist quantum attacks. The time to start migrating is{" "}
          <strong>now</strong>.
        </>
      ),
    },
    {
      id: "action",
      title: "Take Action",
      subtitle: "CyberClan can help you stay ahead.",
      content: (
        <>
          <p>
            CyberClan helps organizations identify vulnerable systems, classify sensitive data,
            and build a roadmap toward quantum-safe readiness.
          </p>
          <form className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <input
              type="text"
              placeholder="Name"
              className="border border-sky-500/40 bg-black/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-sky-500/40 bg-black/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <textarea
              placeholder="Tell us your biggest concern about quantum risk..."
              className="border border-sky-500/40 bg-black/40 rounded-xl px-3 py-2 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              rows={4}
            />
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-500 transition w-fit"
            >
              Request Follow-Up
            </button>
          </form>
        </>
      ),
    },
  ] as const;

  const [activeIndex, setActiveIndex] = useState(0);

  // Global scroll for background parallax / zoom
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToSection = (index: number) => {
    const el = document.getElementById(sections[index].id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <>
      {/* FULL-SCREEN BACKGROUND IMAGE WITH PARALLAX + ZOOM */}
      <motion.div
        className="fixed top-0 left-0 w-[110vw] h-[110vh] -translate-x-[5vw] -translate-y-[5vh] z-0 overflow-hidden"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/backgrounds/crypto.jpg"
          alt="Quantum background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* DARK BLUE/BLACK CINEMATIC OVERLAY */}
      <div className="fixed inset-0 z-5 bg-gradient-to-b from-black/90 via-slate-950/90 to-black/95" />

      {/* BLUE FOG / HAZE */}
      <BlueFog />

      {/* FLOATING BLUE PARTICLES */}
      <BlueParticles />

      {/* SUBTLE GLITCH FLICKERS */}
      <GlitchOverlay />

      <main className="relative z-20 overflow-x-hidden text-white">
        {sections.map((s, i) => (
          <Section key={s.id} {...s} index={i} setActiveIndex={setActiveIndex} />
        ))}

        {/* Arrow navigation */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 text-white">
          <button
            aria-label="Previous section"
            onClick={() => scrollToSection(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className={`transition transform hover:scale-110 ${
              activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-80"
            }`}
          >
            ▲
          </button>
          <button
            aria-label="Next section"
            onClick={() => scrollToSection(Math.min(sections.length - 1, activeIndex + 1))}
            disabled={activeIndex === sections.length - 1}
            className={`transition transform hover:scale-110 ${
              activeIndex === sections.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-80"
            }`}
          >
            ▼
          </button>
        </div>

        <footer className="py-10 text-center text-slate-400 text-sm bg-black/80 backdrop-blur-md">
          © {new Date().getFullYear()} CyberClan · Quantum Readiness Demonstration
        </footer>
      </main>
    </>
  );
}

// ──────────────────────────────────────────────
// Section Wrapper — smooth fade + depth movement
// ──────────────────────────────────────────────
type SectionProps = {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  index: number;
  setActiveIndex: (i: number) => void;
};

function Section({ id, title, subtitle, content, index, setActiveIndex }: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  // Local scroll-based depth motion
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  useEffect(() => {
    if (isInView) setActiveIndex(index);
  }, [isInView, index, setActiveIndex]);

  return (
    <section
      id={id}
      ref={ref as any}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-0 text-center"
    >
      <motion.div
        className="max-w-3xl"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 80 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight drop-shadow-[0_0_18px_rgba(15,23,42,0.9)]">
          {title}
        </h2>
        <p className="text-lg md:text-2xl mb-6 opacity-90 text-sky-200">
          {subtitle}
        </p>
        <div className="text-base md:text-lg opacity-90 leading-relaxed text-slate-100">
          {content}
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────────
// BLUE FOG / HAZE LAYERS
// ──────────────────────────────────────────────
function BlueFog() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-8"
        initial={{ opacity: 0.2, y: 40 }}
        animate={{ opacity: [0.2, 0.35, 0.2], y: [40, 0, 40] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.16), transparent 55%)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-7"
        initial={{ opacity: 0.15, y: -40 }}
        animate={{ opacity: [0.15, 0.3, 0.15], y: [-40, 0, -40] }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 80% 100%, rgba(56,189,248,0.12), transparent 60%)",
        }}
      />
    </>
  );
}

// ──────────────────────────────────────────────
// FLOATING BLUE PARTICLES
// ──────────────────────────────────────────────
function BlueParticles() {
  // deterministic placement so no SSR mismatch
  const particles = Array.from({ length: 26 }, (_, i) => ({
    top: `${(i * 37) % 100}%`,
    left: `${(i * 53) % 100}%`,
    duration: 18 + (i % 7),
    delay: (i % 11) * 0.7,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-12 overflow-hidden">
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute text-[10px] md:text-xs font-mono text-sky-300/70"
          style={{
            top: p.top,
            left: p.left,
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.8, 0], y: [-30, 0, 30] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {`Q${(idx * 13) % 97} • ${((idx * 7) % 53)
            .toString(16)
            .toUpperCase()} • Ψ`}
        </motion.div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// SUBTLE GLITCH OVERLAY (blue, not neon)
// ──────────────────────────────────────────────
function GlitchOverlay() {
  const bars = [10, 25, 52, 73];

  return (
    <div className="pointer-events-none fixed inset-0 z-15 mix-blend-screen">
      {bars.map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[2px] md:h-[3px] bg-sky-500/12"
          style={{ top: `${top}%` }}
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ x: ["-10%", "10%", "-5%"], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.3,
          }}
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// 1) ENCRYPTION WALL — emotional buildup
// ──────────────────────────────────────────────
function EncryptionWall() {
  const [cracked, setCracked] = useState(false);

  useEffect(() => {
    if (cracked) {
      const timer = setTimeout(() => setCracked(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [cracked]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10 text-center">
      <div className="grid grid-cols-8 sm:grid-cols-12 gap-1 text-[10px] font-mono">
        {Array.from({ length: 96 }).map((_, i) => (
          <motion.div
            key={i}
            className={`p-1 rounded-md border text-[10px] ${
              cracked
                ? "border-red-500/80 text-red-300 bg-red-900/20"
                : "border-sky-500/70 text-sky-300 bg-sky-950/20"
            }`}
            animate={{
              opacity: cracked ? [1, 0.5, 1] : 1,
              scale: cracked ? [1, 1.18, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: cracked ? Infinity : 0,
              delay: (i % 10) * 0.03,
            }}
          >
            {Math.random().toString(36).slice(2, 6).toUpperCase()}
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setCracked(true)}
        className="mt-6 px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition shadow-[0_0_18px_rgba(56,189,248,0.4)]"
      >
        Initiate Quantum Attack
      </button>

      <motion.p
        className="mt-4 text-sm text-slate-300"
        animate={{ opacity: cracked ? [1, 0.4, 1] : 1 }}
        transition={{ duration: 1.5, repeat: cracked ? Infinity : 0 }}
      >
        {cracked
          ? "RSA keys collapsing... encryption wall breached ⚠️"
          : "Current state: Secure (Classical Encryption)"}
      </motion.p>
    </div>
  );
}

// ──────────────────────────────────────────────
// 2) QUANTUM RACE — educational comparison
// ──────────────────────────────────────────────
function QuantumRace() {
  const [running, setRunning] = useState(false);
  const [classical, setClassical] = useState(0);
  const [quantum, setQuantum] = useState(0);

  const startRace = () => {
    setRunning(true);
    setClassical(0);
    setQuantum(0);

    const interval = setInterval(() => {
      setClassical((c) => Math.min(c + Math.random() * 1, 100));
      setQuantum((q) => Math.min(q + Math.random() * 10, 100));
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setRunning(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-black/60 rounded-xl p-6 border border-sky-500/20 backdrop-blur-md">
      <h3 className="text-sky-300 text-xl font-semibold mb-4">Classical vs Quantum Speed</h3>

      <div className="space-y-4 text-left">
        <div>
          <p className="text-slate-200 text-sm mb-1">Classical (RSA Factoring)</p>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <motion.div
              className="bg-red-500 h-3"
              animate={{ width: `${classical}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        <div>
          <p className="text-slate-200 text-sm mb-1">Quantum (Shor’s Algorithm)</p>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <motion.div
              className="bg-sky-400 h-3"
              animate={{ width: `${quantum}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-300 mt-4">
        Quantum algorithms often scale <strong>polynomially</strong>, while classical approaches
        grow <strong>exponentially</strong>.
      </p>

      <button
        onClick={startRace}
        disabled={running}
        className={`mt-5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
          running
            ? "bg-slate-600 text-slate-300 cursor-not-allowed"
            : "bg-sky-600 hover:bg-sky-500 text-white"
        }`}
      >
        {running ? "Running Simulation..." : "Start Comparison"}
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────
// 3) QUANTUM-SAFE CHALLENGE — action + hope
// ──────────────────────────────────────────────
function QuantumSafeChallenge() {
  const [choice, setChoice] = useState<"rsa" | "kyber" | null>(null);

  return (
    <div className="relative w-full max-w-xl mx-auto mt-10 text-center bg-black/60 p-6 rounded-xl border border-sky-500/20 backdrop-blur-md">
      <h3 className="text-xl font-semibold text-sky-300 mb-3">
        Quantum-Safe Encryption Challenge
      </h3>
      <p className="text-slate-300 text-sm mb-6">
        Choose your encryption method and see how it holds up under quantum pressure.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => setChoice("rsa")}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold"
        >
          RSA-2048
        </button>
        <button
          onClick={() => setChoice("kyber")}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold"
        >
          CRYSTALS-Kyber
        </button>
      </div>

      {choice && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-sm text-slate-200"
        >
          {choice === "rsa" ? (
            <>
              🔓 <span className="text-red-400 font-semibold">Broken Instantly!</span>
              <p className="mt-2 text-slate-300">
                RSA-2048 is theoretically vulnerable to Shor’s algorithm on a large, fault-tolerant
                quantum computer.
              </p>
            </>
          ) : (
            <>
              🔒 <span className="text-emerald-400 font-semibold">Still Secure!</span>
              <p className="mt-2 text-slate-300">
                CRYSTALS-Kyber is a post-quantum algorithm designed to resist known quantum attacks.
              </p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 4) QUANTUM DEMO — cinematic binary rain + progress
// ──────────────────────────────────────────────
function QuantumDemo() {
  const [progress, setProgress] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decrypted, setDecrypted] = useState("");
  const [status, setStatus] = useState("Idle");
  const [qubits, setQubits] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    if (isDecrypting && progress < 100) {
      const t1 = setTimeout(() => setProgress((p) => p + 2), 100);
      const t2 = setTimeout(() => {
        setQubits((q) => Math.min(q + Math.floor(Math.random() * 4) + 1, 64));
        setElapsed((e) => +(e + 0.1).toFixed(1));
      }, 150);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else if (isDecrypting && progress >= 100) {
      const t3 = setTimeout(() => {
        setDecrypted(
          "🔓 Message: 'HELLO CYBERCLAN'\nQuantum Decryption Successful — RSA-1024 Key Broken"
        );
        setStatus("Decryption Complete ✅");
        setIsDecrypting(false);
        setShowRain(false);
      }, 500);
      return () => clearTimeout(t3);
    }
  }, [isDecrypting, progress]);

  const startDecryption = () => {
    setIsDecrypting(true);
    setProgress(0);
    setStatus("Quantum Node Connected ⚡");
    setDecrypted("");
    setQubits(0);
    setElapsed(0);
    setShowRain(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto text-center mt-8 overflow-hidden">
      {showRain && <BinaryRain />}

      <div className="relative bg-black/70 rounded-xl p-6 border border-sky-500/30 backdrop-blur-md z-10">
        <h3 className="text-2xl font-semibold mb-2 text-sky-300">
          Quantum RSA Decryption Demo
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Simulating a live AWS Braket–style quantum decryption session.
        </p>

        <div className="grid grid-cols-3 gap-4 text-xs text-sky-300 font-mono mb-4">
          <div>Qubits Active: {qubits}</div>
          <div>RSA Key: 1024 bit</div>
          <div>Time: {elapsed.toFixed(1)} s</div>
        </div>

        <div className="text-slate-200 text-sm mb-4">{status}</div>

        {isDecrypting && (
          <div className="w-full bg-slate-800 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div
              className="h-3"
              style={{ backgroundColor: "rgb(56,189,248)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {decrypted && (
          <motion.pre
            className="bg-slate-950 text-emerald-300 mt-4 p-3 rounded-md font-mono text-sm whitespace-pre-line text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {decrypted}
          </motion.pre>
        )}

        <button
          onClick={startDecryption}
          disabled={isDecrypting}
          className={`mt-6 px-5 py-2 rounded-lg text-sm font-semibold transition ${
            isDecrypting
              ? "bg-slate-700 text-slate-300 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-500 text-white"
          }`}
        >
          {isDecrypting ? "Running Quantum Routine..." : "Start Quantum Decryption"}
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Continuous Matrix-style Rain
// ──────────────────────────────────────────────
function BinaryRain() {
  const streams = Array.from({ length: 25 }, () =>
    Array.from({ length: 40 }, () => (Math.random() > 0.5 ? "1" : "0")).join(" ")
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {streams.map((line, i) => (
        <motion.div
          key={i}
          className="absolute w-full text-center font-mono text-sky-300 text-xs drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 60 - 20}%`,
            opacity: 0.7,
            whiteSpace: "nowrap",
          }}
          initial={{ y: -400 }}
          animate={{ y: [0, 800] }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
