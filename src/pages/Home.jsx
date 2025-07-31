import React from "react";
import Navbar from "../components/Navbar";
import Section from "../components/Section";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Section title="Characters" endpoint="people" />
      <Section title="Planets" endpoint="planets" />
      <Section title="Vehicles" endpoint="vehicles" />
    </div>
  );
}
