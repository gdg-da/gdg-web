import { motion } from "framer-motion";

const MarqueeContent = () => (
  <div className="flex items-center gap-8 whitespace-nowrap">
    <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Web Development</span>
    <span className="text-2xl">•</span>
    <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Android</span>
    <span className="text-2xl">•</span>
    <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Cloud Computing</span>
    <span className="text-2xl">•</span>
    <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Machine Learning</span>
    <span className="text-2xl">•</span>
    <span className="text-lg md:text-xl font-bold uppercase tracking-wider">Open Source</span>
    <span className="text-2xl">•</span>
  </div>
);

const Marquee = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gdg-yellow text-foreground py-4 border-y-2 border-foreground overflow-hidden"
    >
      <div className="animate-marquee flex">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </motion.section>
  );
};

export default Marquee;