/*
 * Organic Soil Cover pillar (November 2026 mockups). It replaces the old
 * "Say No to Bare Soil" section, which is now a campaign under Our Response.
 * Text is transcribed from the client's mockups; prices come from the
 * mockups and the WhatsApp ordering guidance.
 */

const BASE = "/organic-soil-cover";
const RESPONSE = `${BASE}/our-response`;
export const MULCHES = `${RESPONSE}/organic-mulches`;
export const TOPPINGS = `${RESPONSE}/planter-toppings`;
export const CAMPAIGN = `${RESPONSE}/say-no-to-bare-soil`;

/* ─────────────────────────── landing ─────────────────────────── */

export const OSC_LANDING = {
  intro: {
    _label: "Hero",
    title: "Organic Soil Cover",
    paras: [
      "Creating greener, healthier and more attractive urban spaces involves caring for the soil as well as the plants. Yet in many gardens, landscapes and planters, the soil or growing medium remains exposed, with little attention given to covering it. Appropriate cover can help improve growing conditions, reduce maintenance demands and enhance the appearance of planted spaces, but its value is often overlooked.",
      "At EcoMulch, we focus on organic soil cover — the use of natural, plant-derived materials to protect and finish these exposed surfaces. Our work brings together suitable materials, practical guidance and greater awareness to help make soil cover a familiar and accessible part of everyday urban gardening and landscaping.",
    ],
    image: "/images/osc-hero.jpg",
    mobileImage: "/images/osc-hero-m.jpg",
    imageAlt: "A tree in a bed of reddish-brown organic mulch with flowering plants and a large planter",
  },
  explore: {
    _label: "Explore, Learn and Discover",
    title: "Explore, Learn and Discover",
    lede: "Understand why soil cover deserves greater attention in our urban spaces, then explore how EcoMulch is responding.",
    challenge: {
      icon: "sprout-soil",
      title: "01 — Understanding the Challenge",
      body: "Explore why soil cover is still widely overlooked in urban gardening and landscaping, and what this means for growing conditions, maintenance and appearance.",
      href: `${BASE}/the-challenge`,
    },
    response: {
      icon: "hand-sprout",
      title: "02 — Our Response",
      body: "Explore how we combine practical soil-cover products with awareness and guidance to encourage wider adoption.",
      href: RESPONSE,
    },
    options: [
      { icon: "layers", title: "Organic Mulches", body: "Explore our materials for covering soil in gardens and landscapes, and learn how to choose and order them.", href: MULCHES },
      { icon: "potted-plant", title: "Organic Planter Toppings", body: "Discover natural finishing materials for your planters and learn how to choose and order them.", href: TOPPINGS },
      { icon: "megaphone", title: "Say No to Bare Soil", body: "Explore our campaign to build awareness of soil cover and encourage its adoption.", href: CAMPAIGN },
    ],
  },
};

/* ─────────────────────────── the challenge ─────────────────────────── */

