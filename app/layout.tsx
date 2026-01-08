import Navbar from "@/components/layout/Navbar";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

export const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Navbar />
        <main className="mx-auto max-w-[1185px]  px-4 pt-10 space-y-8">
          {children}
        </main>
      </body>
    </html>
  );
}
