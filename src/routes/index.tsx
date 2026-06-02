import { createFileRoute } from "@tanstack/react-router";
import { HeroBirthdaySection } from "@/components/HeroBirthdaySection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Tahreem — A Letter" },
      { name: "description", content: "A quiet, cinematic birthday letter waiting to be opened." },
      { property: "og:title", content: "Happy Birthday Tahreem — A Letter" },
      { property: "og:description", content: "A quiet, cinematic birthday letter waiting to be opened." },
    ],
  }),
  component: HeroBirthdaySection,
});
