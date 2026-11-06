import { Hero } from "@/components/home/Hero";
import { ProjectList } from "@/components/home/ProjectList";
import { EngineeringApproach } from "@/components/home/EngineeringApproach";
import { RecentNotes } from "@/components/home/RecentNotes";
import { TechnicalToolkit } from "@/components/home/TechnicalToolkit";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectList />
      <EngineeringApproach />
      <RecentNotes />
      <TechnicalToolkit />
    </>
  );
}