export const OSC_CHALLENGE = {
  intro: {
    _label: "Hero",
    eyebrow: "Organic Soil Cover",
    title: "The Organic Soil Cover Challenge",
    paras: [
      "More people in our towns and cities are creating and maintaining greener, more attractive spaces — from flower beds and kitchen gardens to trees, planters and garden pathways.",
      "Yet in many of these spaces, the soil remains exposed. Appropriate soil cover is still not a common part of urban gardening and landscaping, even though it can make a real difference.",
    ],
    image: "/images/oscc-hero.jpg",
    imageAlt: "Pink daisies and young plants in a mulched bed beneath a tree",
  },
  why: {
    _label: "Why does bare soil remain so common?",
    title: "Why Does Bare Soil Remain So Common?",
    lede: "Two key factors help explain why soil cover is still widely overlooked in our urban landscapes.",
    items: [
      { _tone: "mint", _color: "green", _surface: "mint", icon: "megaphone", title: "Limited Awareness", body: "Many homeowners and landscapers do not fully recognize soil cover as an important part of establishing and maintaining planted spaces." },
      { _tone: "cream", _color: "amber", _surface: "cream", icon: "layers", title: "Access and Guidance", body: "Even when people are interested in using mulch or other organic cover, it can be difficult to find suitable materials and practical advice on how to use them." },
    ],
  },
  matters: {
    _label: "Why does it matter?",
    title: "Why Does It Matter?",
    lede: "Leaving soil exposed where it could be appropriately covered can have real implications for our gardens and landscapes.",
    items: [
      { _tone: "mint", _color: "green", image: "/images/oscc-growing.jpg", imageAlt: "A young plant in bare, dry soil", icon: "hand-sprout", title: "Growing Conditions", body: "Soil can lose moisture more quickly, experience greater heat and erosion, and become less favourable for healthy, long-term plant growth." },
      { _tone: "sky", _color: "navy", image: "/images/oscc-maintenance.jpg", imageAlt: "A gloved hand pulling a weed from bare soil", icon: "droplet", title: "Maintenance and Resource Use", body: "Bare soil can encourage weeds and increase the need for watering and ongoing care, which means more time, effort and cost." },
      { _tone: "cream", _color: "amber", image: "/images/oscc-appearance.jpg", imageAlt: "A planted bed with exposed soil beside a paved edge", icon: "flower-outline", title: "Appearance and Landscape Quality", body: "The soil surface is part of the overall look of a garden. A suitable cover can create a neater, more cohesive and more attractive space." },
    ],
  },
  next: {
    _label: "How is EcoMulch responding? (link strip)",
    title: "How Is EcoMulch Responding?",
    body: "Discover how we are developing practical soil-cover solutions and encouraging wider adoption through our Say No to Bare Soil campaign.",
    cta: "Explore Our Response",
    href: RESPONSE,
  },
};

/* ─────────────────────────── our response ─────────────────────────── */

export const OSC_RESPONSE = {
  intro: {
    _label: "Hero",
    eyebrow: "Organic Soil Cover",
    title: "Our Response to the Organic Soil Cover Challenge",
    paras: [
      "As we explored the challenge of exposed soil in our urban landscapes, we began to wonder whether some of the green waste generated around us could be recovered and transformed into useful soil-cover materials.",
      "Through experimentation, we developed practical solutions for urban gardening and landscaping. We also recognized that making these materials available was only part of the answer — greater awareness of the value of soil cover was equally important. **Today, our response takes two complementary forms.**",
    ],
    image: "/images/oscr-hero.jpg",
    mobileImage: "/images/oscr-hero-m.jpg",
    imageAlt: "Young plants and pink daisies in a bed covered with organic mulch beside paving",
  },
  products: {
    _label: "01 — Developing organic soil-cover solutions",
    title: "Developing Organic Soil-Cover Solutions",
    body: "We recover and process suitable green waste — including tree bark, timber offcuts, sugarcane peels, coconut husks and pine cones — into useful soil-cover products for urban gardening and landscaping. Our products fall into two categories, each serving different needs.",
    items: [
      { _tone: "mint", icon: "layers", title: "Organic Mulches", body: "Natural organic materials for covering soil in gardens and landscapes. They help protect soil, conserve moisture, suppress weeds and provide a finished appearance.", cta: "Explore Organic Mulches", href: MULCHES },
      { _tone: "cream", icon: "potted-plant", title: "Planter Toppings", body: "Natural materials that cover exposed growing media in indoor, patio and balcony planters, providing an attractive finishing layer.", cta: "Explore Planter Toppings", href: TOPPINGS },
    ],
  },
  awareness: {
    _label: "02 — Promoting awareness and adoption",
    title: "Promoting Awareness and Adoption",
    body: "Through our Say No to Bare Soil campaign, we encourage homeowners and landscapers to recognize the benefits of appropriate soil cover and make it part of their gardening and landscaping practices.",
    cta: "Explore Say No to Bare Soil",
    href: CAMPAIGN,
  },
};

/* ─────────────────────────── ordering steps ─────────────────────────── */

