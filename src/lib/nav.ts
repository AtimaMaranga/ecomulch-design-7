export type NavItem = {
  label: string;
  href: string;
  /** matches the pathname prefix for active state */
  match?: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are", match: "/who-we-are" },
  { label: "Recycling Green Waste", href: "/recycling-green-waste" },
  { label: "Say No to Bare Soil", href: "/say-no-to-bare-soil" },
  { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
  { label: "Blog", href: "/blog" },
];

// Update with the real EcoMulch WhatsApp number.
export const WHATSAPP_NUMBER = "254700000000";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello EcoMulch, I'd like to learn more about sustainable urban greening.",
)}`;

// Update with the real WhatsApp Business catalogue link (wa.me/c/<number>).
export const WHATSAPP_CATALOGUE_URL = `https://wa.me/c/${WHATSAPP_NUMBER}`;

// Update with the "From Ordinary to Amazing" playlist or video URL.
export const FLOWER_BEDS_YOUTUBE_URL = "https://www.youtube.com/";

