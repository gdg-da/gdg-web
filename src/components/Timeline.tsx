import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { Calendar, Globe, Code, Cpu, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: "SLoP 5.0",
    date: "September - December 2025",
    description: "Semester Long Projects - Our flagship open source program aligned with Hacktoberfest. Mentor-guided contributions to real projects.",
    type: "Open Source",
    icon: Code,
    color: "gdg-green",
    status: "upcoming"
  },
  {
    id: 2,
    title: "TechLoop: Exploring AI & Blockchain",
    date: "August 2024",
    description: "Introduction to the full curious world of development, with guiding from HTML to Web3 all at once.",
    type: "Tech Talk",
    icon: Cpu,
    color: "gdg-yellow",
    status: "completed"
  },
  {
    id: 3,
    title: "KDE (K Desktop Environment) Event",
    date: "April 2025",
    description: "3-day events of KDE with expert lead event on free and open source of KDE",
    type: "Conference",
    icon: Globe,
    color: "gdg-blue",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Dev-O-Lution",
    date: "January 2025",
    description: "Dev-o-lution is a tech conference where code evolves and innovation thrives. It has everything from workshops, talks, and mind-expanding sessions that will revolutionize your dev skills!",
    type: "Conference",
    icon: Calendar,
    color: "gdg-red",
    status: "upcoming"
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

    // Timeline line draw animation
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    // Event cards animation
    const cards = timelineRef.current?.querySelectorAll('.timeline-card');
    cards?.forEach((card, index) => {
      const direction = index % 2 === 0 ? -60 : 60;
      
      gsap.from(card, {
        opacity: 0,
        x: direction,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Node markers animation
    const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
    nodes?.forEach((node) => {
      gsap.from(node, {
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div ref={headerRef} className="section-header text-center">
          <div className="section-label justify-center">
            <div className="section-label-line" />
            <span className="section-label-text">What's Happening</span>
            <div className="section-label-line rotate-180" />
          </div>
          <h2 className="section-title">
            Recent{" "}
            <span className="text-gdg-red">Events</span>
          </h2>
          <p className="section-description mx-auto text-center">
            From workshops to hackathons, we host events that inspire learning 
            and foster community connections.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16">
          {/* Central line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-foreground/20 to-border md:-translate-x-1/2"
          />

          {/* Events */}
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`timeline-card relative flex items-start ${
                  index % 2 === 0 
                    ? "md:flex-row flex-row" 
                    : "md:flex-row-reverse flex-row"
                }`}
              >
                {/* Node marker */}
                <div className="timeline-node absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-background flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: `hsl(var(--${event.color}))`,
                    }}
                  >
                    <event.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-48px)] ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:shadow-lg cursor-pointer relative overflow-hidden">
                    {/* Status indicator */}
                    {event.status === "upcoming" && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gdg-green/10 text-gdg-green text-[10px] font-mono uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-gdg-green animate-pulse" />
                          Upcoming
                        </span>
                      </div>
                    )}

                    {/* Event type badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span 
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md font-mono text-xs uppercase tracking-wide"
                        style={{ 
                          backgroundColor: `hsl(var(--${event.color}) / 0.1)`,
                          color: `hsl(var(--${event.color}))`
                        }}
                      >
                        {event.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gdg-blue transition-colors">
                      {event.title}
                    </h3>

                    {/* Date */}
                    <p className="font-mono text-sm text-muted-foreground mb-4">
                      📅 {event.date}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-5 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Learn more
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span>More events coming soon</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
