import { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGSAP";

const marqueeItems = [
  { text: "Full Stack Development", color: "gdg-blue" },
  { text: "Mobile Development", color: "gdg-red" },
  { text: "AI/ML", color: "gdg-green" },
  { text: "Agentic AI", color: "gdg-yellow" },
  { text: "Generative AI", color: "gdg-blue" },
  { text: "SAAS", color: "gdg-red" },
  { text: "DevOps", color: "gdg-green" },
  { text: "Web3", color: "gdg-yellow" },
];

const MarqueeContent = () => (
  <div className="flex items-center gap-12 md:gap-16 whitespace-nowrap px-6">
    {marqueeItems.map((item, index) => (
      <div key={index} className="flex items-center gap-12 md:gap-16 group cursor-default">
        <span 
          className="text-lg md:text-2xl font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
          style={{ color: `hsl(var(--${item.color}))` }}
        >
          {item.text}
        </span>
        <span 
          className="w-3 h-3 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
          style={{ backgroundColor: `hsl(var(--${item.color}))` }}
        />
      </div>
    ))}
  </div>
);

const Marquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // GSAP-powered infinite scroll - smoother than CSS
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    
    if (!track1 || !track2) return;

    // Get the width of one complete set
    const contentWidth = track1.scrollWidth / 2;

    // Create seamless infinite loop
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to([track1, track2], {
      x: -contentWidth,
      duration: 30,
      ease: "none",
    });

    // Pause on hover
    const handleMouseEnter = () => {
      gsap.to(tl, { timeScale: 0.3, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      gsap.to(tl, { timeScale: 1, duration: 0.5 });
    };

    const section = sectionRef.current;
    section?.addEventListener('mouseenter', handleMouseEnter);
    section?.addEventListener('mouseleave', handleMouseLeave);

    // Entrance animation
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
      }
    });

    return () => {
      section?.removeEventListener('mouseenter', handleMouseEnter);
      section?.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-foreground text-background py-6 overflow-hidden"
    >
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />
      
      {/* Marquee tracks */}
      <div className="flex">
        <div ref={track1Ref} className="flex shrink-0">
          <MarqueeContent />
          <MarqueeContent />
        </div>
        <div ref={track2Ref} className="flex shrink-0">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
