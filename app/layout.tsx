// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberClan - Quantum Showcase & Q-ML Sandbox",
  description:
    "Experience the CyberClan Quantum Showcase and learn how quantum impacts encryption. Compare classical vs hybrid quantum-classical ML in our sandbox.",
  keywords: [
    "CyberClan",
    "Quantum Computing",
    "RSA Decryption",
    "Post-Quantum Security",
    "Machine Learning",
    "QML Sandbox",
    "Dalhousie University",
  ],
  authors: [{ name: "Team 7 — Dalhousie ECED 4900" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50/50">{children}</body>
    </html>
  );
}
