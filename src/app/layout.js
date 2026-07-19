import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "./context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Aetees Bakehouse",
  description: "#OrderDirect from Aetees Bakehouse. Beautiful mobile menu for dine-in, take-away and online ordering.",
  openGraph: {
    title: "Aetees Bakehouse",
    type: "website",
    url: "https://aeteesbakehouse.com/",
    images: [
      {
        url: "https://aeteesbakehouse.com/aeteesbakehouse.png",
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
    site: "https://aeteesbakehouse.com/",
    title: "Aetees Bakehouse",
    description: "#OrderDirect from Aetees Bakehouse",
    images: ["https://aeteesbakehouse.com/aeteesbakehouse.png"],
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
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
