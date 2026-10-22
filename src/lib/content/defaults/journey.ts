const step = (s: Partial<JourneyStepContent> & { title: string }): JourneyStepContent => ({
  _aspect: "aspect-[16/10]",
  paras: [],
  quote: "",
  image: "",
  imageAlt: "",
  cards: [],
  highlight: "",
  next: { title: "", paras: [], label: "", href: "" },
  ...s,
});

export type JourneyStepContent = {
  _aspect: string;
  title: string;
  paras: string[];
  quote: string;
  image: string;
  imageAlt: string;
  cards: { image: string; imageAlt: string; title: string; body: string }[];
  highlight: string;
  next: { title: string; paras: string[]; label: string; href: string };
};

/** Shared header and stream selector used by all three journey pages. */
export const JOURNEY_SHARED = {
  header: {
    _label: "Page header",
    title: "Our Recycling Green Waste Journey",
    intro: "We have explored three different green-waste streams, each with its own characteristics, challenges and possibilities. What started as discarded materials has led to new insights, practical solutions and a deeper understanding of how organic resources can contribute to greener, healthier urban spaces.",
    prompt: "Select a waste stream below to explore our journey.",
  },
  streams: {
    _label: "Waste-stream selector cards",
    sugarcane: { _label: "Sugarcane Peels card", name: "Sugarcane Peels", line: "From a common waste stream to a specialized soil-cover material.", image: "/images/stream-sugarcane.jpg", imageAlt: "A heap of shredded sugarcane peels" },
    coconut: { _label: "Green Coconut Husks card", name: "Green Coconut Husks", line: "One discarded material. Many possibilities.", image: "/images/stream-coconut.jpg", imageAlt: "A pile of green coconuts" },
    pine: { _label: "Pine Bark card", name: "Pine Bark", line: "A sawmill residue with new potential.", image: "/images/stream-pine.jpg", imageAlt: "Close-up of pine bark pieces" },
  },
  seriesBox: {
    _label: "“Want to know the full story?” box",
    title: "Want to know the full story?",
    ctaHref: "/blog",
  },
};

const series = (body: string, cta: string) => ({ _label: "Blog series box", body, cta });

export const JOURNEY_SUGARCANE = {
  headline: "A common waste stream. A different possibility.",
  steps: [
    step({
      _aspect: "aspect-[401/223]",
      title: "We noticed an overlooked waste stream",
      paras: [
        "Sugarcane peels are a common sight in and around Nairobi. Vendors peel the cane for customers, leaving behind fibrous peels that are often difficult to manage. We first became interested in them while looking for carbon-rich material for our composting experiments.",
        "But the tough, fibrous peels decomposed much more slowly than we expected. That led us to ask a different question:",
      ],
      quote: "Could the very characteristic that made sugarcane peels difficult to compost make them useful as mulch?",
      image: "/images/miwa-noticed.jpg",
      imageAlt: "A heap of fibrous sugarcane peels left at a vendor’s stall",
    }),
    step({
      _aspect: "aspect-[403/173]",
      title: "We experimented — and found a use",
      paras: [
        "We began shredding and processing the peels and eventually developed what we call [Miwa Mulch](/say-no-to-bare-soil).",
        "Continued use taught us that Miwa isn’t a mulch for every situation. Its decomposition characteristics make it particularly useful as a transitional soil cover — for example, while grass, seedlings or living groundcover become established.",
      ],
      image: "/images/miwa-experiment.jpg",
      imageAlt: "Seedlings growing through a layer of shredded sugarcane mulch",
    }),
    step({
      title: "What we learned",
      paras: [
        "Our experience with sugarcane peels has taught us the value of staying curious, observing how materials behave and being willing to change our assumptions. We started by thinking sugarcane peel might be useful for compost, then explored it as a general mulch, and through continued learning we discovered its more specialized uses.",
      ],
      next: {
        title: "One waste stream led us to another.",
        paras: [
          "As we collected sugarcane peels, we kept encountering another abundant material — [green coconut husks](/recycling-green-waste/our-journey/green-coconut-husks). Some of the same vendors who sell sugarcane also sell madafu, and that observation opened the next chapter of our journey.",
        ],
        label: "Explore Green Coconut Husks",
        href: "/recycling-green-waste/our-journey/green-coconut-husks",
      },
    }),
  ],
  series: series(
    "We’ve documented our sugarcane-peel journey in a four-part blog series — from the roadside waste challenge and our early composting experiments to what Miwa has taught us about recycling green waste.",
    "Read the Sugarcane Peel Series",
  ),
};

