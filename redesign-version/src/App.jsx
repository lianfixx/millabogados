// MILLA ABOGADOS — App Shell. Ensambla todas las secciones con anclas de navegación.
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero3D } from './components/Hero3D';
import { FirmaSection } from './components/FirmaSection';
import { ServiciosAccordion } from './components/ServiciosAccordion';
import { EquipoSection } from './components/EquipoSection';
import { MethodVisualizer } from './components/MethodVisualizer';
import { BuzonJuridicoForm } from './components/BuzonJuridicoForm';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero3D />
        <FirmaSection />
        <ServiciosAccordion />
        <EquipoSection />
        <MethodVisualizer />
        <section id="asesoria-virtual">
          <h2>Asesoría Virtual</h2>
          <p>Solicita una videollamada con nuestros abogados.</p>
        </section>
        <section id="contacto">
          <h2>Buzón Jurídico</h2>
          <BuzonJuridicoForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
