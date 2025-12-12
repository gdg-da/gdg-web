import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <main >
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
