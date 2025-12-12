import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "SLoP", href: "#slop" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="bg-background/95 backdrop-blur-sm border-2 border-foreground paper-shadow-sm px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gdg-blue" />
              <div className="w-3 h-3 bg-gdg-red" />
              <div className="w-3 h-3 bg-gdg-yellow" />
              <div className="w-3 h-3 bg-gdg-green" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">DSC DA-IICT</span>
              <span className="font-mono text-[10px] text-muted-foreground leading-none">Previously GDG on Campus DA-IICT</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="scribble-underline font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Join Chapter Button with glitch effect */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 font-bold text-xs uppercase tracking-wider hover:bg-gdg-blue transition-colors relative group overflow-hidden"
          >
            <span className="relative z-10">Join</span>
            <span className="absolute inset-0 bg-gdg-red translate-x-0 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 z-0" />
            <span className="absolute inset-0 bg-gdg-blue -translate-x-0 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 z-0" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border-2 border-foreground paper-shadow-sm hover:bg-secondary transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-4 border-t-2 border-foreground mt-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2 font-bold text-xs uppercase tracking-wider"
                >
                  Join Chapter
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;