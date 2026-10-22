import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { LeafMark } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/nav";
import type { SiteSettings } from "@/lib/content/types";

const explore = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Recycling Green Waste", href: "/recycling-green-waste" },
  { label: "Say No to Bare Soil", href: "/say-no-to-bare-soil" },
  { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
  { label: "Blog", href: "/blog" },
];

const solutions = [
  { label: "Mulching Solutions", href: "/say-no-to-bare-soil/our-response/mulching-your-home" },
  { label: "Flower Bed Transformations", href: "/greening-urban-spaces/what-we-offer/flower-beds" },
  { label: "Indoor & Patio Plants", href: "/greening-urban-spaces/what-we-offer/curated-plants" },
];

const DEFAULT_TAGLINE =
  "Turning everyday green waste into healthier soil, thriving plants and more liveable urban spaces in Kiambu and beyond.";

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[1.15rem] font-800 text-white">{children}</h2>;
}

const LINK = "text-[0.98rem] text-white/85 transition-colors hover:text-pine-mint";

/** Faint leaf sprig in the footer's right-hand corner. */
function LeafWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 300"
      fill="currentColor"
      className="pointer-events-none absolute -right-6 bottom-6 hidden h-[78%] w-auto text-white/[0.05] lg:block"
    >
      <path d="M120 10c60 40 90 120 60 190-18 42-58 64-88 66 4-90 4-170 28-256Z" />
      <path d="M70 140c-40 10-70 50-66 100 36 6 72-10 88-42 10-20 2-46-22-58Z" />
      <path d="M100 290c0-90 10-180 20-280" stroke="currentColor" strokeWidth="5" fill="none" />
    </svg>
  );
}

export function SiteFooter({
  whatsappUrl,
  settings,
}: {
  whatsappUrl?: string;
  settings?: SiteSettings;
}) {
  const waUrl = whatsappUrl || WHATSAPP_URL;
  const s = settings;
  const socials = [
    { href: s?.instagramUrl, label: "Instagram", Icon: Instagram },
    { href: s?.linkedinUrl, label: "LinkedIn", Icon: Linkedin },
    { href: s?.youtubeUrl, label: "YouTube", Icon: Youtube },
    { href: s?.facebookUrl, label: "Facebook", Icon: Facebook },
  ].filter((x) => x.href);
  const phone = s?.phone?.trim();
  const email = s?.email?.trim();

  return (
    <footer className="relative mt-auto overflow-hidden bg-forest text-white">
      <LeafWatermark />
      <div className="container-site relative grid grid-cols-2 gap-x-6 gap-y-10 pb-8 pt-12 lg:grid-cols-[1.25fr_0.85fr_0.95fr_1.1fr] lg:gap-8 lg:pt-14">
        {/* Company */}
        <div className="col-span-2 lg:col-span-1 lg:border-r lg:border-white/15 lg:pr-10">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="EcoMulch home">
            <LeafMark className="h-[58px] w-[48px] text-white" />
            <span className="flex flex-col leading-none">
              <span className="text-[2.1rem] font-800 tracking-[-0.01em] text-white">EcoMulch</span>
              <span className="mt-1 text-[0.82rem] font-700 text-white/90">Sustainable Urban Greening</span>
            </span>
          </Link>
          <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.5] text-white/85">
            {s?.footerTagline || DEFAULT_TAGLINE}
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`EcoMulch on ${label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-white/80 text-white transition-colors hover:border-pine-mint hover:text-pine-mint"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Explore */}
        <nav aria-label="Footer: explore" className="lg:pl-6">
          <Heading>Explore</Heading>
          <ul className="mt-4 space-y-2.5">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={LINK}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Solutions */}
        <nav aria-label="Footer: our solutions">
          <Heading>Our Solutions</Heading>
          <ul className="mt-4 space-y-2.5">
            {solutions.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={LINK}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1">
          <Heading>Get in Touch</Heading>
          <ul className="mt-4 space-y-3.5 text-[0.98rem] text-white/85">
            {s?.location !== "" && (
              <li className="flex items-center gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-white" strokeWidth={2} />
                {s?.location || "Kiambu, Kenya"}
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-white" strokeWidth={2} />
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-pine-mint">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 shrink-0 text-white" strokeWidth={2} />
                <a href={`mailto:${email}`} className="hover:text-pine-mint">
                  {email}
                </a>
              </li>
            )}
            <li className="flex items-center gap-4">
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-white" />
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pine-mint">
                Chat with us on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site relative">
        <div className="flex flex-col gap-3 border-t border-white/20 py-6 text-[0.9rem] text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EcoMulch. All rights reserved.</p>
          {/* Privacy Policy / Terms of Use links go here once those pages exist. */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pine-mint">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
