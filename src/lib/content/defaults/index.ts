/**
 * Built-in content for every fixed-layout page, keyed by site-map slug.
 * Each page reads its defaults with getPageContent(); the admin edits a copy.
 */
import { WHO_HOW } from "./who-how";
import { WHO_WHY } from "./who-why";
import { WHO_PRINCIPLES } from "./who-principles";
import { RGW_CHALLENGE } from "./rgw-challenge";
import { JOURNEY_COCONUT, JOURNEY_PINE, JOURNEY_SHARED, JOURNEY_SUGARCANE } from "./journey";
import { SNBS_CHALLENGE } from "./snbs-challenge";
import { SNBS_RESPONSE } from "./snbs-response";
import { SNBS_MOVEMENT } from "./snbs-movement";
import { SNBS_MULCHING } from "./snbs-mulching";
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
  "say-no-to-bare-soil--the-challenge": SNBS_CHALLENGE,
  "say-no-to-bare-soil--our-response": SNBS_RESPONSE,
  "say-no-to-bare-soil--our-response--help-build-the-movement": SNBS_MOVEMENT,
  "say-no-to-bare-soil--our-response--mulching-your-home": SNBS_MULCHING,
  "greening-urban-spaces--the-challenge": GUS_CHALLENGE,
  "greening-urban-spaces--what-we-offer": GUS_OFFER,
  "greening-urban-spaces--what-we-offer--curated-plants": CURATED_PLANTS,
  "greening-urban-spaces--what-we-offer--flower-beds": FLOWER_BEDS,
};
