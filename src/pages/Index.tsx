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
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bridgeRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Terminal entrance with 3D effect
    tl.fromTo(
      terminalRef.current,
      { 
        opacity: 0, 
        scale: 0.8, 
        rotateX: 20,
        y: 50
      },
      { 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        y: 0,
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }
    );

    // Typing animation for command
    const command = "npm run build:community";
    if (commandRef.current) {
      commandRef.current.textContent = "";
      
      command.split('').forEach((char, i) => {
        tl.to(commandRef.current, {
          duration: 0.05,
          onComplete: () => {
            if (commandRef.current) {
              commandRef.current.textContent += char;
            }
          }
        }, `-=${i === 0 ? 0 : 0.02}`);
      });
    }

    // Output reveal
    tl.fromTo(
      outputRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      "+=0.3"
    );

    // Floating animation
    gsap.to(terminalRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="w-full py-24 flex justify-center items-center overflow-hidden">
      <div ref={bridgeRef} className="relative group" style={{ perspective: '1000px' }}>
        {/* Connection lines with glow */}
        <div className="absolute -top-20 left-1/2 w-px h-20 -translate-x-1/2">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-gdg-blue/30 to-gdg-blue/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gdg-blue/50 blur-sm" />
        </div>
        
        {/* Terminal Box */}
        <div 
          ref={terminalRef}
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gdg-blue/20 via-gdg-green/20 to-gdg-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-[#1a1b26] rounded-xl overflow-hidden border border-[#2a2b36] shadow-2xl shadow-black/50">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#16161e] border-b border-[#2a2b36]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-125 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-125 transition-all cursor-pointer" />
              <span className="ml-3 font-mono text-xs text-[#565f89]">~/dsc-dau — zsh</span>
            </div>
            
            {/* Terminal body */}
            <div className="p-5 min-w-[320px] md:min-w-[400px]">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-[#7aa2f7]">❯</span>
                <span ref={commandRef} className="text-[#a9b1d6]"></span>
                <span className="w-2 h-5 bg-[#7aa2f7] animate-pulse" />
              </div>
              
              <div ref={outputRef} className="mt-3 space-y-1 text-xs font-mono">
                <div className="text-[#565f89]">
                  <span className="text-[#9ece6a]">✓</span> Compiling developer ecosystem...
                </div>
                <div className="text-[#565f89]">
                  <span className="text-[#9ece6a]">✓</span> Bundling workshops & events...
                </div>
                <div className="text-[#565f89]">
                  <span className="text-[#7aa2f7]">→</span> Building community connections...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection lines */}
        <div className="absolute -bottom-20 left-1/2 w-px h-20 -translate-x-1/2">
          <div className="w-full h-full bg-gradient-to-b from-gdg-green/50 via-gdg-green/30 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gdg-green/50 blur-sm" />
        </div>
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
          gsap.to(window, {
            scrollTo: { y: element, offsetY: 80 },
            duration: 1,
            ease: "power3.inOut"
          });
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
    <div className="min-h-screen bg-background overflow-x-hidden">
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
