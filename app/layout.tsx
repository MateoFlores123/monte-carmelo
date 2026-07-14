import { Cormorant_Garamond } from "next/font/google";
import { ReactNode } from "react";
import Nav from "../components/Navbar/Nav";
import Hero from "../components/Hero/Hero";
import Nosotros from "../components/Nosotros/Nosotros";
import Misionvisionvalores from "../components/Misionvisionvalores/Misionvisionvalores"
import Cifras from "../components/Cifras/Cifras";
import Ocupacional from "../components/Ocupacional/Ocupacional"

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
        <Nav />
        <Hero />
        <Nosotros />
        <Misionvisionvalores />
        <Cifras />
        <Ocupacional />
        {children}
      </body>
    </html>
  );
}