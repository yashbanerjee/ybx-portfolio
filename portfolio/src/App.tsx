import { Suspense, lazy, useEffect, useState } from "react";
import { useLenis, getLenis } from "./hooks/useLenis";
import { scrollState } from "./three/scrollState";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";

const Scene = lazy(() => import("./three/Scene"));

export default function App() {
  const [started, setStarted] = useState(false);
  useLenis();

  /* Feed scroll progress + velocity + mouse into the shared 3D state */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const lenis = getLenis();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = lenis ? lenis.scroll : window.scrollY;
      scrollState.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const v = lenis ? Math.max(-1, Math.min(1, lenis.velocity / 60)) : 0;
      scrollState.velocity += (v - scrollState.velocity) * 0.12;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    const onMouse = (e: MouseEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <Loader onDone={() => setStarted(true)} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero started={started} />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
    </>
  );
}
