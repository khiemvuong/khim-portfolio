import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khiêm Vương | Cybernetic Full-Stack Developer Portfolio",
  description: "Portfolio of Khiêm Vương, a Full-Stack MERN Developer specializing in engineering robust Node.js architectures and premium cyber-aesthetic frontends.",
  keywords: ["Khiêm Vương", "Full Stack Developer", "MERN Stack", "Next.js", "React Portfolio", "Futuristic UI", "Cyberpunk Portfolio"],
  authors: [{ name: "Khiêm Vương" }],
  openGraph: {
    title: "Khiêm Vương | Cybernetic Full-Stack Developer Portfolio",
    description: "Explore the futuristic portfolio of Khiêm Vương, showcasing modern web technologies, terminal interactions, and full-stack projects.",
    type: "website",
  },
};

import SmoothScroll from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-bg-dark text-[#e2e8f0] font-sans antialiased overflow-x-hidden">
        {/* Global SVG filter for LiquidGlassCard — single instance instead of per-card */}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <filter
              id="glass-blur"
              x="0"
              y="0"
              width="100%"
              height="100%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.003 0.007"
                numOctaves="1"
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="200"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
