import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, MapPin, Heart, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/ossdaiict", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/gdg-daiict", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/gdg.daiict", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/gdg_daiict", label: "Twitter" },
];

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "SLoP", href: "#slop" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  return (
    <footer id="contact" className="bg-foreground text-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gdg-blue" />
                <div className="w-4 h-4 bg-gdg-red" />
                <div className="w-4 h-4 bg-gdg-yellow" />
                <div className="w-4 h-4 bg-gdg-green" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight leading-none">DSC DA-IICT</span>
                <span className="font-mono text-xs text-background/60 leading-none">Previously GDG on Campus DA-IICT</span>
              </div>
            </div>
            <p className="text-background/70 mb-6 font-mono text-sm">
              Developer Student Clubs at DA-IICT is a student-run community fostering tech skills and innovation.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <MapPin className="w-4 h-4" />
              <span className="font-mono">Gandhinagar, Gujarat, India</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gdg-blue" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-background/70 hover:text-background hover:translate-x-2 inline-block transition-all"
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gdg-red" />
              Connect With Us
            </h3>
            <a
              href="mailto:gdg@daiict.ac.in"
              className="flex items-center gap-2 text-background/70 hover:text-background transition-colors mb-6 font-mono text-sm"
            >
              <Mail className="w-4 h-4" />
              gdg@daiict.ac.in
            </a>

            {/* Social Icons - Chunky style */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-background/30 hover:border-background hover:bg-background hover:text-foreground transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider with ruler marks */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="flex justify-between mb-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-[1px] h-2 bg-background/20" />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="flex items-center gap-2 text-sm text-background/60 font-mono">
            Made with <Heart className="w-4 h-4 text-gdg-red fill-gdg-red" /> by DSC DA-IICT Team
          </p>

          <div className="flex items-center gap-4">
            <span className="dimension-marker text-background/40">
              © {new Date().getFullYear()}
            </span>
            <span className="text-background/20">|</span>
            <span className="dimension-marker text-background/40">
              v1.0.0
            </span>
            <span className="text-background/20">|</span>

            {/* Theme Toggle Easter Egg */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-background/30 hover:border-background hover:bg-background hover:text-foreground transition-all group"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Large decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.05, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center overflow-hidden"
        >
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter whitespace-nowrap">
            DSC DA-IICT
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;