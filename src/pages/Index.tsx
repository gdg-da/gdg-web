import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Technologies from "@/components/Technologies";
import Footer from "@/components/Footer";
import Slop from "./Slop";

gsap.registerPlugin(ScrollTrigger);

const TerminalBridge = () => {
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.from(bridgeRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bridgeRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <div className="w-full py-20 flex justify-center items-center overflow-hidden">
      <div ref={bridgeRef} className="relative group">
        {/* Connection lines */}
        <div className="absolute -top-16 left-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border -translate-x-1/2" />
        
        {/* Terminal Box */}
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dot bg-[#ff5f56]" />
            <div className="terminal-dot bg-[#ffbd2e]" />
            <div className="terminal-dot bg-[#27c93f]" />
            <span className="ml-4 font-mono text-xs text-[#565f89]">~/dsc-dau</span>
          </div>
          <div className="terminal-body">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-[#7aa2f7]">$</span>
              <span className="text-[#a9b1d6]">npm run build:community</span>
              <span className="w-2 h-4 bg-[#7aa2f7] animate-pulse" />
            </div>
            <div className="mt-2 text-xs text-[#565f89]">
              <span className="text-[#9ece6a]">✓</span> Building developer ecosystem...
            </div>
          </div>
        </div>

        {/* Connection lines */}
        <div className="absolute -bottom-16 left-1/2 w-px h-16 bg-gradient-to-b from-border to-transparent -translate-x-1/2" />
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith('#')) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Slop />
        <Technologies />
        <TerminalBridge />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
