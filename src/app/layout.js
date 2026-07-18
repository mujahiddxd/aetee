import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Aetees Bakehouse",
  description: "#OrderDirect from Aetees Bakehouse. Beautiful mobile menu for dine-in, take-away and online ordering.",
  openGraph: {
    title: "Aetees Bakehouse",
    type: "website",
    url: "https://skyblue-rhinoceros-487469.hostingersite.com/",
    images: [
      {
        url: "https://skyblue-rhinoceros-487469.hostingersite.com/aeteesbakehouse.png",
        width: 800,
        height: 600,
        alt: "Aetees Bakehouse",
      },
    ],
    description: "#OrderDirect from Aetees Bakehouse",
    siteName: "Aetees Bakehouse",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://skyblue-rhinoceros-487469.hostingersite.com/",
    title: "Aetees Bakehouse",
    description: "#OrderDirect from Aetees Bakehouse",
    images: ["https://skyblue-rhinoceros-487469.hostingersite.com/aeteesbakehouse.png"],
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable}`}>
      <body>
        <CartProvider>
          <div style={{ backgroundColor: 'var(--color-bg-white)', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
