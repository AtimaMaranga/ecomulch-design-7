/*
 * The Urban Greening Challenge. Restructured in November 2026 (client
 * revisions): a plain-title hero, an "Explore the Challenge" list that jumps
 * to the three sections, then the sections themselves. Section keys were
 * renamed with the restructure so older saved copies can't override it.
 */
export const GUS_CHALLENGE = {
  intro: {
    _label: "Hero",
    eyebrow: "Greening Urban Spaces",
    title: "The Urban Greening Challenge",
    paras: [
      "Buildings, roads, parking areas and other hard surfaces are occupying more of the spaces around us. Yet people are finding ways to bring plants into the places where they live — in their homes and compounds, on balconies and patios, and wherever space can be found.",
      "**But finding room for plants is only one part of the challenge. Creating the conditions for those plants to thrive is another.**",
    ],
    image: "/images/gusc3-hero.jpg",
    mobileImage: "/images/gusc3-hero-m.jpg",
    imageAlt: "A sunny balcony with a wicker chair and flowering potted plants, apartment blocks behind",
  },
  explore: {
    _label: "Explore the Challenge (links to the sections below)",
    title: "Explore the Challenge",
    lede: "Discover the two growing situations we face and what plants need to thrive in built-up environments.",
    options: [
      { _tone: "mint", icon: "potted-plant", title: "Where we grow plants", href: "#where-we-grow-plants" },
      { _tone: "cream", icon: "hand-sprout", title: "What growing plants requires", href: "#what-growing-plants-requires" },
      { _tone: "mint", icon: "city-plant", title: "How EcoMulch is responding", href: "#how-ecomulch-is-responding" },
    ],
  },
  growing: {
    _label: "Where we grow plants",
    title: "Making Room for Plants Is Only the Beginning.",
    lede: "Growing plants in today’s urban environments comes with real challenges. As available growing space becomes more constrained, we increasingly find ourselves growing plants in two very different situations.",
    situations: [
      {
        _tone: "mint",
        image: "/images/gusc3-noground.jpg",
        imageAlt: "Potted flowering plants and a wicker chair on a city balcony",
        title: "Where there is little or no ground.",
        body: "Indoor spaces, balconies, patios, entrances and paved areas often mean growing plants in containers. A container has to provide much of what the ground would normally provide — space for roots, water, drainage, nutrients and physical support.",
        highlight: "Creating the right growing environment can be challenging.",
      },
      {
        _tone: "peach",
        image: "/images/gusc3-ground.jpg",
        imageAlt: "A mulched flower bed of red, orange and white flowers along a paved walkway",
        title: "Where there is ground.",
        body: "The ground that remains for planting is often limited to flower beds and other relatively small spaces surrounded by buildings, paving and other uses. Soil condition, available space, plant selection, arrangement, soil cover and ongoing care can all influence whether these spaces thrive.",
        highlight: "",
      },
    ],
    statement: "When these growing environments don’t work well, plants struggle, require more intervention or have to be replaced — making it harder and more costly to create the greenery we want around our homes.",
  },
  needs: {
    _label: "What growing plants requires",
    title: "The Challenge Is Also an Opportunity.",
    body: "As we rethink how plants fit into increasingly built-up environments, we also have an opportunity to make better choices about how we green our homes. Creating growing environments that work well means thinking not only about the plants themselves, but also about the resources they depend on and the care they will need over time.",
    listTitle: "That means paying attention to four things in particular:",
    items: [
      { _tone: "sky", _color: "navy", icon: "droplet", title: "Water Use & Efficiency", body: "Using water thoughtfully and choosing plants and growing approaches appropriate to their conditions." },
      { _tone: "mint", _color: "green", icon: "sprout-soil", title: "Growing Resources", body: "Creating healthy growing environments while making responsible use of soil and other resources." },
      { _tone: "peach", _color: "green", icon: "leaf-pair", title: "Plant Suitability", body: "Choosing plants suited to the light, space, exposure and other conditions where they will grow." },
      { _tone: "lilac", _color: "navy", icon: "trowel", title: "Ongoing Care", body: "Planning for realistic care so plants can establish, thrive and remain part of the space over time." },
    ],
    statement: "For us, sustainable urban greening is not simply about adding more plants. It is about creating better conditions for plants and people to thrive together in increasingly built-up spaces.",
  },
  response: {
    _label: "How EcoMulch is responding",
    title: "How Is EcoMulch Responding to the Urban Greening Challenge?",
    body: "We are developing practical solutions to help homeowners create better growing environments for plants in and around their homes.",
    areasLabel: "Explore our two areas of work",
    areas: [
      {
        image: "/images/gusc3-area-plants.jpg",
        imageAlt: "Potted foliage plants and pink flowers on a sunny patio",
        title: "Curated Indoor & Patio Plants",
        body: "Helping you choose plants and growing environments that work.",
        cta: "Explore curated plants",
        href: "/greening-urban-spaces/what-we-offer/curated-plants",
      },
      {
        image: "/images/gusc3-area-beds.jpg",
        imageAlt: "A mulched flower bed of pink, red and white flowers beside paving",
        title: "Transforming Urban Flower Beds",
        body: "Turning ordinary flower beds into healthy, well-covered spaces.",
        cta: "Explore flower beds",
        href: "/greening-urban-spaces/what-we-offer/flower-beds",
      },
    ],
  },
};
