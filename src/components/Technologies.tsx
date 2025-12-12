import { motion } from "framer-motion";

import { FaReact, FaAndroid, FaPython, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiFlutter, SiFirebase, SiTensorflow, SiGooglecloud, SiKubernetes, SiTypescript, SiGo, SiWeb3Dotjs } from "react-icons/si";

const technologies = [
  { name: "React", icon: <FaReact />, color: "gdg-blue" },
  { name: "Android", icon: <FaAndroid />, color: "gdg-green" },
  { name: "Flutter", icon: <SiFlutter />, color: "gdg-blue" },
  { name: "Firebase", icon: <SiFirebase />, color: "gdg-yellow" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "gdg-red" },
  { name: "Google Cloud", icon: <SiGooglecloud />, color: "gdg-blue" },
  { name: "Kubernetes", icon: <SiKubernetes />, color: "gdg-blue" },
  { name: "Python", icon: <FaPython />, color: "gdg-yellow" },
  { name: "Node.js", icon: <FaNodeJs />, color: "gdg-green" },
  { name: "TypeScript", icon: <SiTypescript />, color: "gdg-blue" },
  { name: "Go", icon: <SiGo />, color: "gdg-blue" },
  { name: "Web3", icon: <SiWeb3Dotjs />, color: "gdg-green" },
];

const Technologies = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-foreground" />
            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
              Our Stack
            </span>
            <div className="h-[2px] w-12 bg-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Technologies We <span className="text-gdg-green">Work On</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From mobile to cloud, we explore and build with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group"
            >
              <div className="border-2 border-foreground bg-background p-4 paper-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  className="text-3xl md:text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                >
                  {tech.icon}
                </div>

                {/* Name */}
                <p
                  className="font-mono text-xs md:text-sm font-bold transition-colors"
                  style={{ color: `hsl(var(--${tech.color}))` }}
                >
                  {tech.name}
                </p>

                {/* Dimension marker */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="dimension-marker text-muted-foreground text-xs">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-24 bg-border relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-[1px] h-2 bg-border"
                style={{ left: `${i * 25}%` }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-muted-foreground uppercase">
            And many more...
          </span>
          <div className="h-[1px] w-24 bg-border relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-[1px] h-2 bg-border"
                style={{ left: `${i * 25}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
