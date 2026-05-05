import { useState, useCallback } from "react";
import IntroLoader from "./components/IntroLoader.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import "./App.css";

/** Same-tab refresh skips intro after first completion; new tab shows intro again. */
const INTRO_SEEN_SESSION_KEY = "enable-intro-seen";

function hasSeenIntroThisSession(): boolean {
  try {
    return globalThis.sessionStorage?.getItem(INTRO_SEEN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function App() {
  const [introDone, setIntroDone] = useState(hasSeenIntroThisSession);

  const handleIntroComplete = useCallback(() => {
    try {
      globalThis.sessionStorage?.setItem(INTRO_SEEN_SESSION_KEY, "1");
    } catch {
      /* private mode / denied */
    }
    setIntroDone(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg)]">
      <Hero introDone={introDone} />
      {introDone && <Header />}
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
    </main>
  );
}

export default App;
