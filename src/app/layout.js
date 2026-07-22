import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";

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
  description: "Delicious, handcrafted cakes, pastries, and sweet treats baked fresh daily.",
  openGraph: {
    title: "Aetees Bakehouse",
    type: "website",
    url: "https://aeteesbakehouse.com/",
    images: [
      {
        url: "https://aeteesbakehouse.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aetees Bakehouse",
      },
    ],
    description: "Delicious, handcrafted cakes, pastries, and sweet treats baked fresh daily.",
    siteName: "Aetees Bakehouse",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://aeteesbakehouse.com/",
    title: "Aetees Bakehouse",
    description: "Delicious, handcrafted cakes, pastries, and sweet treats baked fresh daily.",
    images: ["https://aeteesbakehouse.com/og-image.png"],
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
          id="google-maps-script"
          strategy="beforeInteractive"
        />

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