const orderSteps = (first: { title: string; body: string }) => [
  { icon: "leaf-outline", ...first },
  { icon: "cart", title: "Submit Your Order Request", body: "Select your products and quantities in our WhatsApp catalogue. EcoMulch confirms availability." },
  { icon: "truck", title: "Arrange Delivery and Cost", body: "Share your delivery location, discuss delivery arrangements and receive a quotation covering the products and delivery." },
  { icon: "wallet", title: "Confirm Your Order and Pay", body: "Review the quotation and, if you’re happy to proceed, make payment using the instructions provided." },
  { icon: "package", title: "Dispatch and Delivery", body: "EcoMulch arranges dispatch and delivery according to the agreed arrangements." },
];

/* ─────────────────────────── organic mulches ─────────────────────────── */

export const OSC_MULCHES = {
  intro: {
    _label: "Introduction",
    eyebrow: "Organic Soil Cover",
    title: "Our Organic Mulches",
    paras: [
      "Organic mulch is a layer of natural material spread over the soil to protect it and improve growing conditions. Suitable mulching materials allow water to reach the soil while helping reduce moisture loss, suppress weeds and protect the soil surface. As organic mulches gradually decompose, they also add organic matter to the soil.",
      "EcoMulch produces a range of organic mulches from recovered green waste. Each mulch has its own texture, appearance and durability, giving you options to suit different greening needs.",
    ],
    listTitle: "We currently produce the following four organic mulches:",
  },
  products: {
    _label: "The four mulches",
    items: [
      { image: "/images/mul-thumb-bark.jpg", imageAlt: "Close-up of shredded bark mulch", title: "Shredded Bark Mulch", body: "Made from recovered tree bark, processed into a light, fibrous mulch with a rich brown colour that gradually darkens as it weathers.", href: `${MULCHES}/shredded-bark-mulch` },
      { image: "/images/mul-thumb-woodchips.jpg", imageAlt: "Close-up of wood chips mulch", title: "Wood Chips Mulch", body: "Made from recovered timber offcuts, processed into chips with a chunkier texture and natural wood colour.", href: `${MULCHES}/wood-chips-mulch` },
      { image: "/images/mul-thumb-miwa.jpg", imageAlt: "Close-up of Miwa mulch made from sugarcane peels", title: "Miwa Mulch", body: "Made from recovered sugarcane peels, with a light, fibrous texture that breaks down more quickly than wood-based mulches.", href: `${MULCHES}/miwa-mulch` },
      { image: "/images/mul-thumb-cocofiber.jpg", imageAlt: "Close-up of coco fiber mulch", title: "Coco Fiber Mulch", body: "Made from recovered coconut husks, with long, stringy fibers that are light, fluffy and easy to shape. It holds together well and can be reused.", href: `${MULCHES}/coco-mulch` },
    ],
  },
  process: {
    _label: "Five-step ordering process",
    title: "Interested in Our Organic Mulches?",
    lede: "To help you choose suitable materials and arrange their purchase and delivery, we’ve put together a simple five-step process that takes you from selecting your mulch to receiving it at your location.",
    steps: orderSteps({
      title: "Choose Your Mulch and Determine the Quantity",
      body: "Explore our recommendations, select the mulch or mulches you’d like to use, and use our coverage guide to work out how many bags you need.",
    }),
  },
  start: {
    _label: "Ready to get started? (link strip)",
    title: "Ready to Get Started?",
    body: "Explore our recommendations to understand which organic mulches are suitable for your needs, then estimate the quantity required before submitting your order request.",
    cta: "Get Started with Our Organic Mulches",
    href: `${MULCHES}/getting-started`,
  },
};

