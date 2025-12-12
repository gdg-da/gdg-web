import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Slop = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <main className="pt-20">
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Slop;
