import { Cormorant_Garamond } from "next/font/google";
import { ReactNode } from "react";
import Loader from "../components/Loader/Loader";
import Socialbar from "../components/Socialbar/Socialbar";

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
        

        {/* Aquí Next.js pone el contenido de cada página: app/page.tsx
            para "/", app/especialidades/page.jsx para "/especialidades", etc. */}
        {children}

        <Socialbar />
      </body>
    </html>
  );
}