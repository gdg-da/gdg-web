import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "@/hooks/useGSAP";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Connect", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation - use fromTo for reliability
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(
          items,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1, ease: "power2.out" }
        );
      }
    }
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div 
        className={`rounded-2xl border transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-xl border-border shadow-lg" 
            : "bg-background/80 backdrop-blur-sm border-border/50"
        } px-5 py-3`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/gdg-logo.png" 
              alt="DSC DAU logo" 
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">
                DSC DAU
              </span>
              <span className="font-mono text-[9px] text-muted-foreground leading-none hidden sm:block">
                GDG on Campus DAU
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Join Button - Desktop */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            <span className="w-2 h-2 rounded-full bg-gdg-green animate-pulse" />
            Join
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 flex flex-col gap-2 border-t border-border mt-4">
              {navLinks.map((link) => (
                <div key={link.name} className="mobile-nav-item">
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                        isActive(link.href)
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                        isActive(link.href)
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mobile-nav-item mt-2">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-foreground text-background px-4 py-3 rounded-lg font-semibold text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-gdg-green animate-pulse" />
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
