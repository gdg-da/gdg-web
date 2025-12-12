import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const teamMembers = [
  {
    name: "Abhishek Abbi",
    role: "Organizer",
    image: "/photo.webp",
    color: "gdg-blue",
    stats: ["JavaScript", "C++", "Full-stack"],
    quote: "I translate ideas into functional code that makes a difference.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Parth Vadodaria",
    role: "Dy. Convener",
    image: "/photo.webp",
    color: "gdg-red",
    stats: ["Java", "SpringBoot", "Android"],
    quote: "Building robust applications that scale and perform.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Jash Shah",
    role: "Core Member",
    image: "/photo.webp",
    color: "gdg-green",
    stats: ["ML", "GenAI", "Python"],
    quote: "Exploring the frontiers of AI and machine learning.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Harsh Gajjar",
    role: "Core Member",
    image: "/photo.webp",
    color: "gdg-yellow",
    stats: ["MERN", "React Native", "TypeScript"],
    quote: "Crafting seamless experiences across web and mobile.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Pranshu Patel",
    role: "Core Member",
    image: "/photo.webp",
    color: "gdg-blue",
    stats: ["ReactJS", "Web3", "Solidity"],
    quote: "Decentralizing the future, one smart contract at a time.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Dhruv Jain",
    role: "Core Member",
    image: "/photo.webp",
    color: "gdg-red",
    stats: ["MERN", "Socket.io", "Node.js"],
    quote: "Real-time applications are my specialty.",
    social: { github: "#", linkedin: "#", twitter: "#" }
  },
];

const TeamCard = ({ member, index }: { member: typeof teamMembers[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="trading-card perspective-1000 w-full aspect-[3/4]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="border-2 border-foreground bg-background paper-shadow h-full overflow-hidden">
            {/* Card header with color */}
            <div
              className="h-2"
              style={{ backgroundColor: `hsl(var(--${member.color}))` }}
            />

            {/* Image */}
            <div className="p-4 pb-0">
              <div className="relative border-2 border-foreground overflow-hidden bg-secondary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Corner badge */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-background border border-foreground font-mono text-xs">
                  #{String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p
                className="font-mono text-sm uppercase tracking-wider mb-3"
                style={{ color: `hsl(var(--${member.color}))` }}
              >
                {member.role}
              </p>

              {/* Tech stats */}
              <div className="flex flex-wrap gap-1">
                {member.stats.map((stat, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs font-mono border border-foreground/30 bg-secondary"
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
          className="absolute inset-0 backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div
            className="border-2 border-foreground h-full p-6 flex flex-col justify-between"
            style={{ backgroundColor: `hsl(var(--${member.color}) / 0.1)` }}
          >
            {/* Quote */}
            <div>
              <div className="text-4xl font-bold text-foreground/20 mb-2">"</div>
              <p className="text-sm italic text-foreground/80">
                {member.quote}
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Connect
              </p>
              <div className="flex gap-3">
                <a
                  href={member.social.github}
                  className="p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.social.linkedin}
                  className="p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.social.twitter}
                  className="p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Name reminder */}
            <div className="pt-4 border-t border-foreground/20">
              <p className="font-bold">{member.name}</p>
              <p className="font-mono text-xs" style={{ color: `hsl(var(--${member.color}))` }}>
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-20 px-4 graph-paper">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with construction tape */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-foreground" />
            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
              The Crew
            </span>
          </div>

          {/* Construction tape effect */}
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              THE <span className="text-gdg-yellow">BUILDERS</span>
            </h2>
            <div className="absolute -right-8 -top-2 w-16 h-4 bg-gdg-yellow/30 -rotate-12 hidden md:block">
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,hsl(var(--foreground)/0.3)_4px,hsl(var(--foreground)/0.3)_8px)]" />
            </div>
          </div>

          <p className="mt-4 text-muted-foreground max-w-xl">
            The passionate individuals behind DSC DA-IICT, working together to build an amazing developer community.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6 font-mono">
            Want to be part of the team?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gdg-green text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider text-sm paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-foreground"
          >
            Apply Now
            <span className="dimension-marker text-primary-foreground/70">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;