import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { Footer } from "@/components/home-page/footer";
import { Header } from "@/components/home-page/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synergic Information Solutions",
  description:
    "Engineering software solutions for modern infrastructure. CAD, structural, civil, and MEP tools for India's AEC sector.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} light h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Providers>
          <div className="flex min-h-full flex-1 flex-col">
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