export const OSC_MULCH_START = {
  intro: {
    _label: "Introduction",
    title: "Getting Started with Our Organic Mulches",
    lede: "Follow our simple five-step process to work with EcoMulch on our organic mulches, starting with choosing the mulch or mulches that best meet your needs and estimating the quantity required.",
  },
  choose: {
    _label: "Step 1 — Choose your mulch",
    kicker: "Step 01 of 05",
    title: "Choose Your Organic Mulch and Determine the Quantity",
    paras: [
      "Drawing on our experience using these materials, we’ve developed recommendations to help you understand their suitability for different applications and choose the mulch or mulches that best meet your needs.",
      "Select a mulch to view our recommendations, how it behaves and suggested uses.",
    ],
    choices: [
      { icon: "leaf-outline", label: "Shredded Bark Mulch", href: `${MULCHES}/shredded-bark-mulch` },
      { icon: "layers", label: "Wood Chips Mulch", href: `${MULCHES}/wood-chips-mulch` },
      { icon: "grass", label: "Miwa Mulch", href: `${MULCHES}/miwa-mulch` },
      { icon: "coconut", label: "Coco Mulch", href: `${MULCHES}/coco-mulch` },
    ],
  },
  estimate: {
    _label: "Estimate the quantity",
    title: "Estimate the Quantity of Mulch You Need",
    paras: [
      "As a general guide, a **50**-litre bag of organic mulch covers approximately **1.5 m²** at a depth of about **5–8** cm (2–3 inches). Some applications, such as establishing seedlings with Miwa Mulch, may use thinner layers.",
      "Actual coverage varies depending on the planting arrangement, terrain and how the mulch is applied.",
      "Measure the area you want to cover, then use this guidance to estimate the number of bags you need.",
    ],
  },
  submit: {
    _label: "Step 2 — Submit your order request",
    kicker: "Step 02 of 05",
    title: "Submit Your Order Request",
    body: "Once you’ve reviewed the recommendations, selected your mulch and estimated the number of bags you need, proceed to our WhatsApp catalogue to submit your order request.",
    cta: "Ready to Submit Your Order Request on WhatsApp",
    href: "{catalogue}",
  },
};

type Photo = { image: string; imageAlt: string; title: string; caption: string };
const mulchPhotos = (n: string, list: [string, string, string][]): Photo[] =>
  list.map(([title, caption, alt], i) => ({ image: `/images/mul-${n}-${i + 1}.jpg`, imageAlt: alt, title, caption }));

const mulch = (
  title: string,
  intro: string,
  characteristics: string[],
  uses: string[],
  packaging: string,
  price: string,
  photos: Photo[],
) => ({
  intro: { _label: "Introduction", title, body: intro },
  details: {
    _label: "Characteristics, uses and price",
    characteristicsTitle: "Key Characteristics",
    characteristics,
    usesTitle: "Recommended Uses",
    uses,
    packagingTitle: "Packaging, Coverage and Price",
    packaging,
    price,
  },
  photos: { _label: "Photos", items: photos },
  next: {
    _label: "What would you like to do next?",
    title: "What Would You Like to Do Next?",
    menuLabel: "Explore Other Mulches",
    orderLabel: "Ready to Place Your Order Request?",
    orderHref: `${MULCHES}/getting-started#submit-order`,
  },
});

