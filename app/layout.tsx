import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "EastWave Private Limited | Creative, Digital & Media Solutions",
  description: "Your next big wave starts here. Explore EastWave’s digital marketing, music and audio, podcast production, and print and merchandise solutions.",
  openGraph: { title: "EastWave — Your next big wave starts here.", description: "Digital marketing, audio, podcasts and print. One creative partner.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
