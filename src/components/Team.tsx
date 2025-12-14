import { useRef, useState } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import teamMembers from "@/data/teamData";

gsap.registerPlugin(ScrollTrigger);


const TeamCard = ({ member, index }: { member: typeof teamMembers[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="team-card perspective-1000 w-full aspect-[3/4] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-border/80">
            {/* Card header with color */}
            <div
              className="h-1"
              style={{ backgroundColor: `hsl(var(--${member.color}))` }}
            />

            {/* Image */}
            <div className="p-4 pb-0">
              <div className="relative rounded-lg overflow-hidden bg-secondary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Number badge */}
                {/* <div 
                  className="absolute bottom-2 left-2 px-2 py-1 rounded-md font-mono text-[10px] font-medium text-white"
                  style={{ backgroundColor: `hsl(var(--${member.color}))` }}
                >
                  #{String(index + 1).padStart(2, '0')}
                </div> */}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-4"
                style={{ color: `hsl(var(--${member.color}))` }}
              >
                {member.role}
              </p>

              {/* Tech stats */}
              <div className="flex flex-wrap gap-1.5">
                {member.stats.map((stat, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[10px] font-mono rounded-md border border-border bg-secondary/50"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div
            className="h-full rounded-xl border border-border p-6 flex flex-col justify-between"
            style={{ 
              background: `linear-gradient(135deg, hsl(var(--${member.color}) / 0.1) 0%, hsl(var(--card)) 100%)`
            }}
          >
            {/* Quote */}
            <div>
              <div 
                className="text-5xl font-bold mb-4"
                style={{ color: `hsl(var(--${member.color}) / 0.3)` }}
              >
                "
              </div>
              <p className="text-sm leading-relaxed italic text-muted-foreground">
                {member.quote}
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
                Connect
              </p>
              <div className="flex gap-2">
                {member.social.github ? (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-2.5 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                ) : null}

                {member.social.linkedin ? (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-2.5 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                ) : null}

                {member.social.twitter ? (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Twitter`}
                    className="p-2.5 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                ) : null}
              </div>
            </div>

            {/* Name reminder */}
            <div className="pt-4 border-t border-border/50">
              <p className="font-bold text-sm">{member.name}</p>
              <p 
                className="font-mono text-[10px]"
                style={{ color: `hsl(var(--${member.color}))` }}
              >
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
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

    // Team cards staggered animation
    const cards = gridRef.current?.querySelectorAll('.team-card');
    if (cards) {
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.6,
        stagger: {
          each: 0.1,
          from: "start"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="team" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 graph-paper opacity-30" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div ref={headerRef} className="section-header">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">The Crew</span>
          </div>
          <h2 className="section-title">
            Meet The{" "}
            <span className="text-gdg-yellow">Builders</span>
          </h2>
          <p className="section-description">
            The passionate individuals behind DSC DAU, working together to build 
            an amazing developer community.
          </p>
        </div>

        {/* Team Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Join CTA */}
        {/* <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 font-mono text-sm">
            Want to be part of the team?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gdg-green text-white px-8 py-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gdg-green/20"
          >
            Apply Now
            <span className="font-mono opacity-70">→</span>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Team;