export const MULCH_PRODUCTS: Record<string, ReturnType<typeof mulch>> = {
  "shredded-bark-mulch": mulch(
    "Shredded Bark Mulch",
    "Shredded Bark Mulch is produced from recovered tree bark, which is processed into a light, fibrous mulch with a natural brown appearance. Its texture and colour make it an attractive option for covering exposed soil in landscaped spaces.",
    ["Freshly applied Shredded Bark Mulch has a lighter brown colour and a loose, fibrous texture that creates an attractive, natural-looking finish. With exposure to outdoor conditions, it gradually weathers into a darker, golden-brown colour over the following weeks."],
    [
      "EcoMulch recommends Shredded Bark Mulch for decorative landscaping, particularly in flower beds with upright, individual plants where gaps between plants leave the soil exposed.",
      "It can be used when establishing new flower beds or covering exposed soil in existing ones. Its natural brown colour and textured appearance give flower beds a neat, attractive finish while providing protective soil cover.",
    ],
    "Available in **50-litre bags**, with each bag covering approximately 1.5 m² at a depth of about 5–8 cm (2–3 inches), depending on application conditions.",
    "Price: KSh 900 per bag.",
    mulchPhotos("bark", [
      ["Newly Established Flower Bed", "Freshly applied Shredded Bark Mulch (lighter brown colour).", "Coneflowers in a bed of freshly applied, light brown bark mulch"],
      ["Established Flower Bed", "Weathered Shredded Bark Mulch (darker, golden-brown colour).", "Coneflowers and salvia in a bed of weathered, darker bark mulch"],
      ["Freshly Shredded Bark Mulch", "Light brown colour and loose, fibrous texture.", "Close-up of freshly shredded bark mulch"],
      ["Weathered Shredded Bark Mulch", "Darker colour after exposure to outdoor conditions.", "Close-up of weathered, darker shredded bark mulch"],
    ]),
  ),
  "wood-chips-mulch": mulch(
    "Wood Chips Mulch",
    "Wood Chips Mulch is made from recovered timber offcuts, processed into wood chips that provide a durable, natural soil cover. It is available in two grades — Medium and Small — which are suited to different applications.",
    [
      "The Medium grade is made up of larger, coarser chips with a chunky texture, while the Small grade is made up of finer, smaller chips with a more even texture.",
      "Wood Chips Mulch starts off with a natural woody appearance when freshly applied and weathers gradually to a softer greyish-brown colour as it is exposed to the elements. It is a very durable mulch that maintains good soil cover over an extended period of time.",
    ],
    [
      "EcoMulch recommends using the **Medium** Wood Chips around mature trees and for garden pathways to cover the soil and provide a sturdy, natural cover.",
      "The **Small** Wood Chips are recommended for use in flower beds, especially in more established beds with woody species such as hedges and bushes, where they provide a neater, finer finish.",
    ],
    "Available in **50-litre bags** in both Small and Medium grades. Each bag covers approximately **1.5 m²**, depending on application conditions and depth.",
    "Price: KSh 700 per bag (both grades).",
    mulchPhotos("woodchips", [
      ["Medium Wood Chips — Around Trees", "A durable cover for established trees.", "Medium wood chips spread around the base of a tree"],
      ["Medium Wood Chips — Garden Pathway", "A natural, sturdy surface for pathways.", "A garden pathway surfaced with medium wood chips"],
      ["Small Wood Chips — Flower Bed", "A neater cover for established flower beds.", "Small wood chips around orange flowers in a bed"],
      ["Small Wood Chips — Beneath Hedges", "Provides a clean, natural soil cover for hedges and bushes.", "Small wood chips covering the soil beneath a hedge"],
    ]),
  ),
  "miwa-mulch": mulch(
    "Miwa Mulch",
    "Miwa Mulch is made from recovered sugarcane peels, processed into a light, fibrous mulch. It has a straw-like appearance and is a natural, organic option for covering soil in gardens and landscaped spaces.",
    ["Miwa Mulch has a light, fibrous texture with a natural, straw-like appearance. It breaks down more quickly than wood-based mulches, gradually adding organic matter to the soil as it decomposes."],
    [
      "EcoMulch recommends Miwa Mulch when establishing newly planted grass and ground cover plants where the vegetation is expected to grow and eventually cover the soil.",
      "It can also be used when establishing seedlings or as an ongoing mulch around growing crops, particularly in kitchen gardens around lower-growing crops such as parsley and cilantro.",
    ],
    "Miwa Mulch is available in **50-litre bags**, with each bag covering approximately **1.5 m²**, depending on application conditions and depth.",
    "Price: KSh 600 per bag.",
    mulchPhotos("miwa", [
      ["Establishing a Lawn", "Miwa Mulch applied in a thin layer (about 1–2 inches) around newly planted grass.", "Young grass growing through a thin layer of Miwa mulch"],
      ["Establishing Groundcover", "Miwa Mulch applied at about 2–3 inches around groundcover plants that will eventually cover the soil.", "Purple-flowered groundcover in Miwa mulch"],
      ["Establishing Seedlings", "A thin layer (about 1 inch) of Miwa Mulch used when planting seedlings from seed.", "Seedlings emerging through a thin layer of Miwa mulch"],
      ["Kitchen Garden Mulching", "Miwa Mulch used around lower-growing kitchen garden crops, such as parsley and cilantro, to provide soil cover.", "Parsley growing in Miwa mulch"],
    ]),
  ),
  "coco-mulch": mulch(
    "Coco Mulch",
    "Coco Mulch is made from recovered green coconut husks, with long, stringy fibers that are light, fluffy and easy to shape. The fibers hold together well and can be reused, providing a durable, natural soil cover for gardens and growing areas.",
    ["Coco Mulch has long, intertwined fibers that are light, fluffy and easy to shape. It also takes a long time to decompose, making it a durable mulch for covering the soil."],
    ["EcoMulch recommends Coco Mulch for urban kitchen gardens, both for covering soil between planting cycles and for mulching around established plants. It helps conserve moisture, suppress weeds, and reduce soil splash, keeping vegetables cleaner during watering and rainfall. It can be reused, as it is easy to pick up, put aside and return to the soil."],
    "Coco Mulch is available in **50-litre bags**, with each bag covering approximately **1.5 m²**, depending on application conditions and depth.",
    "Price: KSh 600 per bag.",
    mulchPhotos("coco", [
      ["Covered Bed Between Planting Cycles", "Coco Mulch used to cover and protect the soil when beds are not in use.", "A raised bed covered with coco mulch between plantings"],
      ["Around Established Vegetables", "Coco Mulch applied around growing vegetables to conserve moisture and keep leaves cleaner.", "Leafy vegetables growing in coco mulch"],
      ["Lifting the Mulch", "Easily lifted and set aside when preparing the bed for planting.", "A hand lifting a mat of coco mulch"],
      ["Reusing the Mulch", "Can be moved and reused over multiple growing cycles.", "Seedlings growing through reused coco mulch"],
    ]),
  ),
};

