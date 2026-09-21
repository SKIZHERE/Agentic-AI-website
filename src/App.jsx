import { useCallback, useEffect, useState } from "react";
import ParticleField from "./components/ParticleField";
import PopupNotification from "./components/PopupNotification";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/sections/About";
import Details from "./components/sections/Details";
import Tracks from "./components/sections/Tracks";
import Timeline from "./components/sections/Timeline";
import Prizes from "./components/sections/Prizes";
import Rules from "./components/sections/Rules";
import FAQ from "./components/sections/FAQ";
import Register from "./components/sections/Register";
import Footer from "./components/Footer";

export default function App() {
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNoticeOpen(true), 500);
    return () => clearTimeout(t);
  }, []);

  const dismissNotice = useCallback(() => {
    setNoticeOpen(false);
  }, []);

  const closeAndScroll = useCallback((id) => {
    setNoticeOpen(false);
    window.setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, []);

  const handleRegister = useCallback(() => closeAndScroll("#register"), [closeAndScroll]);
  const handleExplore = useCallback(() => closeAndScroll("#about"), [closeAndScroll]);

  return (
    <>
      <PopupNotification
        open={noticeOpen}
        onClose={dismissNotice}
        onRegister={handleRegister}
        onExplore={handleExplore}
      />
      <ParticleField />
      <div className="site-root">
        <Navbar onRegister={handleRegister} />
        <main>
          <Hero onRegister={handleRegister} />
          <About />
          <Details />
          <Tracks />
          <Timeline />
          <Prizes />
          <Rules />
          <FAQ />
          <Register />
        </main>
        <Footer />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}