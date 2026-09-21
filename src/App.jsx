import { useCallback, useEffect, useState } from "react";
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

const STORAGE_KEY = "agentic-hackathon-notice-dismissed";

export default function App() {
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed !== "1") {
      const t = setTimeout(() => setNoticeOpen(true), 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  const dismissNotice = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setNoticeOpen(false);
  }, []);

  const scrollTo = useCallback((id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRegister = useCallback(() => {
    dismissNotice();
    scrollTo("#register");
  }, [dismissNotice, scrollTo]);

  const handleExplore = useCallback(() => {
    dismissNotice();
    scrollTo("#about");
  }, [dismissNotice, scrollTo]);

  return (
    <>
      <PopupNotification
        open={noticeOpen}
        onClose={dismissNotice}
        onRegister={handleRegister}
        onExplore={handleExplore}
      />
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
    </>
  );
}