import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedModels from "@/components/FeaturedModels";
import Configurator from "@/components/Configurator";
import ElectricSection from "@/components/ElectricSection";
import PerformanceSection from "@/components/PerformanceSection";
import Testimonials from "@/components/Testimonials";
import DealerLocator from "@/components/DealerLocator";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedModels />
        <Configurator />
        <ElectricSection />
        <PerformanceSection />
        <Testimonials />
        <DealerLocator />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
