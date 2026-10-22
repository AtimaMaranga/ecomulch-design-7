"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems as defaultNav, WHATSAPP_URL } from "@/lib/nav";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

type NavLink = { label: string; href: string };

function matches(pathname: string, item: NavLink) {
  if (item.href === "/") return pathname === "/";
  const base = item.href;
  return pathname === base || pathname.startsWith(base + "/");
}

/** The single nav item to underline: the longest href that contains the path
 *  (so /greening-urban-spaces/what-we-offer lights "What We Offer", not both). */
function activeHref(pathname: string, items: NavLink[]) {
  return items
    .filter((it) => matches(pathname, it))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

export function SiteHeader({
  nav,
  whatsappUrl,
}: {
  nav?: NavLink[];
  whatsappUrl?: string;
}) {
  const navItems: NavLink[] = nav && nav.length > 0 ? nav : defaultNav;
  const waUrl = whatsappUrl || WHATSAPP_URL;
  const pathname = usePathname();
  const current = activeHref(pathname, navItems);
  const isActive = (_p: string, item: NavLink) => item.href === current;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-slate-200/80 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4 lg:h-[88px] lg:gap-3 lg:px-5 xl:gap-4 xl:px-10">
        <Logo />

        <nav
          className="hidden h-full items-center gap-[11px] lg:flex xl:gap-[18px] 2xl:gap-9"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex h-full items-center whitespace-nowrap text-[0.72rem] font-500 transition-colors xl:text-[0.86rem] 2xl:text-[0.95rem] ${
                  active ? "text-brand-600" : "text-ink hover:text-brand-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-[15px] left-0 h-[3px] w-full origin-left bg-brand-600 transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-brand-600 px-2 py-1.5 text-white shadow-sm transition-colors hover:bg-brand-700 sm:gap-2 sm:px-3 sm:py-2 xl:gap-3 xl:px-5 2xl:px-10"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 xl:h-8 xl:w-8" />
            <span className="flex flex-col text-left text-[0.62rem] font-600 leading-[1.2] sm:text-[0.74rem] xl:text-[0.92rem] 2xl:text-[0.95rem]">
              <span>Chat with us</span>
              <span>on WhatsApp</span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-surface lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-slate-200/80 bg-white lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out`}
      >
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
          {navItems.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Chat with us on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
