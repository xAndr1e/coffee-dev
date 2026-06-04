import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedMenu from "@/components/FeaturedMenu";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedMenu />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
