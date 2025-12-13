import { useRef, useEffect } from "react";
import { ArrowRight, Smartphone, Cloud, Brain, Code2, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLHeadingElement>(null);
  const dscRef = useRef<HTMLSpanElement>(null);
  const dauRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Simple fade in for reduced motion
      gsap.set([welcomeRef.current, dscRef.current, dauRef.current, subtitleRef.current, ctaRef.current, badgeRef.current], {
        opacity: 1,
        y: 0,
        x: 0,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Badge entrance
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    );

    // "WELCOME TO" text reveal with clip-path
    tl.fromTo(
      welcomeRef.current,
      { 
        opacity: 0, 
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        x: -30
      },
      { 
        opacity: 1, 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        x: 0,
        duration: 0.8
      },
      "-=0.2"
    );

    // "DSC" with character stagger effect
    tl.fromTo(
      dscRef.current,
      { 
        opacity: 0, 
        y: 80,
        rotateX: -45,
        transformOrigin: "bottom center"
      },
      { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out"
      },
      "-=0.4"
    );

    // "DAU" with slight delay
    tl.fromTo(
      dauRef.current,
      { 
        opacity: 0, 
        y: 80,
        rotateX: -45,
        transformOrigin: "bottom center"
      },
      { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out"
      },
      "-=0.7"
    );

    // Subtitle typing effect simulation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );

    // Floating icons staggered entrance
    const icons = floatingIconsRef.current?.querySelectorAll('.floating-icon');
    if (icons) {
      tl.fromTo(
        icons,
        { opacity: 0, scale: 0, rotation: -15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        },
        "-=0.4"
      );
    }

    // Continuous floating animation for icons
    icons?.forEach((icon, i) => {
      gsap.to(icon, {
        y: i % 2 === 0 ? -12 : 12,
        duration: 2.5 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;

      gsap.to(floatingIconsRef.current?.querySelectorAll('.parallax-layer-1') || [], {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(floatingIconsRef.current?.querySelectorAll('.parallax-layer-2') || [], {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Gradient background instead of grid everywhere */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Subtle grid overlay - only on part of the screen */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)'
        }}
      />

      {/* Accent gradient blobs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-gdg-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-gdg-green/5 blur-[100px] pointer-events-none" />

      {/* Vertical side text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground/50 uppercase">
          Build • Learn • Grow
        </span>
      </div>

      {/* Floating tech icons with parallax */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-icon parallax-layer-1 absolute top-40 right-[15%] hidden lg:flex">
          <div className="w-16 h-16 border border-gdg-green/30 bg-gdg-green/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg shadow-gdg-green/10">
            <Smartphone className="w-7 h-7 text-gdg-green" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-2 absolute bottom-40 right-[20%] hidden lg:flex">
          <div className="w-14 h-14 border border-gdg-blue/30 bg-gdg-blue/5 backdrop-blur-sm rounded-lg flex items-center justify-center rotate-12 shadow-lg shadow-gdg-blue/10">
            <Cloud className="w-6 h-6 text-gdg-blue" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-1 absolute top-60 left-[10%] hidden lg:flex">
          <div className="w-14 h-14 border border-gdg-red/30 bg-gdg-red/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg shadow-gdg-red/10">
          <Brain className="w-6 h-6 text-gdg-red" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-2 absolute bottom-60 left-[18%] hidden lg:flex">
          <div className="w-12 h-12 border border-gdg-yellow/30 bg-gdg-yellow/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg shadow-gdg-yellow/10">
          <Code2 className="w-5 h-5 text-gdg-yellow" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-1 absolute top-32 left-[25%] hidden lg:flex">
          <div className="w-12 h-12 border border-foreground/10 bg-foreground/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
            <Terminal className="w-5 h-5 text-foreground/40" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto pt-20 md:pt-32">
        {/* GDG Badge */}
        <div ref={badgeRef} className="mb-8 opacity-0">
          <div className="inline-flex items-center gap-3 border border-border/50 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm">
            <img src="/logo.png" alt="DSC DAU logo" className="w-5 h-5 object-contain" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Google Developer Student Club
            </span>
            <span className="w-2 h-2 rounded-full bg-gdg-green animate-pulse" />
          </div>
        </div>

        {/* Main Heading - Stacked */}
        <div className="space-y-2 md:space-y-3 mb-10">
          <h1
            ref={welcomeRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-muted-foreground/70 opacity-0"
          >
            WELCOME TO
          </h1>
          <div className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85]">
              <span 
                ref={dscRef} 
                className="inline-block text-gdg-blue opacity-0"
                style={{ perspective: '1000px' }}
              >
                DSC
              </span>{" "}
              <span 
                ref={dauRef} 
                className="inline-block text-gdg-red opacity-0"
                style={{ perspective: '1000px' }}
              >
                DAU
              </span>
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed opacity-0"
        >
          A community of{" "}
          <span className="text-foreground font-medium">passionate developers</span>{" "}
          learning, growing, and building together. Powered by{" "}
          <span className="font-mono text-gdg-blue">Google Developers</span>.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center opacity-0">
            <Link
              to="/contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/10"
            >
              Join Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          <a
              href="#slop"
            className="group inline-flex items-center gap-3 border border-border bg-background/50 backdrop-blur-sm px-7 py-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-secondary hover:border-foreground/20"
          >
            <span className="font-mono text-muted-foreground">&lt;</span>
            Explore Projects
            <span className="font-mono text-muted-foreground">/&gt;</span>
          </a>
          </div>

        {/* University marker - more subtle */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          <span className="font-mono text-xs text-muted-foreground/60 tracking-wide">
            Dhirubhai Ambani University • Gandhinagar, India
          </span>
        </div>
      </div>

      {/* Bottom code decoration */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="font-mono text-[10px] text-muted-foreground/40 text-right space-y-1">
          <div><span className="text-gdg-blue/50">const</span> location = <span className="text-gdg-green/50">"23.0°N, 72.5°E"</span>;</div>
          <div><span className="text-gdg-blue/50">const</span> status = <span className="text-gdg-yellow/50">"building"</span>;</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
