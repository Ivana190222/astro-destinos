import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import AstralBackground from "./components/AstralBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AstroDestinos - Tu guía astrológica personal",
  description: "Descubre tu destino a través de la astrología, el tarot y más",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-indigo-950 relative overflow-x-hidden`}>
        <div className="fixed inset-0 z-0">
          <AstralBackground />
        </div>
        <div className="relative z-10">
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
