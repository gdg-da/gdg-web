import { useRef, useState, useEffect } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { Github, Linkedin, Instagram, Twitter, Mail, MapPin, Heart, Sun, Moon, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: "https://github.com/ossdaiict", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/gdg-on-campus-daiict/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/gdg.daiict/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/gdgdaiict", label: "Twitter" },
];

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
];

const resourceLinks = [
  { name: "Google Developers", href: "https://developers.google.com/", external: true },
  { name: "GDG Community", href: "https://developers.google.com/community/gdg", external: true },
  { name: "SLoP Program", href: "https://slop.dscdaiict.in/", external: true },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Staggered reveal animation
    const elements = contentRef.current?.querySelectorAll('.footer-animate');
    if (elements) {
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-foreground text-background overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-background/20 to-transparent" />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div ref={contentRef} className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="footer-animate lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/gdg-logo.png" alt="DSC DAU logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight leading-none">DSC DAU</span>
                <span className="font-mono text-[10px] text-background/50 leading-none mt-1">
                  Formerly GDG on Campus DAU
                </span>
              </div>
            </div>
            <p className="text-background/70 mb-6 max-w-sm leading-relaxed">
              Developer Student Club at DAU is a student-run community fostering tech skills, 
              innovation, and collaboration among developers.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-xs">Gandhinagar, Gujarat, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gdg-blue" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-mono text-sm text-background/60 hover:text-background hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="text-background/30">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-animate">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gdg-green" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-background/60 hover:text-background inline-flex items-center gap-2 transition-all duration-200 group"
                  >
                    <span className="text-background/30">→</span>
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="footer-animate border-t border-background/10 pt-10 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Email */}
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gdg-red" />
                Get in Touch
              </h3>
              <a
                href="mailto:dsc@dau.ac.in"
                className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors font-mono text-sm"
              >
                <Mail className="w-4 h-4" />
                dsc@dau.ac.in
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg border border-background/20 hover:border-background/50 hover:bg-background/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-animate border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-background/50 font-mono">
            Made with <Heart className="w-4 h-4 text-gdg-red" /> by DSC DAU Team
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-background/30">
              © {new Date().getFullYear()}
            </span>
            <span className="text-background/20">•</span>
            <span className="font-mono text-xs text-background/30">
              v2.0.0
            </span>
            <span className="text-background/20">•</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-background/20 hover:border-background/50 hover:bg-background/10 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="relative overflow-hidden py-8">
        <div className="flex justify-center opacity-[0.03] pointer-events-none">
          <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            DSC DAU
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
