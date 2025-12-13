import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

import { FaReact, FaAndroid, FaPython, FaNodeJs } from "react-icons/fa";
import { SiFlutter, SiFirebase, SiPytorch, SiGooglecloud, SiKubernetes, SiTypescript, SiGo, SiNextdotjs, SiExpress, SiDocker, SiVercel } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  // Web Development
  { name: "React", icon: <FaReact />, color: "gdg-blue", category: "Web" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "foreground", category: "Web" },
  { name: "TypeScript", icon: <SiTypescript />, color: "gdg-blue", category: "Web" },
  
  // Mobile Development
  { name: "Flutter", icon: <SiFlutter />, color: "gdg-blue", category: "Mobile" },
  { name: "Android", icon: <FaAndroid />, color: "gdg-green", category: "Mobile" },
  
  // Backend & APIs
  { name: "Node.js", icon: <FaNodeJs />, color: "gdg-green", category: "Backend" },
  { name: "Express.js", icon: <SiExpress />, color: "gdg-black", category: "Backend" },
  { name: "Go", icon: <SiGo />, color: "gdg-blue", category: "Backend" },
  { name: "Firebase", icon: <SiFirebase />, color: "gdg-orange", category: "Backend" },
  
  // Cloud & DevOps
  { name: "Google Cloud", icon: <SiGooglecloud />, color: "gdg-blue", category: "Cloud" },
  { name: "Vercel", icon: <SiVercel />, color: "gdg-black", category: "Cloud" },
  { name: "Docker", icon: <SiDocker />, color: "gdg-blue", category: "Cloud" },
  { name: "Kubernetes", icon: <SiKubernetes />, color: "gdg-blue", category: "DevOps" },
  
  // AI & Data
  { name: "PyTorch", icon: <SiPytorch />, color: "gdg-red", category: "AI/ML" },
  { name: "Python", icon: <FaPython />, color: "gdg-yellow", category: "AI/ML" },
];

const Technologies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Staggered grid animation with wave effect
    const cards = gridRef.current?.querySelectorAll('.tech-card');
    if (cards) {
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: "start",
          grid: "auto",
          ease: "power2.out"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Add hover animation to each card
      cards.forEach((card) => {
        const icon = card.querySelector('.tech-icon');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1.15,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div ref={headerRef} className="section-header text-center">
          <div className="section-label justify-center">
            <div className="section-label-line" />
            <span className="section-label-text">Our Stack</span>
            <div className="section-label-line rotate-180" />
          </div>
          <h2 className="section-title">
            Technologies We{" "}
            <span className="text-gdg-green">Build With</span>
          </h2>
          <p className="section-description mx-auto text-center">
            From mobile to cloud, AI to web—we explore and master cutting-edge technologies 
            that power modern applications.
          </p>
        </div>

        {/* Tech Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group cursor-pointer"
            >
              <div className="h-full p-5 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors duration-300 flex flex-col items-center text-center relative overflow-hidden">
                {/* Subtle gradient on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, hsl(var(--${tech.color}) / 0.08) 0%, transparent 70%)`
                  }}
                />
                
                {/* Icon */}
                <div
                  className="tech-icon text-3xl md:text-4xl mb-3 relative z-10 transition-colors duration-300"
                  style={{ color: `hsl(var(--${tech.color}))` }}
                >
                  {tech.icon}
                </div>

                {/* Name */}
                <p className="font-semibold text-sm mb-1 relative z-10">
                  {tech.name}
                </p>

                {/* Category tag */}
                <span className="font-mono text-[10px] text-muted-foreground relative z-10">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span>+ many more in our workshops</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </p>
        </div>

      </div>
    </section>
  );
};

export default Technologies;
