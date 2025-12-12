import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Technologies from "@/components/Technologies";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Technologies />

        {/* Terminal Command Bridge Separator */}
        <div className="w-full py-20 flex justify-center items-center overflow-hidden">
          <div className="relative group">
            {/* Cable connecting top */}
            <div className="absolute -top-20 left-1/2 w-[2px] h-20 bg-gradient-to-b from-transparent to-foreground/20 -translate-x-1/2" />

            {/* Terminal Box */}
            <div className="relative z-10 bg-black text-white px-8 py-3 rounded-full font-mono text-sm border border-border shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="w-[1px] h-4 bg-white/20 mx-1" />
              <span className="text-white/50">$</span>
              <span className="typing-effect">npm run build:community</span>
              <span className="animate-pulse bg-white/80 w-2 h-4 block" />
            </div>

            {/* Cable connecting bottom */}
            <div className="absolute -bottom-20 left-1/2 w-[2px] h-20 bg-gradient-to-b from-foreground/20 to-transparent -translate-x-1/2" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;