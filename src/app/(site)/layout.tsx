import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSettings, whatsappUrl } from "@/lib/content/store";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcoMulch — Sustainable Urban Greening",
    template: "%s | EcoMulch",
  },
  description:
    "EcoMulch is a sustainable urban greening company based in Kiambu, Kenya, building greener, healthier and more resilient towns and cities.",
  metadataBase: new URL("https://ecomulch.co.ke"),
};

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const waUrl = whatsappUrl(settings);
  return (
    <html lang="en" className={nunito.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader nav={settings.nav} whatsappUrl={waUrl} />
        <main className="flex-1">{children}</main>
        <SiteFooter whatsappUrl={waUrl} settings={settings} />
      </body>
    </html>
  );
}
