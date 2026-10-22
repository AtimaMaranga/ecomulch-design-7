import { redirect } from "next/navigation";
import { journeyHref } from "@/components/section/journey";

/** The journey starts where EcoMulch did — with sugarcane peels. */
export default function OurJourneyPage() {
  redirect(journeyHref("sugarcane-peels"));
}
