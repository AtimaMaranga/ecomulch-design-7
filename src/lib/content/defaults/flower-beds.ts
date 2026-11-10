/*
 * Transforming Urban Flower Beds. Restructured in November 2026 (client
 * revisions): plain-title hero, an "Explore, Learn & Discover" list that jumps
 * to the sections, and a simplified challenges section without the Learn More
 * panels. Renamed section keys keep older saved copies from overriding it.
 */
export const FLOWER_BEDS = {
  "intro": {
    "_label": "Hero",
    "eyebrow": "Greening Urban Spaces / What We Offer",
    "title": "Transforming Urban Flower Beds",
    "paras": [
      "As our towns and cities become more built up, the spaces around our homes where plants can grow in the ground are increasingly limited. That makes the flower beds we do have all the more valuable.",
      "But having a flower bed does not automatically mean having a thriving flower bed. At EcoMulch, we work to create healthier, more attractive flower beds through thoughtful plant selection, improved growing conditions, soil protection and ongoing care."
    ],
    "image": "/images/fb3-hero.jpg",
    "mobileImage": "/images/fb3-hero-m.jpg",
    "imageAlt": "A mulched flower bed of pink, red and white daisies beside a paved edge"
  },
  "explore": {
    "_label": "Explore, Learn & Discover (links to the sections below)",
    "title": "Explore, Learn & Discover",
    "lede": "Learn about the challenges of creating successful flower beds, discover our approach, follow our transformations or explore working with us.",
    "options": [
      {
        "_tone": "mint",
        "icon": "leaf-pair",
        "title": "Understand\nthe Challenge",
        "body": "Explore common issues that can make flower beds difficult to establish and maintain.",
        "href": "#understand-the-challenge"
      },
      {
        "_tone": "peach",
        "icon": "layers",
        "title": "Our\nApproach",
        "body": "See our step-by-step approach to creating healthy, attractive and long-lasting flower beds.",
        "href": "#our-approach"
      },
      {
        "_tone": "lilac",
        "icon": "video",
        "title": "From Ordinary\nto Amazing",
        "body": "Follow our real flower-bed transformations, learn what works and get ideas for your own space.",
        "href": "#from-ordinary-to-amazing"
      },
      {
        "_tone": "mint",
        "icon": "whatsapp",
        "title": "Transform\nYour Flower Bed",
        "body": "Have a flower bed you’d like to improve or create? Let’s talk about your space and how we can help.",
        "href": "#transform-your-flower-bed"
      }
    ]
  },
  "challenge": {
    "_label": "Understand the Challenge",
    "eyebrow": "Transforming Urban Flower Beds",
    "title": "Understand the Challenge",
    "intro": "Even a small flower bed can present real challenges — from the condition of the soil and the plants we choose, to how those plants are arranged, how exposed soil is managed and how the bed is cared for over time.",
    "image": "/images/fb3-challenge.jpg",
    "mobileImage": "/images/fb3-challenge-m.jpg",
    "imageAlt": "Pink daisies in a freshly mulched flower bed beside a paved path",
    "listTitle": "Some of the challenges we commonly encounter include:",
    "items": [
      {
        "_tone": "peach",
        "_color": "green",
        "icon": "sprout-soil",
        "title": "Growing Conditions",
        "body": "Soil may be poor, compacted, low in organic matter or affected by previous construction and other activity."
      },
      {
        "_tone": "mint",
        "_color": "green",
        "icon": "leaf-pair",
        "title": "Plant Selection",
        "body": "Plants may not be well suited to the available light, space, moisture conditions or other characteristics."
      },
      {
        "_tone": "sky",
        "_color": "green",
        "icon": "sprout-trio",
        "title": "Plant Arrangement",
        "body": "Plants may not be arranged to make the best use of a limited space, accommodate their mature size or create the desired effect."
      },
      {
        "_tone": "lilac",
        "_color": "brown",
        "icon": "bare-soil",
        "title": "Bare Soil",
        "body": "Soil left exposed between and around plants can lose moisture, support weeds and leave the growing environment less protected."
      }
    ],
    "nextTitle": "Understanding the challenges is the first step.",
    "nextBody": "EcoMulch takes a thoughtful, step-by-step approach to addressing these challenges and creating healthier, more attractive flower beds.",
    "nextCta": "Explore Our Approach",
    "nextHref": "#our-approach"
  },
  "approach": {
    "_label": "Our Approach (six steps)",
    "eyebrow": "Our Approach",
    "title": "Our Approach to",
    "titleAccent": "Transforming Flower Beds",
    "subtitle": "A step-by-step approach to create flower beds that are healthy, attractive and able to thrive over time.",
    "paras": [
      "Creating a successful flower bed involves more than planting a few flowers. It starts with understanding the space, preparing it for healthy growth, selecting and arranging suitable plants, protecting the soil and caring for the bed as it establishes and develops.",
      "At EcoMulch, we take a thoughtful, step-by-step approach that considers the specific conditions of each flower bed and the look you want to achieve. This helps create a space that is beautiful, supports healthy plants and remains easy to maintain over time."
    ],
    "steps": [
      {
        "_tone": "lime",
        "icon": "search",
        "title": "Assess",
        "body": "Understand your flower bed, its existing plants, growing conditions and what you’d like to achieve.",
        "detail": {
          "image": "/images/fb2-step-assess.jpg",
          "imageAlt": "A flower bed with agapanthus beside a house wall",
          "title": "Assess",
          "subtitle": "Understanding Your Flower Bed",
          "paras": [
            "Every flower bed is different. We start by looking at the existing bed and its surroundings to understand the conditions and opportunities for creating a healthy, attractive and manageable space.",
            "This includes assessing the soil, sunlight, moisture levels, existing plants, available space and any site-specific factors such as nearby trees, walls or walkways. We also discuss what you’d like to achieve — for example, a low-maintenance bed, seasonal colour, or a combination of both.",
            "This assessment helps us develop a plan that is well suited to your space and sets the foundation for the next steps."
          ],
          "points": [
            {
              "_tone": "peach",
              "icon": "sun",
              "title": "Evaluate Conditions",
              "body": "Assess sunlight, soil quality, moisture and other growing conditions in the bed."
            },
            {
              "_tone": "mint",
              "icon": "sprout",
              "title": "Understand Existing Plants",
              "body": "Consider what is already growing well and what may need to be removed or replaced."
            },
            {
              "_tone": "sky",
              "icon": "map-pin",
              "title": "Identify Opportunities",
              "body": "Look at the available space and any features that can influence plant selection and arrangement."
            },
            {
              "_tone": "rose",
              "icon": "target",
              "title": "Discuss Your Goals",
              "body": "Understand the look you want to achieve and any preferences for colours, plant types or maintenance needs."
            }
          ]
        }
      },
      {
        "_tone": "peach",
        "icon": "leaf",
        "title": "Design",
        "body": "Select suitable plants and plan an arrangement that makes the best use of the space and suits your preferences.",
        "detail": {
          "image": "/images/fb2-step-design.jpg",
          "imageAlt": "A planned flower bed of mixed heights and colours",
          "title": "Design",
          "subtitle": "Creating a Planting Plan for Your Space",
          "paras": [
            "A well-designed flower bed brings together plants that are suited to the space, look good together and can thrive over time. During the design stage, we consider your preferences and the specific conditions of the bed, such as sunlight, available space, soil and surrounding features.",
            "We help you choose suitable plants and plan their arrangement, including plant heights, colours, textures and flowering periods. The goal is to create a balanced, attractive and manageable planting plan that makes the best use of the available space."
          ],
          "points": [
            {
              "_tone": "mint",
              "icon": "sprout",
              "title": "Choose Suitable Plants",
              "body": "Select plants that are well suited to the light, space, soil and moisture conditions of your bed."
            },
            {
              "_tone": "peach",
              "icon": "flower",
              "title": "Plan Plant Arrangement",
              "body": "Determine how to combine plants of different heights, colours and textures for a balanced and attractive look."
            },
            {
              "_tone": "sky",
              "icon": "expand",
              "title": "Make the Best Use of the Space",
              "body": "Consider the size and shape of the bed and arrange plants to create full coverage and visual interest."
            },
            {
              "_tone": "lilac",
              "icon": "calendar",
              "title": "Plan for Year-Round Interest",
              "body": "Include a mix of plants that provide beauty and structure across different seasons."
            }
          ]
        }
      },
      {
        "_tone": "sky",
        "icon": "shovel",
        "title": "Prepare",
        "body": "Improve the growing environment and get the bed ready for planting.",
        "detail": {
          "image": "/images/fb2-step-prepare.jpg",
          "imageAlt": "A cleared, freshly turned flower bed ready for planting",
          "title": "Prepare",
          "subtitle": "Getting the Bed Ready for Healthy Planting",
          "paras": [
            "Good preparation gives your plants the best possible start. At this stage, we improve the growing environment so that the plants can establish well and the bed remains healthy over time.",
            "Preparation may involve clearing unwanted plants and debris, loosening and levelling the soil, improving soil structure and fertility, and making sure the bed is ready for planting. We also consider practical details such as drainage, edges and any adjustments needed based on the specific conditions of your space."
          ],
          "points": [
            {
              "_tone": "peach",
              "icon": "brush",
              "title": "Clear and Clean",
              "body": "Remove existing weeds, unwanted plants, stones and other debris."
            },
            {
              "_tone": "mint",
              "icon": "layers",
              "title": "Improve the Soil",
              "body": "Loosen and level the soil and add organic matter where needed to support healthy plant growth."
            },
            {
              "_tone": "sky",
              "icon": "droplet",
              "title": "Check Drainage",
              "body": "Ensure the bed drains well to prevent water from stagnating around the plants."
            },
            {
              "_tone": "rose",
              "icon": "brick-wall",
              "title": "Prepare the Space",
              "body": "Define edges, shape the bed and make any adjustments needed based on the design and site conditions."
            }
          ]
        }
      },
      {
        "_tone": "lime",
        "icon": "plants",
        "title": "Plant",
        "body": "Establish the selected plants in their intended positions with attention to their growing needs.",
        "detail": {
          "image": "/images/fb2-step-plant.jpg",
          "imageAlt": "Newly planted agapanthus and flowers in a prepared bed",
          "title": "Plant",
          "subtitle": "Establishing Plants for a Healthy, Attractive Flower Bed",
          "paras": [
            "Once the bed is prepared, we plant the selected plants in their intended positions. We handle the planting with care, taking into account each plant’s specific needs, such as spacing, planting depth and orientation.",
            "Proper planting helps the plants establish well, reduces transplant shock and gives them the best chance to thrive. We also consider practical details such as layering plants by height, combining flowers, shrubs and groundcovers, and ensuring there is enough space for future growth."
          ],
          "points": [
            {
              "_tone": "rose",
              "icon": "sprout",
              "title": "Plant at the Right Depth",
              "body": "Ensure each plant is planted at the correct depth for healthy root development."
            },
            {
              "_tone": "mint",
              "icon": "spacing",
              "title": "Use Appropriate Spacing",
              "body": "Allow enough space for each plant to grow well and reduce competition for nutrients, water and light."
            },
            {
              "_tone": "peach",
              "icon": "flower",
              "title": "Arrange by Height and Function",
              "body": "Combine plants of different heights, colours and textures to create a balanced and attractive look."
            },
            {
              "_tone": "sky",
              "icon": "roots",
              "title": "Water After Planting",
              "body": "Water the plants after planting to help them settle and establish in their new location."
            }
          ]
        }
      },
      {
        "_tone": "peach",
        "icon": "mulch-pile",
        "title": "Cover",
        "body": "Protect exposed soil using organic mulch, living groundcover or a combination of both.",
        "detail": {
          "image": "/images/fb2-step-cover.jpg",
          "imageAlt": "A mulched flower bed with agapanthus and daisies",
          "title": "Cover",
          "subtitle": "Protecting the Soil for Healthy, Thriving Plants",
          "paras": [
            "Keeping the soil covered is a key part of a successful flower bed. A layer of organic mulch, a living groundcover or a combination of both helps create a stable growing environment, supports healthier plants and keeps the bed looking neat.",
            "At EcoMulch, we use mulches made from recycled green waste — such as coconut husks, sugarcane peels (miwa) and pine bark — and we also work with suitable living groundcovers. We choose the most appropriate option based on the type of plants, the look you want to achieve and the conditions of your space."
          ],
          "points": [
            {
              "_tone": "sky",
              "icon": "droplet",
              "title": "Conserve Moisture",
              "body": "A soil cover reduces moisture loss, so plants need less frequent watering."
            },
            {
              "_tone": "mint",
              "icon": "sprout",
              "title": "Suppress Weeds",
              "body": "It blocks sunlight, making it harder for weeds to germinate and establish."
            },
            {
              "_tone": "peach",
              "icon": "sparkles",
              "title": "Keep the Bed Cleaner",
              "body": "It reduces soil splash during rain or watering, keeping plants and nearby walls cleaner."
            },
            {
              "_tone": "rose",
              "icon": "thermometer",
              "title": "Support Plant Health",
              "body": "It moderates soil temperature, reduces erosion and improves soil conditions over time."
            }
          ]
        }
      },
      {
        "_tone": "sky",
        "icon": "watering-can",
        "title": "Steward",
        "body": "Support the flower bed as plants establish, grow and change over time, keeping it healthy and attractive.",
        "detail": {
          "image": "/images/fb2-step-steward.jpg",
          "imageAlt": "An established flower bed in full bloom",
          "title": "Steward",
          "subtitle": "Caring for the Bed as It Grows and Changes",
          "paras": [
            "A flower bed is a living space. As the plants establish and mature, their needs change with the seasons. Ongoing care helps keep the bed healthy, attractive and performing as intended.",
            "We provide guidance on watering, simple maintenance routines, topping up mulch, pruning and replacing plants when needed. We also monitor how the bed is performing and recommend adjustments to keep it looking its best over time.",
            "Our goal is to support you so that your flower bed remains a thriving part of your outdoor space for years to come."
          ],
          "points": [
            {
              "_tone": "mint",
              "icon": "leaf",
              "title": "Water and Monitor",
              "body": "Guide on appropriate watering and monitor plant health, especially during establishment and seasonal changes."
            },
            {
              "_tone": "peach",
              "icon": "scissors",
              "title": "Maintain and Refresh",
              "body": "Advise on pruning, weeding and topping up mulch to keep the bed neat and healthy."
            },
            {
              "_tone": "sky",
              "icon": "refresh",
              "title": "Adapt Over Time",
              "body": "As plants grow, we recommend adjustments such as replacing plants, rearranging or adding new species to maintain an attractive look."
            },
            {
              "_tone": "rose",
              "icon": "calendar",
              "title": "Ongoing Support",
              "body": "Continue to provide guidance and advice so the flower bed remains easy to manage and enjoyable over the long term."
            }
          ]
        }
      }
    ]
  },
  "discover": {
    "_label": "Discover & engage",
    "eyebrow": "Discover & Engage",
    "title": "Discover &",
    "titleAccent": "Engage",
    "lede": "Follow our flower-bed transformations, explore what we’re learning, or talk to us about transforming your own space."
  },
  "series": {
    "_label": "From Ordinary to Amazing (YouTube card)",
    "beforeImage": "/images/fb2-before.jpg",
    "beforeAlt": "A sparse flower bed with bare soil, before",
    "beforeLabel": "Before",
    "afterImage": "/images/fb2-after.jpg",
    "afterAlt": "The same bed planted and mulched, after",
    "afterLabel": "After",
    "title": "From Ordinary to Amazing",
    "body": "Follow the transformation of our own flower beds as we experiment, learn and share what it takes to create healthier, more attractive planted spaces.",
    "points": [
      {
        "_tone": "rose",
        "icon": "play",
        "title": "Real Spaces",
        "body": "See the actual flower beds we work on."
      },
      {
        "_tone": "lime",
        "icon": "lightbulb",
        "title": "Practical Learning",
        "body": "Learn what works, what doesn’t and why."
      },
      {
        "_tone": "peach",
        "icon": "leaf",
        "title": "Ideas for Your Space",
        "body": "Get inspiration for your own flower beds."
      }
    ],
    "cta": "Watch From Ordinary to Amazing on YouTube",
    "ctaHref": "{flowerBedsVideo}"
  },
  "transform": {
    "_label": "Transform Your Flower Bed (WhatsApp card)",
    "image": "/images/fb2-transform.jpg",
    "imageAlt": "A long flower bed with agapanthus and daisies along a paved walkway",
    "title": "Have a Flower Bed You’d Like to Transform?",
    "paras": [
      "Whether you’re creating a new flower bed or improving an existing one, we’d love to hear about your space.",
      "Start by chatting with us on WhatsApp. We’ll learn a little about your flower bed, what you’d like to achieve, and explain how we can work together."
    ],
    "points": [
      {
        "_tone": "mint",
        "icon": "message",
        "title": "Tell Us About Your Space",
        "body": "Share a few photos and tell us what you have in mind."
      },
      {
        "_tone": "sky",
        "icon": "people-round",
        "title": "Get Our Guidance",
        "body": "We’ll ask a few questions, understand your needs and explain the next steps."
      },
      {
        "_tone": "peach",
        "icon": "calendar",
        "title": "Plan the Way Forward",
        "body": "We can discuss options, including phased implementation for larger projects."
      }
    ],
    "cta": "Chat with us on WhatsApp",
    "ctaHref": "{whatsapp}"
  },
  "area": {
    "_label": "Service area note",
    "text": "Our flower-bed transformation service is currently available in **Nairobi and Kiambu**."
  }
};