export const JOURNEY_COCONUT = {
  headline: "One waste stream. Many possibilities.",
  steps: [
    step({
      _aspect: "aspect-[388/238]",
      title: "We went looking for mulch",
      paras: [
        "As we collected sugarcane peels around Nairobi, we kept encountering another abundant waste stream: discarded green coconut husks. Some of the same vendors selling sugarcane juice also sold madafu, leaving behind bags of bulky husks once the coconut water was gone.",
        "We were looking for materials that could help us cover and protect soil, so we asked a familiar question: **could green coconut husks become mulch**?",
        "Our first shredding experiments revealed a tough, fibrous material that looked promising — and gave us a reason to keep experimenting.",
      ],
      image: "/images/madafu-market.jpg",
      imageAlt: "Green coconuts with their tops cut open at a roadside stall, priced at KES 70",
    }),
    step({
      title: "We found more than we were looking for",
      paras: [
        "When we began processing larger quantities, the husks revealed more than just fibre. Through shredding, drying, separating and sieving, we began recovering **several distinct materials**.",
      ],
      cards: [
        { image: "/images/madafu-fibre.jpg", imageAlt: "Long strands of coconut fibre", title: "Coco Fibre", body: "Long, fibrous material with potential as mulch." },
        { image: "/images/madafu-chunks.jpg", imageAlt: "Coarse chunks of coconut husk", title: "Coco Chunks", body: "Coarser pieces suitable for soil cover, especially in landscape beds." },
        { image: "/images/madafu-chips.jpg", imageAlt: "Small, hard coconut-husk chips", title: "Coco Chips", body: "Smaller, harder fragments with potential uses in plant growing media and landscaping." },
        { image: "/images/madafu-cocopeat.jpg", imageAlt: "A mound of fine brown cocopeat", title: "Cocopeat", body: "Fine material used in soilless growing media for container plants and nurseries." },
      ],
    }),
    step({
      title: "What we learned",
      paras: [
        "Our experiments taught us not to assume that materials recovered from the same waste stream should all have the same use.",
        "Coco fibre, chunks and chips took us deeper into questions about soil cover — where different materials work best, how long they last, how they look in landscapes and how they can work alongside other mulches.",
        "Cocopeat took us somewhere else entirely. Its potential as a component of growing media led us into experiments with container growing and eventually toward growing plants ourselves in **media made from recovered materials**.",
        "We started by asking whether a discarded coconut husk could become mulch. We ended up asking what all the different materials inside it could help us grow and protect.",
      ],
      next: {
        title: "Our search kept going.",
        paras: [
          "Working with coco materials taught us that soil cover isn’t only about whether a material works. Different materials can play different roles — and landscape appearance matters too.",
          "That search eventually led us to another waste stream: pine bark.",
        ],
        label: "Explore Pine Bark",
        href: "/recycling-green-waste/our-journey/pine-bark",
      },
    }),
  ],
  series: series(
    "We’ve documented our madafu journey in a four-part blog series — from the waste challenge and our first shredding experiments to discovering multiple materials and learning where they fit.",
    "Read the Green Coconut Husk Series",
  ),
};

export const JOURNEY_PINE = {
  headline: "A sawmill residue with new potential.",
  steps: [
    step({
      _aspect: "aspect-[389/286]",
      title: "We saw the smoke",
      paras: [
        "We were driving towards Naivasha one day when we noticed a large fire burning beside the road and stopped to see what it was.",
        "We discovered a timber-processing area where bark and other woody residues accumulate as logs are handled and cut. While some timber by-products have established uses, we observed that much of the bark had relatively little value and could eventually be burned.",
        "We knew tree bark is used as mulch in many places. So we collected a few pieces, took them home and asked a simple question:",
      ],
      quote: "Could this waste cover soil instead?",
      image: "/images/pine-sawmill.jpg",
      imageAlt: "Heaps of pine bark beside stacked logs at a timber yard",
    }),
    step({
      _aspect: "aspect-[384/249]",
      title: "We experimented — and found its place",
      paras: [
        "Our first experiments showed that the bark could be processed into an attractive mulch. But making mulch was only the beginning. We had to learn how to collect, transport, process, sort and dry the material efficiently.",
        "We also learned that freshly processed bark changes as it dries, developing from a relatively light brown into the richer golden-brown finish we value in landscapes.",
        "Most importantly, pine bark helped us think differently about how materials can work together. Rather than asking which mulch is “best,” we began asking which material—or combination of materials—is right for a particular space.",
      ],
      image: "/images/pine-mulch.jpg",
      imageAlt: "A landscape bed covered in golden-brown pine bark mulch",
    }),
    step({
      title: "What we learned",
      paras: [
        "Our pine bark journey has reinforced something we have learned across all three waste streams: finding a possible use for a discarded material is only the beginning.",
        "We are still learning how moisture affects processing, improving collection and transport, finding uses for the finer material produced during shredding, and observing how pine bark performs over time in the landscapes where we use it.",
      ],
      highlight: "For us, recycling green waste means learning enough about a discarded material to give it a useful new role.",
    }),
  ],
  series: series(
    "We’ve documented our pine bark journey in a two-part blog series — from the roadside fire that first caught our attention to what collecting, processing and using the material has taught us.",
    "Read the Pine Bark Series",
  ),
};
