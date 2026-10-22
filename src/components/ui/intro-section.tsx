import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/nav";

export function IntroSection({
  lead,
  paragraphs,
}: {
  lead: string;
  paragraphs: string[];
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page max-w-3xl">
        <p className="font-display text-xl font-500 leading-relaxed text-ink sm:text-2xl">
          {lead}
        </p>
        <div className="prose-eco mt-6">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <p className="text-sm font-500 text-ink">
              We&apos;re preparing more detail for this page. In the meantime,
              reach out and we&apos;ll gladly tell you more.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Chat with us
          </a>
        </div>

        <div className="mt-8">
          <ButtonLink href="/who-we-are" variant="ghost" withArrow>
            Meet the team behind EcoMulch
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
