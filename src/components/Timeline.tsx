import { motion } from "framer-motion";
import { Calendar, Globe, Code, Cpu } from "lucide-react";

const events = [
  {
    id: 1,
    title: "GSoC Intro Session",
    date: "November 2024",
    description: "An introduction to Google Summer of Code - learn how to get started with open source contributions and GSoC applications.",
    type: "Intra College",
    icon: Globe,
    color: "gdg-blue"
  },
  {
    id: 2,
    title: "SLoP 4.0",
    date: "September - December 2024",
    description: "Semester Long Projects - Our flagship open source program aligned with Hacktoberfest. Mentor-guided contributions to real projects.",
    type: "National Event",
    icon: Code,
    color: "gdg-green"
  },
  {
    id: 3,
    title: "CodeLabs: JavaScript Edition",
    date: "September 2024",
    description: "Hands-on workshop covering modern JavaScript fundamentals, ES6+ features, and practical coding exercises.",
    type: "Workshop",
    icon: Calendar,
    color: "gdg-red"
  },
  {
    id: 4,
    title: "TechLoop: Exploring AI & Blockchain",
    date: "August 2024",
    description: "Industry experts dive into the intersection of AI and Blockchain technologies, exploring real-world applications.",
    type: "Tech Talk",
    icon: Cpu,
    color: "gdg-yellow"
  },
];

const Timeline = () => {
  return (
    <section id="events" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-foreground" />
            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
              What's Happening
            </span>
            <div className="h-[2px] w-12 bg-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Recent <span className="text-gdg-red">Events</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line - styled as circuit trace */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-foreground transform md:-translate-x-1/2">
            {/* Circuit trace decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground" />
            {/* Dash marks along the line */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-[2px] bg-foreground"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
          </div>

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 
                    ? "md:flex-row flex-row" 
                    : "md:flex-row-reverse flex-row"
                }`}
              >
                {/* Node number */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div 
                    className="w-10 h-10 border-2 border-foreground bg-background flex items-center justify-center font-mono font-bold paper-shadow-sm"
                    style={{ backgroundColor: `hsl(var(--${event.color}) / 0.2)` }}
                  >
                    {String(event.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="border-2 border-foreground bg-background p-6 paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group cursor-pointer">
                    {/* Event type badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="inline-flex items-center gap-2 px-3 py-1 border border-foreground font-mono text-xs uppercase"
                        style={{ backgroundColor: `hsl(var(--${event.color}) / 0.1)` }}
                      >
                        <event.icon className="w-3 h-3" />
                        {event.type}
                      </span>
                      <span className="dimension-marker">{event.date.split(' ')[0]}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gdg-blue transition-colors">
                      {event.title}
                    </h3>

                    {/* Date */}
                    <p className="font-mono text-sm text-muted-foreground mb-3">
                      {event.date}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>

                    {/* Ruler decoration */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                      <div className="flex-1 h-[1px] bg-border relative">
                        {[...Array(10)].map((_, i) => (
                          <div 
                            key={i} 
                            className="absolute top-0 w-[1px] h-2 bg-border"
                            style={{ left: `${i * 10}%` }}
                          />
                        ))}
                      </div>
                      <span className="dimension-marker text-muted-foreground group-hover:text-foreground transition-colors">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-8 py-4 font-bold uppercase tracking-wider text-sm paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            View All Events
            <span className="dimension-marker text-muted-foreground">+more</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;