import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { AgentsShowcase, Features, Pricing, FinalCta } from "@/components/landing/Sections";

const TITLE = "VidyaAI — Voice AI Tutor for Indian Students";
const DESC =
  "Learn with Arya, Bhasha Coach, Saraswati and Yukti: voice-enabled AI tutors for STEM, languages, UPSC & board exam prep, and coding — in English, Hindi, Tamil, Telugu and Bengali.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "VidyaAI",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          description: DESC,
          offers: [
            { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free Trial" },
            { "@type": "Offer", price: "15", priceCurrency: "USD", name: "Pro Student" },
            { "@type": "Offer", price: "29", priceCurrency: "USD", name: "Master Scholar" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader className="px-4" />
      <main className="-mt-[68px]">
        <Hero />
        <AgentsShowcase />
        <Features />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
