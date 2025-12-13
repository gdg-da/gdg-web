import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

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
  <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap px-4">
    {marqueeItems.map((item, index) => (
      <div key={index} className="flex items-center gap-8 md:gap-12">
        <span className="text-lg md:text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity cursor-default">
          {item.text}
        </span>
        <span 
          className="w-2 h-2 rounded-full opacity-60"
          style={{ backgroundColor: `hsl(var(--${item.color}))` }}
        />
      </div>
    ))}
  </div>
);

const Marquee = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Fade in animation
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-foreground text-background py-5 overflow-hidden"
    >
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />
      
      {/* Marquee track */}
      <div className="flex animate-marquee hover:pause">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
};

export default Marquee;
