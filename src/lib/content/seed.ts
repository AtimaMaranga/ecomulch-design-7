/**
 * Seed content — the starting point for each page and for global settings.
 *
 * This mirrors exactly what was previously hardcoded in the page files, so the
 * site looks identical before anyone edits anything. When a page has never been
 * saved in the CMS, the store serves the seed; the first save in the admin
 * persists it to the repository, after which the saved copy wins.
 */
import type { Page, SiteSettings } from "./types";

export const SEED_SETTINGS: SiteSettings = {
  whatsappNumber: "254740209770",
  whatsappMessage:
    "Hello EcoMulch, I'd like to learn more about sustainable urban greening.",
  whatsappCatalogueUrl: "https://wa.me/c/254740209770",
  flowerBedsYoutubeUrl: "https://www.youtube.com/",
  nav: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Recycling Green Waste", href: "/recycling-green-waste" },
    { label: "Say No to Bare Soil", href: "/say-no-to-bare-soil" },
    { label: "Greening Urban Spaces", href: "/greening-urban-spaces" },
    { label: "Blog", href: "/blog" },
  ],
  footerTagline:
    "Turning everyday green waste into healthier soil, thriving plants and more liveable urban spaces in Kiambu and beyond.",
  location: "Kiambu, Kenya",
  phone: "+254 740 209 770",
  email: "inquiry@ecomulch.co.ke",
  instagramUrl: "https://www.instagram.com/ecomulch.ke",
  linkedinUrl: "https://www.linkedin.com/company/ecomulchke/",
  youtubeUrl: "",
  facebookUrl: "https://www.facebook.com/share/12Dio55q9hD/",
};