/* ─────────────────────────── planter toppings ─────────────────────────── */

export const OSC_TOPPINGS = {
  intro: {
    _label: "Introduction",
    eyebrow: "Organic Soil Cover",
    title: "Our Organic Planter Toppings",
    paras: [
      "Organic planter toppings are natural, plant-derived materials placed over the exposed growing medium in plant containers. They provide a finishing layer that improves the appearance of planters, often adding a softer, more natural look, while helping protect the growing medium, reduce moisture loss and limit surface disturbance during watering.",
      "Organic planter toppings come in different colours, textures and forms, ranging from chunky pieces to fine fibres. Their appearance, durability and handling characteristics influence the finish they create. At EcoMulch, we recover and process green waste into a range of organic planter toppings, each with its own distinctive characteristics.",
    ],
    listTitle: "We currently produce the following four organic planter toppings:",
  },
  products: {
    _label: "The four planter toppings",
    items: [
      { image: "/images/top-cocochips-1.jpg", imageAlt: "Close-up of coco chips", title: "Coco Chips", body: "Coco Chips are small pieces of the hard outer shell of a coconut, recovered from green coconut husks. They have a warm brown colour and a chunky, textured appearance that creates a natural-looking finish.", href: `${TOPPINGS}/coco-chips` },
      { image: "/images/top-pinecone-1.jpg", imageAlt: "Close-up of pine cone flakes", title: "Pine Cone Flakes", body: "Pine Cone Flakes are woody flakes made from recovered pine cones. They have a distinctive, natural appearance with rich, earthy brown tones that blend beautifully with the growing medium, giving planters a clean, subtle and natural look.", href: `${TOPPINGS}/pine-cone-flakes` },
      { image: "/images/top-cocofiber-1.jpg", imageAlt: "Close-up of coco fiber", title: "Coco Fiber", body: "Coco Fiber is a soft, lightweight material made from recovered green coconut husks. Its stringy, fibrous texture creates a light, airy and natural-looking cover for planters.", href: `${TOPPINGS}/coco-fiber` },
      { image: "/images/top-barkfiber-1.jpg", imageAlt: "Close-up of bark fiber", title: "Bark Fiber", body: "Bark Fiber is a natural, stringy material made from recovered tree bark. Its distinctive reddish-brown colour and fibrous texture create a natural-looking cover for planters.", href: `${TOPPINGS}/bark-fiber` },
    ],
  },
  process: {
    _label: "Five-step ordering process",
    title: "Interested in Our Organic Planter Toppings?",
    lede: "To help you choose suitable materials and arrange their purchase and delivery, we’ve put together a simple five-step process that takes you from selecting your planter topping to receiving it at your location.",
    steps: orderSteps({
      title: "Choose Your Planter Topping and Quantity",
      body: "Explore our four planter toppings, see how they look in use, and choose the one(s) you like. Select a package size that suits your needs.",
    }),
  },
  start: {
    _label: "Ready to get started? (link strip)",
    title: "Ready to Get Started?",
    body: "Explore our organic planter toppings, choose the finish you prefer and select a package size that suits your needs.",
    cta: "Get Started with Our Organic Planter Toppings",
    href: `${TOPPINGS}/getting-started`,
  },
};

