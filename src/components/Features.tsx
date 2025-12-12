import { motion } from "framer-motion";
import { BookOpen, Wrench, GitBranch, PenTool } from "lucide-react";

const features = [
  {
    title: "Info Sessions",
    description: "Step-by-step guides on the hottest tech stacks. From web to mobile to cloud.",
    icon: BookOpen,
    color: "gdg-blue",
    span: "md:col-span-2 md:row-span-2",
    large: true
  },
  {
    title: "Hands-on Workshops",
    description: "Building apps live with industry mentors. Learn by doing, not just watching.",
    icon: Wrench,
    color: "gdg-red",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    title: "SLoP",
    subtitle: "Semester Long Projects",
    description: "Helping students enter the Open Source world through guided mentorship.",
    icon: GitBranch,
    color: "gdg-green",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    title: "Code Dementia",
    description: "Our Tech Blog on Medium. Deep dives, tutorials, and developer stories.",
    icon: PenTool,
    color: "gdg-yellow",
    span: "md:col-span-1 md:row-span-1"
  }
];

const Features = () => {
  return (
    <section id="slop" className="py-20 px-4 graph-paper">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-foreground" />
            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Building <span className="text-gdg-blue">Together</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${feature.span} relative group`}
            >
              <div className="h-full border-2 border-foreground bg-background p-6 paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-foreground/30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-foreground/30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-foreground/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-foreground/30" />

                {/* Icon */}
                <div 
                  className="inline-flex p-3 border-2 border-foreground mb-4 w-fit"
                  style={{ backgroundColor: `hsl(var(--${feature.color}) / 0.1)` }}
                >
                  <feature.icon 
                    className="w-6 h-6" 
                    style={{ color: `hsl(var(--${feature.color}))` }} 
                  />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{ color: `hsl(var(--${feature.color}))` }}
                >
                  {feature.title}
                </h3>
                
                {feature.subtitle && (
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {feature.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-muted-foreground text-sm flex-1">
                  {feature.description}
                </p>

                {/* Ruler ticks at bottom */}
                <div className="mt-4 flex items-center">
                  <div className="flex-1 h-[1px] bg-border relative">
                    {[...Array(feature.large ? 8 : 5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-0 w-[1px] h-2 bg-border"
                        style={{ left: `${i * (100 / (feature.large ? 7 : 4))}%` }}
                      />
                    ))}
                  </div>
                  <span className="dimension-marker text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;