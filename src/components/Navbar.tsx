import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  // { name: "SLoP", href: "/slop" },
  { name: "connect", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="bg-background/95 backdrop-blur-sm border-2 border-foreground paper-shadow-sm px-6 py-3">
        <div className="flex items-center justify-between w-full md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:justify-self-start">
            <img src="/logo.png" alt="DSC DAU logo" className="w-6 h-6 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">DSC DAU</span>
              <span className="font-mono text-[10px] text-muted-foreground leading-none">Formerly GDG on Campus DAU</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 md:justify-self-center">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="scribble-underline font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="scribble-underline font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Join Chapter Button with glitch effect */}
          {/* <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 font-bold text-xs uppercase tracking-wider hover:bg-gdg-blue transition-colors relative group overflow-hidden md:justify-self-end"
          >
            <span className="relative z-10">Join</span>
            <span className="absolute inset-0 bg-gdg-red translate-x-0 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 z-0" />
            <span className="absolute inset-0 bg-gdg-blue -translate-x-0 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 z-0" />
          </Link> */}

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
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-sm uppercase tracking-wider hover:text-gdg-blue transition-colors block"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2 font-bold text-xs uppercase tracking-wider w-full"
                  >
                    Join Chapter
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;