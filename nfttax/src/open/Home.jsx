import React from "react";
import { HeroHome, LearnBlock } from "../components";

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroHome />
      <LearnBlock />
      {/* <Features /> */}
    </main>
  );
}
