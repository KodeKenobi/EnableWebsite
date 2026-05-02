import { useState, useCallback } from "react";
import IntroLoader from "./components/IntroLoader.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import "./App.css";

function App() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
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
