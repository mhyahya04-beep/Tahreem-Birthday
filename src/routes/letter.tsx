import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LetterOpeningSequence } from "@/components/LetterOpeningSequence";
import { ScrollingLetterPage } from "@/components/ScrollingLetterPage";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Letter for Tahreem" },
      { name: "description", content: "A handwritten, typewritten birthday letter — quietly waiting." },
      { property: "og:title", content: "A Letter for Tahreem" },
      { property: "og:description", content: "A handwritten, typewritten birthday letter — quietly waiting." },
    ],
  }),
  component: LetterPage,
});

function LetterPage() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <ScrollingLetterPage />
      {!opened && <LetterOpeningSequence onDone={() => setOpened(true)} />}
    </>
  );
}
