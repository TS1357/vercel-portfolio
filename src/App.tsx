import CRTOverlay from "./components/ui/CRTOverlay";
import NeonCursor from "./components/ui/NeonCursor";
import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import LevelDivider from "./components/ui/LevelDivider";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

/**
 * App — composes the single-page arcade portfolio.
 *
 * Order matches the nav and the "level" progression:
 * Hero → About → Projects → Skills → Experience → Contact.
 */
export default function App() {
  return (
    <>
      <CRTOverlay />
      <NeonCursor />
      <Nav />

      <Hero />
      <About />
      <LevelDivider label="LEVEL 02" />
      <Projects />
      <LevelDivider label="LEVEL 03" />
      <Skills />
      <LevelDivider label="LEVEL 04" />
      <Experience />
      <LevelDivider label="LEVEL 05" />
      <Contact />

      <Footer />
    </>
  );
}
