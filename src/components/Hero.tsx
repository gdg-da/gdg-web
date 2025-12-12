import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Smartphone, Cloud, Brain, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingElement = ({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className={`absolute ${className}`}
  >
    {children}
  </motion.div>
);

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [0, 1], [-30, 30]);
  const parallaxY = useTransform(mouseY, [0, 1], [-30, 30]);
  const parallaxX2 = useTransform(mouseX, [0, 1], [-20, 20]);
  const parallaxY2 = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden graph-paper">
      {/* Vertical side text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <span className="font-mono text-xs tracking-[0.5em] text-muted-foreground uppercase">
          Think • Build • Disrupt
        </span>
      </div>

      {/* Dimension markers */}
      <FloatingElement delay={0.8} className="top-32 right-8 hidden md:block">
        <div className="dimension-marker flex items-center gap-2">
          <div className="w-12 h-[1px] bg-muted-foreground" />
          <span>100px</span>
        </div>
      </FloatingElement>

      <FloatingElement delay={1} className="bottom-32 left-12 hidden md:block">
        <div className="dimension-marker flex flex-col items-center gap-2">
          <div className="h-16 w-[1px] bg-muted-foreground" />
          <span>20cm</span>
        </div>
      </FloatingElement>

      {/* Floating tech icons with parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-40 right-[15%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 border-2 border-gdg-green bg-gdg-green/10 paper-shadow-sm flex items-center justify-center"
        >
          <Smartphone className="w-8 h-8 text-gdg-green" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        className="absolute bottom-40 right-[20%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-16 h-16 border-2 border-gdg-blue bg-gdg-blue/10 paper-shadow-sm flex items-center justify-center rotate-12"
        >
          <Cloud className="w-6 h-6 text-gdg-blue" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: parallaxX, y: parallaxY2 }}
        className="absolute top-60 left-[10%] hidden lg:block"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 border-2 border-gdg-red bg-gdg-red/10 paper-shadow-sm flex items-center justify-center"
        >
          <Brain className="w-6 h-6 text-gdg-red" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: parallaxX2, y: parallaxY }}
        className="absolute bottom-60 left-[18%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-12 h-12 border-2 border-gdg-yellow bg-gdg-yellow/10 paper-shadow-sm flex items-center justify-center"
        >
          <Code2 className="w-5 h-5 text-gdg-yellow" />
        </motion.div>
      </motion.div>

      {/* Paper cutout cloud */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-32 left-[22%] hidden lg:block"
      >
        <motion.svg
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          width="80"
          height="50"
          viewBox="0 0 80 50"
          className="fill-secondary stroke-foreground stroke-2"
        >
          <path d="M20 35 Q5 35 5 25 Q5 15 20 15 Q20 5 35 5 Q50 5 50 15 Q65 10 70 20 Q80 25 70 35 Z" />
        </motion.svg>
      </motion.div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto pt-20 md:pt-32">
        {/* GDG Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 border-2 border-foreground px-4 py-2 paper-shadow-sm bg-background">
            <img src="/logo.png" alt="DSC DAU logo" className="w-6 h-6 object-contain" />
            <span className="font-mono text-xs uppercase tracking-wider">
              Developer Student Club
            </span>
          </div>
        </motion.div>

        {/* Main Heading - Stacked */}
        <div className="space-y-2 md:space-y-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-muted-foreground"
          >
            WELCOME TO
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]"
          >
            <span className="text-gdg-blue">DSC</span>{" "}
            <span className="text-gdg-red">DAU</span>
            {/* <span className="text-gdg-yellow">DAU</span> */}
            {/* <span className="text-gdg-green">DAU</span> */}
          </motion.h1>
        </div>

        {/* Typewriter Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-mono h-auto md:h-14"
        >
          <TypewriterText
            text="A Developer Student Club for university students to learn, grow, and build together."
            delay={1.2}
          />
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <div className="relative">
            {/* Dimension arrow pointing to button */}
            <div className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 items-center gap-1 dimension-marker">
              <span>←</span>
              <span>cta</span>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 font-bold uppercase tracking-wider text-sm paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Join Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            {/* <a
              href="#slop"
              className="group inline-flex items-center gap-2 border-2 border-foreground bg-background px-8 py-4 font-bold uppercase tracking-wider text-sm paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              View Projects
            </a> */}
            {/* Dimension marker */}
            <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 items-center gap-1 dimension-marker">
              <span>200px</span>
              <span>→</span>
            </div>
          </div>
        </motion.div>

        {/* DA-IICT marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-[1px] w-16 bg-border" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Dhirubhai Ambani University, Gandhinagar
          </span>
        </motion.div>
      </div>

      {/* Bottom grid coordinates */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="dimension-marker">
          <span className="text-muted-foreground">
            23.0°N, 72.5°E
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;