export const OSC_TOPPING_START = {
  intro: {
    _label: "Introduction",
    title: "Getting Started with Our Organic Planter Toppings",
    lede: "Follow our simple five-step process to work with EcoMulch on our organic planter toppings, starting with choosing the finish you prefer and deciding on the package size and quantity you need.",
  },
  choose: {
    _label: "Step 1 — Choose your planter topping",
    kicker: "Step 01 of 05",
    title: "Choose Your Organic Planter Topping and Determine the Quantity",
    paras: [
      "Choosing a planter topping is largely a matter of personal preference. Consider the plant, the planter, the surrounding space and the overall look and feel you would like to create.",
      "To help you decide, we’ve provided photographs of each planter topping used with different plants and containers.",
      "Select a planter topping to see photographs, learn more about its appearance and explore the finish you prefer.",
    ],
    choices: [
      { icon: "coconut", label: "Coco Chips", href: `${TOPPINGS}/coco-chips` },
      { icon: "pine-cone", label: "Pine Cone Flakes", href: `${TOPPINGS}/pine-cone-flakes` },
      { icon: "fiber-coil", label: "Coco Fiber", href: `${TOPPINGS}/coco-fiber` },
      { icon: "bark-slab", label: "Bark Fiber", href: `${TOPPINGS}/bark-fiber` },
    ],
  },
  packages: {
    _label: "Package sizes and prices",
    title: "Choose Your Package Size and Quantity",
    lede: "Our planter toppings are available in the following package sizes and prices.",
    columns: ["Planter Topping", "Smaller Package", "Larger Package"],
    rows: [
      { name: "Coco Chips", smaller: "5 litres – KSh 300", larger: "10 litres – KSh 500" },
      { name: "Pine Cone Flakes", smaller: "5 litres – KSh 300", larger: "10 litres – KSh 500" },
      { name: "Coco Fiber", smaller: "10 litres – KSh 500", larger: "20 litres – KSh 900" },
      { name: "Bark Fiber", smaller: "10 litres – KSh 500", larger: "20 litres – KSh 900" },
    ],
  },
  estimate: {
    _label: "Estimating the quantity",
    title: "Estimating the Quantity You Need",
    body: "The amount you need depends on the number and size of your planters, the amount of exposed growing medium and how thickly you apply the topping.",
    tip: "If you’re unsure, **consider starting with the smaller package** to see how far it goes. You can also contact EcoMulch on WhatsApp, share photographs of your planters and ask for guidance.",
  },
  submit: {
    _label: "Step 2 — Submit your order request",
    kicker: "Step 02 of 05",
    title: "Submit Your Order Request",
    body: "Once you’ve chosen your preferred planter topping, selected a package size and decided how many packs you need, proceed to our WhatsApp catalogue to submit your order request.",
    cta: "Ready to Submit Your Order Request on WhatsApp",
    href: "{catalogue}",
  },
};

const topping = (key: string, title: string, intro: string, plural = false) => ({
  intro: {
    _label: "Introduction",
    title,
    body: intro,
    lead: `Please see below for examples where ${title} ${plural ? "have" : "has"} been used as a planter topping.`,
  },
  photos: {
    _label: "Photos",
    items: [
      `Close-up of ${title}`,
      `${title} in a foliage planter`,
      `${title} with flowering plants`,
      `${title} in a patio setting`,
      `${title} in a decorative planter`,
      `${title} with architectural plants`,
    ].map((caption, i) => ({ image: `/images/top-${key}-${i + 1}.jpg`, imageAlt: caption, caption })),
  },
  next: {
    _label: "What would you like to do next?",
    title: "What Would You Like to Do Next?",
    menuLabel: "Explore Other Planter Toppings",
    orderLabel: "Ready to Place Your Order Request?",
    orderHref: `${TOPPINGS}/getting-started#submit-order`,
  },
});

