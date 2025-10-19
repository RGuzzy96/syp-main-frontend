// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberClan — Quantum Showcase & Q-ML Sandbox",
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
  openGraph: {
    title: "CyberClan Quantum Showcase",
    description:
      "Explore the future of cybersecurity through quantum decryption demos and hybrid ML acceleration.",
    url: "https://example.com", // update later
    siteName: "CyberClan Quantum",
    images: ["/logo.png"], // update or remove if not present
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
