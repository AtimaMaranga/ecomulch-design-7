/*
 * Curated Indoor & Patio Plants. Rebuilt in November 2026 as one scrolling
 * page from the client's three-part mockup: introduction and challenges, our
 * approach, and what we offer. Section keys were renamed with the rebuild so
 * older saved copies can't override it.
 */
export const CURATED_PLANTS = {
  intro: {
    _label: "Hero",
    eyebrow: "Greening Urban Spaces",
    title: "Curated Indoor & Patio Plants",
    paras: [
      "As our towns and cities become more built up, many homes have little or no ground available for planting. But that doesn’t mean there are no opportunities for greenery. Indoor spaces, patios, balconies, windowsills and walls can all accommodate plants grown in containers.",
      "Many people are already growing plants in containers at home. But doing so successfully comes with its own set of challenges.",
    ],
    image: "/images/cp3-hero.jpg",
    imageAlt: "Flowering pots, foliage plants and a hanging basket on a sunny balcony",
  },
  challenges: {
    _label: "Common challenges",
    title: "Some of the challenges we commonly encounter include:",
    items: [
      { _tone: "mint", _color: "green", icon: "leaf-pair", title: "Finding the Right Plants", body: "With so many choices at nurseries, it can be overwhelming to find plants that suit your space and growing conditions." },
      { _tone: "peach", _color: "green", icon: "potted-plant", title: "Creating Suitable Growing Conditions", body: "Container plants depend on the right container, growing media, drainage, watering and nutrients to thrive." },
      { _tone: "sky", _color: "green", icon: "house-outline", title: "Finding Space and Making It Work", body: "Identifying where plants can go and how to display them — including containers, hooks or brackets — can be a challenge, especially in limited spaces." },
      { _tone: "lilac", _color: "purple", icon: "hand-sprout", title: "Helping Plants Establish and Thrive", body: "Plants may look healthy at the nursery but struggle after being brought home. Repotting, changes in light and ongoing care can all affect their success." },
    ],
  },
  approach: {
    _label: "Our approach",
    eyebrow: "Growing Greenery in Urban Spaces",
    title: "Our Approach",
    body: "At EcoMulch, we take a practical, step-by-step approach to introducing and sustaining greenery in the constrained spaces of urban homes. It is our response to the common challenges of choosing, preparing, growing and caring for plants in containers.",
    image: "/images/cp3-approach.jpg",
    imageAlt: "A hanging flower basket, potted plants and wall-mounted planters on a balcony",
    stepsTitle: "A thoughtful, six-step approach",
    stepsLede: "To address the challenges of growing plants in containers, we consider a complete process — from finding opportunities for greenery to helping you care for your plants over time.",
    steps: [
      { _tone: "mint", _color: "green", icon: "house-outline", title: "Identify Opportunities", body: "Explore where greenery can be introduced in indoor spaces, patios, balconies, walls and other areas with little or no ground." },
      { _tone: "peach", _color: "green", icon: "leaf-pair", title: "Select & Curate", body: "Choose suitable plants and develop thoughtful combinations based on growing conditions, form and appearance." },
      { _tone: "sky", _color: "green", icon: "potted-plant", title: "Source & Propagate", body: "Source healthy plants or propagate our own to obtain suitable planting material." },
      { _tone: "mint", _color: "green", icon: "trowel", title: "Prepare & Nurture", body: "Choose practical containers and suitable growing media, then pot and nurture plants as they establish." },
      { _tone: "lilac", _color: "purple", icon: "flower-stem", title: "Place & Present", body: "Consider placement, arrangements, supports, installation and finishing touches for attractive, practical displays." },
      { _tone: "cream", _color: "green", icon: "hand-sprout", title: "Guide & Steward", body: "Provide plant care guidance and help you maintain, refresh or replace your plants when needed." },
    ],
  },
  offer: {
    _label: "What we offer",
    eyebrow: "Container Plants for Urban Spaces",
    title: "What We Offer",
    lede: "Bring more greenery into your home with thoughtfully curated plants and practical solutions for displaying them. Choose from our available collections designed for urban spaces, with optional professional installation for selected plants and arrangements.",
  },
  primary: {
    _label: "Our primary offering",
    label: "Our Primary Offering",
    title: "Curated Indoor & Patio Plants",
    body: "Choose from our selection of indoor plants, patio and balcony plants, hanging flower baskets and cute little succulents. Our plants are thoughtfully selected, prepared and nurtured for urban environments, and are available individually or in coordinated collections.",
    cta: "Explore Our Plants and Collections",
    ctaHref: "{catalogue}",
    features: [
      { icon: "sprout", text: "Individual plants or collections" },
      { icon: "truck", text: "Delivery to your home" },
      { icon: "document", text: "Care guidance included" },
    ],
    items: [
      { image: "/images/cp3-indoor.jpg", imageAlt: "Leafy indoor plants in white pots", title: "Indoor Plants", body: "Bring natural beauty into your living spaces." },
      { image: "/images/cp3-patio.jpg", imageAlt: "Flowering plants in terracotta pots on a patio", title: "Patio & Balcony Plants", body: "Add colour and life to your outdoor spaces." },
      { image: "/images/cp3-hanging.jpg", imageAlt: "A hanging basket of pink flowers", title: "Hanging Flower Baskets", body: "Make the most of overhead and vertical spaces." },
      { image: "/images/cp3-succulents.jpg", imageAlt: "Small succulents in square pots", title: "Cute Little Succulents", body: "Small plants with big possibilities for urban homes." },
    ],
  },
  install: {
    _label: "Additional service: installation",
    label: "Additional Service",
    title: "Professional Plant Installation",
    body: "For selected plants and arrangements that need to be mounted or hung, we offer professional installation to help you display them safely and attractively. This service is available for plants purchased from EcoMulch and is quoted separately based on your location and installation requirements.",
    image: "/images/cp3-install.jpg",
    imageAlt: "A hanging basket of pink flowers on a wall bracket",
    points: [
      { icon: "wrench", text: "Installation for hanging baskets and wall-mounted arrangements" },
      { icon: "map-pin", text: "Quoted based on your location, number of plants and requirements" },
      { icon: "shield", text: "Professional and careful installation" },
    ],
    cta: "Ask About Installation",
    ctaHref: "{whatsapp}",
  },
};
