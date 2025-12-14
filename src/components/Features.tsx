import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { BookOpen, Wrench, GitBranch, PenTool, ExternalLink, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Info Sessions",
    description: "Step-by-step deep dives into the hottest tech stacks. From web fundamentals to cloud architecture.",
    icon: BookOpen,
    color: "gdg-blue",
    span: "md:col-span-2 md:row-span-2",
    large: true,
    stats: { sessions: "20+", attendees: "500+" }
  },
  {
    title: "Hands-on Workshops",
    description: "Build real applications with industry mentors. Learn by doing, not just watching.",
    icon: Wrench,
    color: "gdg-red",
    span: "md:col-span-1 md:row-span-1",
    stats: { projects: "15+" }
  },
  {
    title: "SLoP",
    subtitle: "Semester Long Projects",
    description: "Our flagship open-source program. Build real projects, contribute to OSS, and become industry-ready with mentorship from experts.",
    website: "https://slop.dscdaiict.in/",
    icon: GitBranch,
    color: "gdg-green",
    span: "md:col-span-1 md:row-span-2",
    stats: { contributors: "100+", repos: "20+" } 
  },
  {
    title: "Code Dementia",
    description: "Our tech publication on Medium. Deep dives, tutorials, and developer stories from the community.",
    website: "https://medium.com/code-dementia/",
    icon: PenTool,
    color: "gdg-yellow",
    span: "md:col-span-1 md:row-span-1",
    stats: { articles: "20+" }
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards staggered animation
    const cards = gridRef.current?.querySelectorAll('.feature-card');
    if (cards) {
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.7,
        stagger: {
          each: 0.12,
          from: "start"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="slop" className="py-24 px-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 graph-paper opacity-50" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">What We Do</span>
          </div>
          <h2 className="section-title">
            Building{" "}
            <span className="text-gdg-blue">Together</span>
          </h2>
          <p className="section-description">
            From workshops to open-source projects, we create opportunities for developers 
            to learn, collaborate, and grow.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`feature-card ${feature.span} group`}
            >
              <div className="h-full rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-lg">
                {/* Gradient accent on top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{ background: `hsl(var(--${feature.color}))` }}
                />

                {/* Background gradient on hover (visual only; don't block pointer events) */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, hsl(var(--${feature.color}) / 0.05) 0%, transparent 50%)`
                  }}
                />

                {/* Icon */}
                <div 
                  className="inline-flex p-3 rounded-lg mb-5 w-fit transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `hsl(var(--${feature.color}) / 0.1)`,
                    color: `hsl(var(--${feature.color}))`
                  }}
                >
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {feature.website ? (
                      <a
                        href={feature.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-gdg-blue transition-colors group/link"
                      >
                        {feature.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    ) : (
                      feature.title
                    )}
                  </h3>
                </div>
                
                {feature.subtitle && (
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {feature.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>

                {feature.website && (
                  <div className="mt-3">
                    <a
                      href={feature.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gdg-blue hover:underline"
                    >
                      Learn more →
                    </a>
                  </div>
                )}

                {/* Stats */}
                {feature.stats && (
                  <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-4">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="flex items-baseline gap-1.5">
                        <span 
                          className="text-lg font-bold"
                          style={{ color: `hsl(var(--${feature.color}))` }}
                        >
                          {value}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* External link indicator */}
                {feature.website && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={feature.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1 z-10"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative code comment */}
        <div className="hidden md:block absolute -left-20 bottom-20 opacity-[0.04] pointer-events-none">
          <pre className="font-mono text-xs rotate-90 origin-left whitespace-nowrap">
            {"// Building the future, one commit at a time"}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Features;
