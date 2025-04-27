import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/blog/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GCP-BLOG",
  description: "박근철의 개인 블로그",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="px-8 pt-20 pb-8 max-w-6xl mx-auto">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
