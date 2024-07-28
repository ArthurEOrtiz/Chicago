import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/html/Header";
import Footer from "@/components/html/Footer";
import Main from "@/components/html/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chicago",
  description: "A Chicago Application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header/>
        <Main>
          {children}
        </Main>
        <Footer/>
      </body>
    </html>
  );
};

export default RootLayout;
