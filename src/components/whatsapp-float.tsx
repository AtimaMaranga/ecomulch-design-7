import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/nav";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EcoMulch on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-900/30 transition-all hover:scale-105 hover:bg-brand-500"
    >
      <span className="absolute inset-0 rounded-full bg-brand-500/60 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-100" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
