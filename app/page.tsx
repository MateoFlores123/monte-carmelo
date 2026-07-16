import Hero from "../components/Hero/Hero";
import Nosotros from "../components/Nosotros/Nosotros";
import Misionvisionvalores from "../components/Misionvisionvalores/Misionvisionvalores";
import Cifras from "../components/Cifras/Cifras";
import Ocupacional from "../components/Ocupacional/Ocupacional";
import Asistencial from "../components/Asistencial/Asistencial";
import Especialidades from "../components/Especialidades/Especialidades";
import Galeria from "../components/Galeria/Galeria";
import Contacto from "../components/Contacto/Contacto";
import Footer from "../components/Footer/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#EAEFF4]">
      <Hero />
      <Nosotros />
      <Misionvisionvalores />
      <Cifras />
      <Ocupacional />
      <Asistencial />
      <Especialidades />
      <Galeria />
      <Contacto />
      <Footer />

    </main>
  );
}