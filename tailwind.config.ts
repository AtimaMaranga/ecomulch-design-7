import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Deep navy used for large section headings
        ink: {
          DEFAULT: "#0c2852",
          light: "#1b3358",
        },
        // EcoMulch leaf-green brand scale
        brand: {
          50: "#eef6ef",
          100: "#d9ecdc",
          200: "#b3dcbc",
          300: "#86cf7a",
          400: "#6cc463",
          500: "#1f9a4b",
          600: "#0b7d3e", // primary green
          700: "#08692f",
          800: "#0a5428",
          900: "#0a4322",
        },
        lime: {
          DEFAULT: "#7fcd5c",
        },
        // Terracotta accent — "challenge" cards and their CTAs
        rust: {
          50: "#fbefe8",
          500: "#c2541f",
          600: "#a8441a",
        },
        // Solid icon-badge colours used on the section pages
        accent: {
          olive: "#5e8c31",
          slate: "#4a6a8b",
          amber: "#e3a21a",
          clay: "#b07a3c",
        },
        // Soft circles behind line icons
        pastel: {
          mint: "#e2f2e3",
          lime: "#ecf5d6",
          peach: "#fde7d4",
          sky: "#dcedf6",
          rose: "#fbe3e3",
          sand: "#faf3ea",
          lilac: "#efe6fb",
        },
        // Warm earthy accent (mulch / soil)
        earth: {
          400: "#b98a52",
          500: "#9a6d38",
          600: "#7c552a",
        },
        surface: {
          DEFAULT: "#f9fbfa",
          tint: "#f3f7f2",
          crumb: "#f6f9f5",
        },
        line: "#e1e8e3",
        // Footer: deep forest green + green-tinted neutrals
        // Homepage palette (deeper pine greens from the homepage mockups)
        pine: {
          DEFAULT: "#0a6043",
          dark: "#084c35",
          deep: "#0c241b",
          mint: "#5cd9b0",
        },
        cream: "#f6f5eb",
        sage: "#eff6e9",
        forest: {
          DEFAULT: "#0b3a2f",
          text: "#d3e2d7",
          muted: "#a6bdab",
          faint: "#7d9683",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
      },
      maxWidth: {
        container: "1540px",
        page: "1024px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 40, 24, 0.04), 0 8px 24px -12px rgba(16, 40, 24, 0.18)",
        "card-hover":
          "0 2px 4px rgba(16, 40, 24, 0.06), 0 20px 40px -18px rgba(16, 40, 24, 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