export const TOPPING_PRODUCTS: Record<string, ReturnType<typeof topping>> = {
  "coco-chips": topping(
    "cocochips",
    "Coco Chips",
    "Coco Chips are small pieces of the hard outer shell of a coconut, recovered from green coconut husks. They are natural, durable chips with a warm brown colour and a chunky, textured appearance.",
  ),
  "pine-cone-flakes": topping(
    "pinecone",
    "Pine Cone Flakes",
    "Pine Cone Flakes are woody flakes made from recovered pine cones. They have a distinctive, natural appearance with rich, earthy brown tones that blend beautifully with the growing medium, giving planters a clean, subtle and natural look.",
    true,
  ),
  "coco-fiber": topping(
    "cocofiber",
    "Coco Fiber",
    "Coco Fiber is a soft, lightweight material made from recovered green coconut husks. It has a stringy, fibrous texture that creates a light, airy and natural-looking cover for planters.",
  ),
  "bark-fiber": topping(
    "barkfiber",
    "Bark Fiber",
    "Bark Fiber is a natural, stringy material made from recovered tree bark. It has a distinctive reddish-brown colour and a fibrous texture that creates a natural-looking cover for planters.",
  ),
};

/* ─────────────────────────── Say No to Bare Soil campaign ─────────────────────────── */

export const OSC_CAMPAIGN = {
  intro: {
    _label: "Introduction",
    eyebrow: "Our Response",
    title: "Say No to Bare Soil",
    paras: [
      "The Say No to Bare Soil campaign encourages people to recognize exposed soil as a challenge for sustainable urban greening and take practical action to protect it.",
      "Bare soil is a common sight in our urban gardens and landscapes. Yet leaving soil exposed can contribute to moisture loss, erosion and poor growing conditions for plants. Through this campaign, we aim to raise awareness and encourage the adoption of appropriate soil-cover practices — from organic mulches and grass clippings to living groundcovers — that keep soil covered and create healthier, more attractive urban spaces.",
    ],
  },
  movement: {
    _label: "Be a part of the movement",
    title: "Be a Part of the Movement.",
    paras: [
      "At EcoMulch, we are seeking to build a growing movement to broaden awareness of the bare soil challenge and to help increase the adoption of soil protection practices in urban gardens and landscapes.",
      "**There are two ways you can be part of this movement:** learn, practice and advocate for better soil protection, or help spread the message through our campaign merchandise.",
    ],
  },
  learn: {
    _label: "1 — Learn. Practice. Advocate.",
    title: "Learn. Practice. Advocate.",
    rows: [
      { icon: "youtube", _color: "red", text: "**Learn** by following EcoMulch’s YouTube playlist on Say No to Bare Soil, where we highlight the challenge, explore opportunities and share practical ways to keep soil covered." },
      { icon: "sprout", _color: "green", text: "**Practice** what you learn in your own garden, landscape or planted spaces. Start small, learn from the experience and look for more ways to address exposed soil over time." },
      { icon: "megaphone", _color: "green", text: "**Advocate** by encouraging family, friends and your community to see bare soil as a challenge and to protect soil through appropriate cover." },
    ],
    image: "/images/snbs3-youtube.jpg",
    imageAlt: "A phone showing EcoMulch’s Say No to Bare Soil video on YouTube",
    cta: "Explore Our YouTube Playlist",
    href: "{snbsPlaylist}",
  },
  spread: {
    _label: "2 — Spread the message",
    title: "Spread the Message.",
    body: "Help broaden awareness of the bare soil challenge and the importance of soil cover by getting our merchandise that carries the message of Say No to Bare Soil. Our merchandise includes:",
    items: [
      "**A safari hat** for when you’re working outdoors in the sun.",
      "**A T-shirt** that you can wear for everyday, casual occasions.",
      "**An apron** that you can wear while doing garden work around your compound.",
    ],
    closing: "Our campaign merchandise offers a simple way to make the message more visible in your community, start conversations about protecting soil and support EcoMulch’s awareness and education efforts.",
    image: "/images/snbs3-merch.jpg",
    imageAlt: "A safari hat, T-shirt and apron printed with “Say No to Bare Soil”",
    cta: "Check Out Our Merchandise on WhatsApp",
    href: "{catalogue}",
  },
};
