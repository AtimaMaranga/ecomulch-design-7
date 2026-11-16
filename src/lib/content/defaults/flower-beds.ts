/*
 * Transforming Urban Flower Beds. Simplified in November 2026 to one page
 * the visitor scrolls through: introduction and challenges, our approach,
 * "Have a flower bed you'd like to transform?" and From Ordinary to Amazing.
 * Section keys were renamed with each restructure so older saved copies
 * can't override it.
 */
export const FLOWER_BEDS = {
  intro: {
    _label: "Hero",
    eyebrow: "Greening Urban Spaces",
    title: "Transforming Urban Flower Beds",
    paras: [
      "As our towns and cities become more built up, the spaces around our homes where plants can grow in the ground are increasingly limited. That makes the flower beds we do have all the more valuable.",
      "But having a flower bed does not automatically mean having a thriving flower bed. At EcoMulch, we work to create healthier, more attractive flower beds through thoughtful plant selection, improved growing conditions, soil protection and ongoing care.",
    ],
    image: "/images/fb4-hero.jpg",
    imageAlt: "A mulched flower bed of pink, red and white daisies beside a paved edge",
  },
  challenges: {
    _label: "Common challenges",
    title: "Some of the challenges we commonly encounter include:",
    lede: "Even a small flower bed can present real challenges — from the condition of the soil and the plants we choose, to how those plants are arranged, how exposed soil is managed and how the bed is cared for over time.",
    items: [
      { _tone: "peach", _color: "green", icon: "sprout-soil", title: "Growing Conditions", body: "Soil may be poor, compacted, low in organic matter or affected by previous construction and other activity." },
      { _tone: "mint", _color: "green", icon: "leaf-pair", title: "Plant Selection", body: "Plants may not be well suited to the available light, space, moisture conditions or other characteristics." },
      { _tone: "sky", _color: "green", icon: "sprout-trio", title: "Plant Arrangement", body: "Plants may not be arranged to make the best use of a limited space, accommodate their mature size or create the desired effect." },
      { _tone: "lilac", _color: "brown", icon: "bare-soil", title: "Bare Soil", body: "Soil left exposed between and around plants can lose moisture, support weeds and leave the growing environment less protected." },
    ],
  },
  method: {
    _label: "Our approach (six steps)",
    title: "Our Approach to Transforming Flower Beds",
    body: "Creating a successful flower bed involves more than planting a few flowers. It starts with understanding the space, preparing it for healthy growth, selecting and arranging suitable plants, protecting the soil and caring for the bed as it establishes and develops.",
    steps: [
      { _tone: "peach", _color: "green", icon: "clipboard-check", title: "Assess", body: "Understand your space, its conditions and your goals." },
      { _tone: "mint", _color: "green", icon: "brush", title: "Design", body: "Plan a flower bed that suits your space and needs." },
      { _tone: "sky", _color: "navy", icon: "trowel", title: "Prepare", body: "Get the bed ready for healthy plant growth." },
      { _tone: "mint", _color: "green", icon: "leaf-pair", title: "Plant", body: "Select and add suitable plants for lasting impact." },
      { _tone: "peach", _color: "brown", icon: "mulch-pile", title: "Cover", body: "Protect and improve the soil with a suitable mulch." },
      { _tone: "lilac", _color: "purple", icon: "sprout-trio", title: "Steward", body: "Care for the bed so it stays healthy and attractive over time." },
    ],
  },
  talk: {
    _label: "Have a flower bed? (WhatsApp)",
    title: "Have a Flower Bed You’d Like to Transform?",
    paras: [
      "Whether you’re creating a new flower bed or improving an existing one, we’d love to hear about your space.",
      "Tell us a little about your flower bed and what you’d like to achieve. We can discuss your needs, explain our approach and explore the next steps together.",
    ],
    cta: "Chat with Us on WhatsApp",
    ctaHref: "{whatsapp}",
    image: "/images/fb4-transform.jpg",
    imageAlt: "Pink daisies in a freshly mulched flower bed beside a paved path",
    area: "Our flower-bed transformation service is currently available in **Nairobi and Kiambu**.",
  },
  showcase: {
    _label: "From Ordinary to Amazing (YouTube)",
    divider: "Or, see how we transform flower beds in practice",
    beforeImage: "/images/fb2-before.jpg",
    beforeAlt: "A sparse flower bed with bare soil, before",
    beforeLabel: "Before",
    afterImage: "/images/fb2-after.jpg",
    afterAlt: "The same bed planted and mulched, after",
    afterLabel: "After",
    title: "From Ordinary to Amazing",
    body: "Follow the transformation of our own flower beds as we experiment, learn and share what it takes to create healthier, more attractive planted spaces.",
    cta: "Watch Our Transformations on YouTube",
    ctaHref: "{flowerBedsVideo}",
  },
};