export const SEED_PAGES: Record<string, Page> = {
  home: {
    slug: "home",
    title: "Home page",
    path: "/",
    blocks: [
      {
        id: "home-landing",
        type: "home-landing",
        data: {
          image: "/images/home-hero-mulch.jpg",
          imageAlt: "A flower bed of tropical shrubs and flowers, finished with a deep layer of bark mulch beside a paved edge",
          title: "Turning everyday green waste into healthier soil, thriving plants and more livable urban spaces.",
          buttons: [
            { label: "About EcoMulch", target: "#about", tone: "cream", icon: "people" },
            { label: "Our Work", target: "#our-work", tone: "mint", icon: "leaf-outline" },
            { label: "Our Solutions", target: "#our-solutions", tone: "blush", icon: "sprout" },
          ],
          scrollLabel: "Scroll down to explore",
        },
      },
      {
        id: "home-about",
        type: "home-about",
        data: {
          anchor: "about",
          eyebrow: "",
          heading: "About EcoMulch",
          lead: "EcoMulch is a sustainable urban greening company based in Kiambu, Kenya.",
          paragraphs: [
            { text: "We explore practical ways to make urban spaces greener and healthier by recovering useful resources from green waste, protecting soil, and developing thoughtful solutions for growing plants in built-up environments." },
            { text: "Our work brings together experimentation, learning and practical action to help people and plants thrive together." },
            { text: "Discover how EcoMulch started, why we do what we do, and the approach guiding our work." },
          ],
          buttonLabel: "Get to Know EcoMulch",
          buttonHref: "/who-we-are",
          image: "/images/home-about.jpg",
          imageAlt: "Three members of the EcoMulch team in green uniforms working with mulch in a raised bed",
          continueLabel: "Continue to Our Work",
          continueTarget: "#our-work",
        },
      },
      {
        id: "home-work",
        type: "home-cards",
        data: {
          anchor: "our-work",
          eyebrow: "",
          heading: "Our Work",
          intro: "Our work is guided by three connected priorities that address real challenges and opportunities in today’s urban environments.",
          cards: [
            {
              image: "/images/home-work-recycling-clean.jpg",
              imageAlt: "A pile of fresh garden prunings and leaves",
              title: "Recycling Green Waste",
              body: "Exploring how organic materials generated in urban areas can be recovered and transformed into useful resources.",
              linkLabel: "Learn more",
              href: "/recycling-green-waste",
            },
            {
              image: "/images/home-work-soil-clean.jpg",
              imageAlt: "A leafy plant growing in mulched soil",
              title: "Say No to Bare Soil",
              body: "Encouraging a different approach to landscaped spaces, where protecting exposed soil becomes a basic part of growing healthy plants.",
              linkLabel: "Learn more",
              href: "/say-no-to-bare-soil",
            },
            {
              image: "/images/home-work-urban-clean.jpg",
              imageAlt: "A tree-lined, planted walkway beside apartment buildings",
              title: "Greening Urban Spaces",
              body: "Understanding the challenges and opportunities of growing plants in increasingly built-up environments.",
              linkLabel: "Learn more",
              href: "/greening-urban-spaces",
            },
          ],
          continueLabel: "Continue to Our Solutions",
          continueTarget: "#our-solutions",
        },
      },
      {
        id: "home-solutions",
        type: "home-cards",
        data: {
          anchor: "our-solutions",
          eyebrow: "",
          heading: "Our Solutions",
          intro: "We offer a range of practical solutions to help homes, businesses, institutions and communities create healthier, greener and more welcoming urban spaces.",
          cards: [
            {
              image: "/images/home-sol-mulch-clean.jpg",
              imageAlt: "A plant growing through a layer of organic mulch",
              title: "Mulching Solutions",
              body: "Protect exposed soil and improve growing conditions with thoughtfully selected and installed organic mulch.",
              linkLabel: "Learn more",
              href: "/say-no-to-bare-soil/our-response/mulching-your-home",
            },
            {
              image: "/images/home-sol-beds-clean.jpg",
              imageAlt: "A flower bed full of pink and white flowers",
              title: "Flower Bed Transformations",
              body: "Bring new life to ordinary or struggling flower beds through thoughtful design, plant selection and care.",
              linkLabel: "Learn more",
              href: "/greening-urban-spaces/what-we-offer/flower-beds",
            },
            {
              image: "/images/home-sol-plants-clean.jpg",
              imageAlt: "Potted indoor plants on a sunny patio",
              title: "Indoor & Patio Plants",
              body: "Discover curated plants and arrangements suited to your home, patio or balcony and growing conditions.",
              linkLabel: "Learn more",
              href: "/greening-urban-spaces/what-we-offer/curated-plants",
            },
          ],
        },
      },
    ],
  },

  "who-we-are": {
    slug: "who-we-are",
    title: "Who We Are",
    path: "/who-we-are",
    blocks: [
      {
        id: "wwa-hero",
        type: "team-hero",
        data: {
          image: "/images/who-hero.jpg",
          imageAlt:
            "The EcoMulch team standing together in a garden, wearing EcoMulch T-shirts",
          heading:
            "We are a sustainable urban greening company based in Kiambu, Kenya.",
          ctaLabel: "Discover our story",
          ctaHref: "#explore",
        },
      },
      {
        id: "wwa-pillars",
        type: "pillar-cards",
        data: {
          items: [
            {
              image: "/images/card-origin.jpg",
              imageAlt: "Hands holding a pile of shredded mulch",
              icon: "leaf-outline",
              eyebrow: "Our Origin",
              title: "How We Started",
              body: "Our journey began in 2024 with an interest in Africa’s rapidly growing towns and cities. What began as a simple question led us to explore soil health, waste, plants and living environments—opening the door to a much wider exploration of sustainable urban greening.",
              cta: "Read our story",
              href: "/who-we-are/how-we-started",
            },
            {
              image: "/images/card-why.jpg",
              imageAlt:
                "A green, tree-filled suburb with a city skyline at sunset",
              icon: "heart-outline",
              eyebrow: "Why It Matters",
              title: "Our Why",
              body: "As towns and cities grow, we can create places that are healthier, greener and more resilient for people and nature. Sustainable urban greening helps us build living systems that thrive alongside urban development.",
              cta: "Read more",
              href: "/who-we-are/our-why",
            },
            {
              image: "/images/card-approach.jpg",
              imageAlt: "Dense planting with purple flower spikes",
              icon: "approach",
              eyebrow: "Our Approach",
              title: "Sustainable Urban Greening Principles",
              body: "There is no single formula. Our 12 Sustainable Urban Greening Principles guide how we think, design and steward living environments that support healthy soils, water, plants, people and biodiversity.",
              cta: "Explore our principles",
              href: "/who-we-are/principles",
            },
          ],
        },
      },
    ],
  },

  "recycling-green-waste": {
    slug: "recycling-green-waste",
    title: "Recycling Green Waste",
    path: "/recycling-green-waste",
    blocks: [
      {
        id: "rgw-hero",
        type: "sub-hero",
        data: {
          image: "/images/rgw-hero.jpg",
          imageAlt:
            "Discarded sugarcane, green coconut husks and pine bark heaped together",
          icon: "recycle",
          eyebrow: "Recycling Green Waste",
          title: "Giving Green Waste",
          titleAccent: "Another Life.",
          subtitle:
            "Our growing towns and cities generate large amounts of organic plant waste. What if more of those materials could be recovered and put back to useful work?",
          body: "At EcoMulch, we recover selected green-waste streams and explore how their different properties can contribute to healthier, greener urban landscapes.",
        },
      },
      {
        id: "rgw-explore",
        type: "explore-section",
        data: {
          heading: "Explore, Learn, Discover.",
          lede: "Learn more about the Green Waste Challenge in our towns and cities and discover how EcoMulch is recovering and putting selected waste streams to work.",
          items: [
            {
              image: "/images/rgw-card-challenge.jpg",
              imageAlt:
                "Discarded sugarcane waste piled at a roadside while a worker passes",
              icon: "sprout-trio",
              badgeTone: "rust",
              accent: "rust",
              title: "The Green Waste Challenge",
              kicker:
                "What happens to the organic plant waste generated by our growing towns and cities?",
              body: "Explore what we mean by green waste, where it comes from, how it is currently managed and why finding better uses for these materials is an important part of building more sustainable, healthier cities.",
              chips: [],
              cta: "Understand the challenge",
              href: "/recycling-green-waste/the-challenge",
            },
            {
              image: "/images/rgw-card-journey.jpg",
              imageAlt:
                "Sugarcane fibre, green coconut husks and pine bark side by side",
              icon: "waste",
              badgeTone: "brand",
              accent: "brand",
              title: "Our Recycling Green Waste Journey",
              kicker: "Learning from different waste streams.",
              body: "Follow our work with sugarcane peels, green coconut husks and pine bark — and discover what these very different materials have taught us about recovery, processing and reuse.",
              chips: [
                { label: "Sugarcane Peels", accent: "rust" },
                { label: "Green Coconut Husks", accent: "brand" },
                { label: "Pine Bark", accent: "rust" },
              ],
              cta: "Explore our journey",
              href: "/recycling-green-waste/our-journey/sugarcane-peels",
            },
          ],
        },
      },
      { id: "rgw-values", type: "values-strip", data: {} },
    ],
  },

  "say-no-to-bare-soil": {
    slug: "say-no-to-bare-soil",
    title: "Say No to Bare Soil",
    path: "/say-no-to-bare-soil",
    blocks: [
      {
        id: "snbs-hero",
        type: "fade-hero",
        data: {
          tone: "light",
          layout: "split",
          image: "/images/snbs-hero.jpg",
          imageAlt: "A well-planted home garden with mulched beds beside a paved path",
          eyebrow: "Say No to Bare Soil",
          title: "Soil Protection.",
          titleAccent: "Healthy Plants.",
          accentBreak: "newline",
          titleEnd: "Beautiful Landscapes.",
          subtitle: "",
          paragraphs: [
            { text: "As our towns and cities grow greener, it is easy to focus on the plants while overlooking the soil around them." },
            { text: "At EcoMulch, we believe healthy soil deserves to be covered. Through our Say No to Bare Soil campaign, we are encouraging homeowners to notice exposed soil around their homes, understand why it matters and explore practical ways to reduce it." },
          ],
        },
      },
      {
        id: "snbs-explore",
        type: "explore-cards",
        data: {
          eyebrow: "",
          heading: "Where would you like to",
          headingAccent: "explore?",
          lede: "Choose one of the options below to learn more about the bare soil challenge or to explore our response.",
          buttonStyle: "solid",
          titleSize: "large",
          surface: "tinted",
          items: [
            {
              image: "/images/snbs-card-challenge.jpg",
              imageAlt: "A planted compound with large areas of bare soil between the shrubs",
              icon: "soil",
              badge: "rust",
              accent: "rust",
              title: "The Bare Soil Challenge.",
              kicker: "Why does exposed soil matter?",
              body: "Bare soil is easy to overlook — even in otherwise green and beautifully planted homes. Explore why exposed soil matters, why it is so common and what it can mean for our plants, soil and living spaces.",
              cta: "Understand the challenge",
              href: "/say-no-to-bare-soil/the-challenge",
            },
            {
              image: "/images/snbs-card-response.jpg",
              imageAlt: "The same compound with its beds planted and covered",
              icon: "sprout-trio",
              badge: "brand",
              accent: "brand",
              title: "Our Response to the Bare Soil Challenge.",
              kicker: "From principle to practice.",
              body: "Discover how EcoMulch is helping people put the Say No to Bare Soil principle into practice. Learn how you can join the movement or work with EcoMulch to reduce bare soil in your compound.",
              cta: "Explore our response",
              href: "/say-no-to-bare-soil/our-response",
            },
          ],
        },
      },
    ],
  },

  "greening-urban-spaces": {
    slug: "greening-urban-spaces",
    title: "Greening Urban Spaces",
    path: "/greening-urban-spaces",
    blocks: [
      {
        id: "gus-intro",
        type: "intro-hero",
        data: {
          eyebrow: "",
          title: "Greening Urban Spaces",
          paragraphs: [
            { text: "As our towns and cities become more built up, creating room for plants takes greater intention. But finding space for plants is only part of the challenge. We also need to create the conditions that help them establish, thrive and remain part of our everyday surroundings." },
            { text: "At EcoMulch, our work in this area explores practical ways to bring more living green into the places where people live and work — through flower bed transformations, indoor and patio plants, and guidance on how to grow and care for plants in built-up environments." },
          ],
          image: "/images/gus3-hero.jpg",
          mobileImage: "/images/gus3-hero-m.jpg",
          imageAlt: "A mulched flower bed with daisies, red flowers and ornamental grasses in front of an apartment building",
          photo: "fade",
        },
      },
      {
        id: "gus-explore",
        type: "explore-hub",
        data: {
          heading: "Explore, Learn and Discover",
          lede: "Learn more about the challenges of urban greening and explore the solutions EcoMulch is developing.",
          challengeIcon: "city-plant",
          challengeTitle: "Understanding the Challenge",
          challengeBody: "Why growing plants in built-up environments can be difficult.",
          challengeHref: "/greening-urban-spaces/the-challenge",
          groupIcon: "hand-sprout",
          groupTitle: "Our Solutions",
          groupBody: "Explore our practical approaches to creating greener, healthier urban spaces.",
          options: [
            {
              icon: "potted-plant",
              title: "Indoor & Patio Plants",
              body: "Explore our curated plants and growing media for homes, balconies and smaller spaces.",
              href: "/greening-urban-spaces/what-we-offer/curated-plants",
            },
            {
              icon: "flower-stem",
              title: "Flower Bed Transformations",
              body: "See how we transform ordinary or struggling beds into vibrant, healthy planting spaces.",
              href: "/greening-urban-spaces/what-we-offer/flower-beds",
            },
          ],
        },
      },
    ],
  },

  blog: {
    slug: "blog",
    title: "Blog",
    path: "/blog",
    blocks: [
      {
        id: "blog-hero",
        type: "fade-hero",
        data: {
          tone: "dark",
          layout: "cover",
          image: "/images/blog-hero.jpg",
          imageAlt: "A mulched flower bed with purple and white flowers beside a paved edge",
          eyebrow: "The EcoMulch Blog",
          title: "Practical Ideas for Greener,",
          titleAccent: "Healthier Spaces",
          accentBreak: "newline",
          subtitle: "",
          paragraphs: [
            { text: "Stories, observations and practical guidance from our journey to recycle green waste, protect soil and create thriving urban environments for plants and people." },
          ],
        },
      },
    ],
  },
};

/** Pages listed in the admin even before they've been saved. */
export { SITE_MAP as PAGE_INDEX } from "./site-map";
