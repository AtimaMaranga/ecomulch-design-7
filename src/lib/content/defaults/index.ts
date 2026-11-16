/**
 * Built-in content for every fixed-layout page, keyed by site-map slug.
 * Each page reads its defaults with getPageContent(); the admin edits a copy.
 */
import { WHO_HOW } from "./who-how";
import { WHO_WHY } from "./who-why";
import { WHO_PRINCIPLES } from "./who-principles";
import { RGW_CHALLENGE } from "./rgw-challenge";
import { JOURNEY_COCONUT, JOURNEY_PINE, JOURNEY_SHARED, JOURNEY_SUGARCANE } from "./journey";
import {
  MULCH_PRODUCTS,
  OSC_CAMPAIGN,
  OSC_CHALLENGE,
  OSC_LANDING,
  OSC_MULCHES,
  OSC_MULCH_START,
  OSC_RESPONSE,
  OSC_TOPPINGS,
  OSC_TOPPING_START,
  TOPPING_PRODUCTS,
} from "./organic-soil-cover";
import { GUS_CHALLENGE } from "./gus-challenge";
import { GUS_OFFER } from "./gus-offer";
import { CURATED_PLANTS } from "./curated-plants";
import { FLOWER_BEDS } from "./flower-beds";

export const CONTENT_DEFAULTS: Record<string, Record<string, unknown>> = {
  "who-we-are--how-we-started": WHO_HOW,
  "who-we-are--our-why": WHO_WHY,
  "who-we-are--principles": WHO_PRINCIPLES,
  "recycling-green-waste--the-challenge": RGW_CHALLENGE,
  "recycling-green-waste--our-journey": JOURNEY_SHARED,
  "recycling-green-waste--our-journey--sugarcane-peels": JOURNEY_SUGARCANE,
  "recycling-green-waste--our-journey--green-coconut-husks": JOURNEY_COCONUT,
  "recycling-green-waste--our-journey--pine-bark": JOURNEY_PINE,
  "organic-soil-cover": OSC_LANDING,
  "organic-soil-cover--the-challenge": OSC_CHALLENGE,
  "organic-soil-cover--our-response": OSC_RESPONSE,
  "organic-soil-cover--our-response--organic-mulches": OSC_MULCHES,
  "organic-soil-cover--our-response--organic-mulches--getting-started": OSC_MULCH_START,
  ...Object.fromEntries(
    Object.entries(MULCH_PRODUCTS).map(([k, v]) => [`organic-soil-cover--our-response--organic-mulches--${k}`, v]),
  ),
  "organic-soil-cover--our-response--planter-toppings": OSC_TOPPINGS,
  "organic-soil-cover--our-response--planter-toppings--getting-started": OSC_TOPPING_START,
  ...Object.fromEntries(
    Object.entries(TOPPING_PRODUCTS).map(([k, v]) => [`organic-soil-cover--our-response--planter-toppings--${k}`, v]),
  ),
  "organic-soil-cover--our-response--say-no-to-bare-soil": OSC_CAMPAIGN,
  "greening-urban-spaces--the-challenge": GUS_CHALLENGE,
  "greening-urban-spaces--what-we-offer": GUS_OFFER,
  "greening-urban-spaces--what-we-offer--curated-plants": CURATED_PLANTS,
  "greening-urban-spaces--what-we-offer--flower-beds": FLOWER_BEDS,
};
