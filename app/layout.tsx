import { Cormorant_Garamond } from "next/font/google";
import { ReactNode } from "react";
import Loader from "../components/Loader/Loader";
import Nav from "../components/Navbar/Nav";
import Socialbar from "../components/Socialbar/Socialbar";
import Hero from "../components/Hero/Hero";
import Nosotros from "../components/Nosotros/Nosotros";
import Misionvisionvalores from "../components/Misionvisionvalores/Misionvisionvalores"
import Cifras from "../components/Cifras/Cifras";
import Ocupacional from "../components/Ocupacional/Ocupacional"
import Asistencial from "../components/Asistencial/Asistencial";
import Especialidades from "../components/Especialidades/Especialidades";

import "./globals.css";

type LayoutProps = {
  children: ReactNode;
};

const clinicFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-clinic",
});

export const metadata = {
  title: "Clínica Monte Carmelo",
  description: "Salud ocupacional y asistencial de confianza",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es" className={clinicFont.variable}>
      <body>
        <Loader />
        <Nav />
        <Socialbar />
        <Hero />
        <Nosotros />
        <Misionvisionvalores />
        <Cifras />
        <Ocupacional />
        <Asistencial />
        <Especialidades />
        {children}
      </body>
    </html>
  );
}