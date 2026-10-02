import { Contact } from "@/components/Contact";
import { DesignGallery } from "@/components/DesignGallery";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <DesignGallery />
        <Experience />
        <Stack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
