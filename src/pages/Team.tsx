import Navbar from "@/components/Navbar";
import TeamComponent from "@/components/Team";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <main className="pt-20">
        <TeamComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Team;
