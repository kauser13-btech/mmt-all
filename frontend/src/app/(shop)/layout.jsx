import '../globals.css';
import { Montserrat, Staatliches, Roboto } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Optimized Google font (self-hosted by Next.js)
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const staatliches = Staatliches({ subsets: ["latin"], display: "swap", weight: "400" });
const roboto = Roboto({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata = {
  title: {
    default: "Tees to Match with Jordans, Adidas, Nike | MatchMyTees",
    template: "%s | MatchMyTees",
  },
  alternates: {
    canonical: "https://www.matchmytees.com/",
  },
  description: "Match your sneakers with Tees, featuring millions of products from famous brands like Adidas, Nike, Puma, Gucci, Jordan & more. Buy and save up to 46%.",
  keywords: ["e-commerce", "shop", "online store", "buy online"],
  openGraph: {
    title: "Tees to Match with Jordans, Adidas, Nike | MatchMyTees",
    description: "Match your trendsetting sneakers with Tees, featuring millions of products from famous brands like Adidas, Nike, Puma, Gucci, Jordan & more. Buy and save up to 46%.",
    url: "https://www.matchmytees.com/",
    siteName: "Tees to Match with Jordans, Adidas, Nike | MatchMyTees",
    images: [
      {
        url: "/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Tees to Match with Jordans, Adidas, Nike | MatchMyTees",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tees to Match with Jordans, Adidas, Nike | MatchMyTees",
    description: "Match your trendsetting sneakers with Tees, featuring millions of products from famous brands like Adidas, Nike, Puma, Gucci, Jordan & more. Buy and save up to 46%.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://www.matchmytees.com/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white text-gray-900"
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            {/* Global Header */}
            <Header />

            {/* Main Content */}
            <main className="mx-auto w-full">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
          <ToastContainer />
        </CartProvider>
      </body >
    </html >
  );
}
