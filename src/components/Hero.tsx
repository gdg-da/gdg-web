import { useRef, useEffect } from "react";
import { ArrowRight, Smartphone, Cloud, Brain, Code2, Terminal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set([welcomeRef.current, titleRef.current, subtitleRef.current, ctaRef.current, badgeRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Master timeline with custom easing
    const masterTL = gsap.timeline({ 
      defaults: { ease: "power4.out" },
      delay: 0.3
    });

    // Animated gradient glow
    gsap.to(glowRef.current, {
      backgroundPosition: "200% 200%",
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Badge with bounce
    masterTL.fromTo(
      badgeRef.current,
      { opacity: 0, y: 40, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // "WELCOME TO" - character by character reveal
    const welcomeText = welcomeRef.current;
    if (welcomeText) {
      const chars = welcomeText.innerText.split('');
      welcomeText.innerHTML = chars.map(char => 
        `<span class="inline-block" style="opacity:0;transform:translateY(50px) rotateX(-90deg)">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      masterTL.to(
        welcomeText.querySelectorAll('span'),
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)"
        },
        "-=0.4"
      );
    }

    // DSC DAU letters - dramatic 3D entrance
    const letters = titleRef.current?.querySelectorAll('.hero-letter');
    if (letters) {
      masterTL.fromTo(
        letters,
        { 
          opacity: 0, 
          y: 120,
          rotateX: -90,
          scale: 0.5,
          transformOrigin: "center bottom"
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.08,
            from: "start"
          },
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.3"
      );

      // Removed continuous 'dancing' animation: keep the initial entrance only
    }

    // Subtitle with word reveal
    const subtitleWords = subtitleRef.current?.querySelectorAll('.subtitle-word');
    if (subtitleWords) {
      masterTL.fromTo(
        subtitleWords,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.05
        },
        "-=0.5"
      );
    }

    // CTA buttons with magnetic effect setup
    const ctaButtons = ctaRef.current?.querySelectorAll('.cta-button');
    if (ctaButtons) {
      masterTL.fromTo(
        ctaButtons,
        { opacity: 0, y: 40, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

      // Magnetic hover effect
      ctaButtons.forEach((button) => {
        const btn = button as HTMLElement;
        
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });
    }

    // Floating icons with stagger and rotation
    const icons = floatingIconsRef.current?.querySelectorAll('.floating-icon');
    if (icons) {
      masterTL.fromTo(
        icons,
        { opacity: 0, scale: 0, rotation: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1,
          stagger: 0.12,
          ease: "back.out(2)"
        },
        "-=0.8"
      );

      // Complex floating animation
      icons.forEach((icon, i) => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(icon, {
          y: (i % 2 === 0 ? -20 : 20),
          x: (i % 3 === 0 ? 10 : -10),
          rotation: (i % 2 === 0 ? 5 : -5),
          duration: 3 + i * 0.5,
          ease: "sine.inOut"
        })
        .to(icon, {
          y: 0,
          x: 0,
          rotation: 0,
          duration: 3 + i * 0.5,
          ease: "sine.inOut"
        });
      });
    }

    // Scroll indicator bounce
    masterTL.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: -20 },
      { opacity: 0.5, y: 0, duration: 0.6 },
      "-=0.2"
    );

    gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-line'), {
      scaleY: 1.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax on scroll
    gsap.to(floatingIconsRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(containerRef.current, {
      y: 50,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "50% top",
        scrub: 1
      }
    });

    // Mouse parallax for depth effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      // Layer 1 - furthest
      gsap.to(floatingIconsRef.current?.querySelectorAll('.parallax-layer-1') || [], {
        x: xPercent * 40,
        y: yPercent * 40,
        rotateY: xPercent * 10,
        rotateX: -yPercent * 10,
        duration: 1,
        ease: "power2.out"
      });

      // Layer 2 - closer
      gsap.to(floatingIconsRef.current?.querySelectorAll('.parallax-layer-2') || [], {
        x: xPercent * 25,
        y: yPercent * 25,
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 1,
        ease: "power2.out"
      });

      // Subtle glow follow
      gsap.to(glowRef.current, {
        x: xPercent * 100,
        y: yPercent * 100,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Split subtitle into words for animation
  const subtitleContent = "A community of passionate developers learning, growing, and building together.";
  
  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Animated glow orb */}
      <div 
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--gdg-blue) / 0.15) 0%, hsl(var(--gdg-green) / 0.1) 25%, hsl(var(--gdg-yellow) / 0.05) 50%, transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 100%)'
        }}
      />

      {/* Vertical side text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <span className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground/40 uppercase">
          Build • Learn • Grow
        </span>
      </div>

      {/* Floating tech icons with parallax */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <div className="floating-icon parallax-layer-1 absolute top-[20%] right-[12%] hidden lg:flex">
          <div className="w-20 h-20 border border-gdg-green/20 bg-gdg-green/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl shadow-gdg-green/20">
            <Smartphone className="w-8 h-8 text-gdg-green" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-2 absolute bottom-[25%] right-[18%] hidden lg:flex">
          <div className="w-16 h-16 border border-gdg-blue/20 bg-gdg-blue/5 backdrop-blur-md rounded-2xl flex items-center justify-center rotate-12 shadow-2xl shadow-gdg-blue/20">
            <Cloud className="w-7 h-7 text-gdg-blue" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-1 absolute top-[35%] left-[8%] hidden lg:flex">
          <div className="w-16 h-16 border border-gdg-red/20 bg-gdg-red/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl shadow-gdg-red/20">
            <Brain className="w-7 h-7 text-gdg-red" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-2 absolute bottom-[35%] left-[15%] hidden lg:flex">
          <div className="w-14 h-14 border border-gdg-yellow/20 bg-gdg-yellow/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl shadow-gdg-yellow/20">
            <Code2 className="w-6 h-6 text-gdg-yellow" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-1 absolute top-[15%] left-[22%] hidden lg:flex">
          <div className="w-12 h-12 border border-foreground/10 bg-foreground/5 backdrop-blur-md rounded-xl flex items-center justify-center shadow-xl">
            <Terminal className="w-5 h-5 text-foreground/50" />
          </div>
        </div>

        <div className="floating-icon parallax-layer-2 absolute top-[45%] right-[8%] hidden lg:flex">
          <div className="w-14 h-14 border border-gdg-blue/20 bg-gdg-blue/5 backdrop-blur-md rounded-xl flex items-center justify-center shadow-xl shadow-gdg-blue/10">
            <Sparkles className="w-6 h-6 text-gdg-blue" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto pt-16 md:pt-28">
        {/* GDG Badge */}
        <div ref={badgeRef} className="mb-8 opacity-0">
          <div className="inline-flex items-center gap-3 border border-border/30 px-5 py-2.5 rounded-full bg-background/60 backdrop-blur-xl shadow-lg">
            {/* <img src="/gdg-logo.png" alt="DSC DAU logo" className="w-6 h-6 object-contain" /> */}
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Developer Student Club
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gdg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gdg-green"></span>
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-3 md:space-y-4 mb-10">
          <h1
            ref={welcomeRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1] text-muted-foreground/60"
            style={{ perspective: '1000px' }}
          >
            WELCOME TO
          </h1>
          
          <div ref={titleRef} className="flex flex-wrap items-baseline gap-x-3 md:gap-x-5">
            <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]" style={{ perspective: '1000px' }}>
              <span className="hero-letter inline-block text-gdg-blue hover:scale-110 transition-transform cursor-default">D</span>
              <span className="hero-letter inline-block text-gdg-red hover:scale-110 transition-transform cursor-default">S</span>
              <span className="hero-letter inline-block text-gdg-yellow hover:scale-110 transition-transform cursor-default">C</span>
            </div>
            <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]" style={{ perspective: '1000px' }}>
              <span className="hero-letter inline-block text-gdg-green hover:scale-110 transition-transform cursor-default">D</span>
              <span className="hero-letter inline-block text-gdg-blue hover:scale-110 transition-transform cursor-default">A</span>
              <span className="hero-letter inline-block text-gdg-red hover:scale-110 transition-transform cursor-default">U</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          {subtitleContent.split(' ').map((word, i) => (
            <span key={i} className="subtitle-word inline-block mr-[0.3em]">
              {word === 'passionate' || word === 'developers' ? (
                <span className="text-foreground font-medium">{word}</span>
              ) : word === 'learning,' || word === 'growing,' || word === 'building' ? (
                <span className="text-gdg-blue">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
          <span className="subtitle-word inline-block">Powered by </span>
          <span className="subtitle-word inline-block font-mono text-gdg-blue font-medium">Google Developers</span>
          <span className="subtitle-word inline-block">.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-5 items-center">
          <a
            href="#contact"
            className="cta-button group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl font-semibold text-sm shadow-2xl shadow-foreground/20 hover:shadow-foreground/30 transition-shadow"
          >
            Join Community
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#slop"
            className="cta-button group inline-flex items-center gap-3 border border-border/50 bg-background/50 backdrop-blur-xl px-8 py-4 rounded-xl font-semibold text-sm shadow-xl hover:border-foreground/20 hover:bg-background/80 transition-all"
          >
            <span className="font-mono text-gdg-blue">&lt;</span>
            Explore Projects
            <span className="font-mono text-gdg-blue">/&gt;</span>
          </a>
        </div>

        {/* University marker */}
        <div className="mt-16 md:mt-24 flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-border" />
          <span className="font-mono text-xs text-muted-foreground/50 tracking-wide">
            Dhirubhai Ambani University • Gandhinagar, India
          </span>
        </div>
      </div>

      {/* Bottom code decoration */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="font-mono text-[10px] text-muted-foreground/30 text-right space-y-1">
          <div><span className="text-gdg-blue/40">const</span> location = <span className="text-gdg-green/40">"23.0°N, 72.5°E"</span>;</div>
          <div><span className="text-gdg-blue/40">const</span> status = <span className="text-gdg-yellow/40">"building"</span>;</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] text-muted-foreground/40 tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-line w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent origin-top" />
      </div>
    </section>
  );
};

export default Hero;
